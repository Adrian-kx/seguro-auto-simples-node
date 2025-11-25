const BaseCalculationStrategy = require("./BaseCalculationStrategy");

class ExperiencedDriverStrategy extends BaseCalculationStrategy {
  calculate(policy) {
    const base = policy.basePremium * 1.0;
    return this.applyBonusMalus(base, policy);
  }
}

module.exports = ExperiencedDriverStrategy;
