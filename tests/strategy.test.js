const Policy = require("../domain/Policy");
const Insured = require("../domain/Insured");
const YoungDriverStrategy = require("../strategies/YoungDriverStrategy");
const ExperiencedDriverStrategy = require("../strategies/ExperiencedDriverStrategy");

describe("Strategy - cálculo de prêmio", () => {
  test("trocar a strategy muda o valor do prêmio", () => {
    const insured = new Insured({ name: "Teste", email: "t@t.com" });
    const policy = new Policy({
      insured,
      basePremium: 1000,
      noClaimsYears: 2,
      claimsCount: 0,
    });

    const young = new YoungDriverStrategy();
    const experienced = new ExperiencedDriverStrategy();

    policy.setCalculationStrategy(young);
    const youngPremium = policy.getPremium();

    policy.setCalculationStrategy(experienced);
    const expPremium = policy.getPremium();

    expect(youngPremium).not.toBe(expPremium);
    expect(youngPremium).toBeGreaterThan(expPremium);
  });
});
