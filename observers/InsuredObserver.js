const Observer = require("./Observer");

class InsuredObserver extends Observer {
  constructor(insured) {
    super();
    this.insured = insured;
    this.lastNotification = null;
  }

  update(claimData) {
    this.lastNotification = claimData;
    console.log(
      `Notificando segurado ${this.insured.name}: sinistro ${claimData.id} registrado.`
    );
  }
}

module.exports = InsuredObserver;
