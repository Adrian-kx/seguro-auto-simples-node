const Policy = require("../domain/Policy");
const Insured = require("../domain/Insured");
const ExperiencedDriverStrategy = require("../strategies/ExperiencedDriverStrategy");
const GlassCoverageDecorator = require("../decorators/GlassCoverageDecorator");
const TowServiceDecorator = require("../decorators/TowServiceDecorator");
const SpareCarDecorator = require("../decorators/SpareCarDecorator");

describe("Decorator - coberturas adicionais", () => {
  test("decorators somam valor ao prêmio e alteram descrição", () => {
    const insured = new Insured({ name: "Teste", email: "t@t.com" });
    const policy = new Policy({
      insured,
      basePremium: 1000,
      noClaimsYears: 0,
      claimsCount: 0,
    });

    const strategy = new ExperiencedDriverStrategy();
    policy.setCalculationStrategy(strategy);

    const basePremium = policy.getPremium();

    let decorated = new GlassCoverageDecorator(policy);
    decorated = new TowServiceDecorator(decorated);
    decorated = new SpareCarDecorator(decorated);

    const decoratedPremium = decorated.getPremium();
    const description = decorated.getDescription();

    expect(decoratedPremium).toBe(basePremium + 120 + 80 + 200);
    expect(description).toContain("cobertura de vidros");
    expect(description).toContain("guincho 24h");
    expect(description).toContain("carro reserva");
  });
});
