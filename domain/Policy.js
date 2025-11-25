const LoggerSingleton = require("../infra/LoggerSingleton");

class Policy {
  constructor({
    insured,
    basePremium,
    noClaimsYears = 0,
    claimsCount = 0,
    fleetSize = 1,
  }) {
    this.insured = insured;
    this.basePremium = basePremium;
    this.noClaimsYears = noClaimsYears;
    this.claimsCount = claimsCount;
    this.fleetSize = fleetSize;
    this.calculationStrategy = null;
  }

  setCalculationStrategy(strategy) {
    this.calculationStrategy = strategy;
    const logger = LoggerSingleton.getInstance();
    logger.log(
      `Strategy de cálculo definida para ${this.insured?.name || "segurado"}`
    );
  }

  calculateBasePremium() {
    if (!this.calculationStrategy) {
      throw new Error("Strategy de cálculo não definida");
    }
    return this.calculationStrategy.calculate(this);
  }

  getPremium() {
    return this.calculateBasePremium();
  }

  getDescription() {
    return `Apólice básica para ${this.insured?.name || "segurado"}`;
  }
}

module.exports = Policy;
