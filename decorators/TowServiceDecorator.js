const BasePolicyDecorator = require("./BasePolicyDecorator");

class TowServiceDecorator extends BasePolicyDecorator {
  getPremium() {
    return this.policyComponent.getPremium() + 80;
  }

  getDescription() {
    return `${this.policyComponent.getDescription()} + guincho 24h`;
  }
}

module.exports = TowServiceDecorator;
