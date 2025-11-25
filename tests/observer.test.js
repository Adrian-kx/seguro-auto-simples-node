const Policy = require("../domain/Policy");
const Insured = require("../domain/Insured");
const Claim = require("../domain/Claim");
const InsuredObserver = require("../observers/InsuredObserver");
const BrokerObserver = require("../observers/BrokerObserver");

describe("Observer - notificação de sinistro", () => {
  test("observers recebem notificacao quando sinistro é registrado", () => {
    const insured = new Insured({ name: "Segurado", email: "s@s.com" });
    const policy = new Policy({
      insured,
      basePremium: 1000,
      noClaimsYears: 0,
      claimsCount: 0,
    });

    const claim = new Claim({
      id: "123",
      policy,
      description: "Teste de sinistro",
    });

    const insuredObserver = new InsuredObserver(insured);
    const brokerObserver = new BrokerObserver("Corretora Teste");

    claim.attach(insuredObserver);
    claim.attach(brokerObserver);

    claim.register();

    expect(insuredObserver.lastNotification).not.toBeNull();
    expect(brokerObserver.lastNotification).not.toBeNull();
    expect(insuredObserver.lastNotification.id).toBe("123");
    expect(brokerObserver.lastNotification.insuredName).toBe("Segurado");
  });
});
