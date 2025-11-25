const BaseCalculationStrategy = require("./BaseCalculationStrategy");

class FleetStrategy extends BaseCalculationStrategy {
  calculate(policy) {
    const fleetSize = policy.fleetSize || 1;
    const basePerCar = policy.basePremium * 1.2;
    const total = basePerCar * fleetSize;
    return this.applyBonusMalus(total, policy);
  }
}

module.exports = FleetStrategy;
