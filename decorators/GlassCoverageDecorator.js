const BasePolicyDecorator = require("./BasePolicyDecorator");

class GlassCoverageDecorator extends BasePolicyDecorator {
  getPremium() {
    return this.policyComponent.getPremium() + 120;
  }

  getDescription() {
    return `${this.policyComponent.getDescription()} + cobertura de vidros`;
  }
}

module.exports = GlassCoverageDecorator;
