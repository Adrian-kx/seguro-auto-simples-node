const Observer = require("./Observer");

class BrokerObserver extends Observer {
  constructor(brokerName) {
    super();
    this.brokerName = brokerName;
    this.lastNotification = null;
  }

  update(claimData) {
    this.lastNotification = claimData;
    console.log(
      `Notificando corretor ${this.brokerName}: sinistro ${claimData.id} do segurado ${claimData.insuredName}.`
    );
  }
}

module.exports = BrokerObserver;
