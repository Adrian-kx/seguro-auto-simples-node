const StrategyFactory = require("../strategies/StrategyFactory");
const YoungDriverStrategy = require("../strategies/YoungDriverStrategy");
const ExperiencedDriverStrategy = require("../strategies/ExperiencedDriverStrategy");
const FleetStrategy = require("../strategies/FleetStrategy");

describe("Factory Method - StrategyFactory", () => {
  test("cria strategy jovem", () => {
    const strat = StrategyFactory.create("jovem");
    expect(strat).toBeInstanceOf(YoungDriverStrategy);
  });

  test("cria strategy experiente", () => {
    const strat = StrategyFactory.create("experiente");
    expect(strat).toBeInstanceOf(ExperiencedDriverStrategy);
  });

  test("cria strategy frota", () => {
    const strat = StrategyFactory.create("frota");
    expect(strat).toBeInstanceOf(FleetStrategy);
  });

  test("tipo desconhecido gera erro", () => {
    expect(() => StrategyFactory.create("xpto")).toThrow();
  });
});
