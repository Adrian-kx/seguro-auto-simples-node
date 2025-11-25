const Subject = require("../observers/Subject");
const LoggerSingleton = require("../infra/LoggerSingleton");

class Claim extends Subject {
  constructor({ id, policy, description }) {
    super();
    this.id = id;
    this.policy = policy;
    this.description = description;
  }

  register() {
    const payload = {
      id: this.id,
      description: this.description,
      insuredName: this.policy.insured?.name,
    };

    const logger = LoggerSingleton.getInstance();
    logger.log(
      `Sinistro ${this.id} registrado para ${payload.insuredName}: ${this.description}`
    );

    this.notify(payload);
  }
}

module.exports = Claim;
