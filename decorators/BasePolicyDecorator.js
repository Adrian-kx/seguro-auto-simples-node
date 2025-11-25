class BasePolicyDecorator {
  constructor(policyComponent) {
    this.policyComponent = policyComponent;
  }

  getPremium() {
    return this.policyComponent.getPremium();
  }

  getDescription() {
    return this.policyComponent.getDescription();
  }

  setCalculationStrategy(strategy) {
    if (this.policyComponent.setCalculationStrategy) {
      this.policyComponent.setCalculationStrategy(strategy);
    }
  }
}

module.exports = BasePolicyDecorator;
