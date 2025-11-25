const BasePolicyDecorator = require("./BasePolicyDecorator");

class SpareCarDecorator extends BasePolicyDecorator {
  getPremium() {
    return this.policyComponent.getPremium() + 200;
  }

  getDescription() {
    return `${this.policyComponent.getDescription()} + carro reserva`;
  }
}

module.exports = SpareCarDecorator;
