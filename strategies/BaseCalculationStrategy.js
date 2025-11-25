class BaseCalculationStrategy {
  calculate(policy) {
    throw new Error("Método calculate precisa ser implementado");
  }

  // aqui centralizo o bônus-malus
  applyBonusMalus(basePremium, policy) {
    const { noClaimsYears = 0, claimsCount = 0 } = policy;

    let factor = 1;

    if (noClaimsYears >= 3) {
      factor -= 0.15; // desconto bom histórico
    } else if (noClaimsYears >= 1) {
      factor -= 0.05;
    }

    if (claimsCount >= 2) {
      factor += 0.25; // muitos sinistros
    } else if (claimsCount === 1) {
      factor += 0.1;
    }

    return basePremium * factor;
  }
}

module.exports = BaseCalculationStrategy;
