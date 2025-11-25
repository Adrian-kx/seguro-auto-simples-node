const YoungDriverStrategy = require("./YoungDriverStrategy");
const ExperiencedDriverStrategy = require("./ExperiencedDriverStrategy");
const FleetStrategy = require("./FleetStrategy");

class StrategyFactory {
  // aqui escolho a strategy baseada em uma string simples
  static create(type) {
    const normalized = (type || "").toLowerCase();

    switch (normalized) {
      case "jovem":
        return new YoungDriverStrategy();
      case "experiente":
        return new ExperiencedDriverStrategy();
      case "frota":
      case "frotista":
        return new FleetStrategy();
      default:
        throw new Error(`Tipo de estratégia desconhecido: ${type}`);
    }
  }
}

module.exports = StrategyFactory;
