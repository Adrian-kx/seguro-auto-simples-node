const BaseCalculationStrategy = require("./BaseCalculationStrategy");

class YoungDriverStrategy extends BaseCalculationStrategy {
  calculate(policy) {
    const base = policy.basePremium * 1.5; // jovem costuma pagar mais
    return this.applyBonusMalus(base, policy);
  }
}

module.exports = YoungDriverStrategy;
