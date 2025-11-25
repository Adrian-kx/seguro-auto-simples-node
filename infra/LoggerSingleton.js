class LoggerSingleton {
  constructor() {
    if (LoggerSingleton.instance) {
      return LoggerSingleton.instance;
    }

    this.logs = [];
    LoggerSingleton.instance = this;
  }

  static getInstance() {
    if (!LoggerSingleton.instance) {
      LoggerSingleton.instance = new LoggerSingleton();
    }
    return LoggerSingleton.instance;
  }

  log(message) {
    const entry = {
      timestamp: new Date(),
      message,
    };
    this.logs.push(entry);
    console.log(`[LOG ${entry.timestamp.toISOString()}] ${entry.message}`);
  }

  getLogs() {
    return this.logs;
  }
}

module.exports = LoggerSingleton;
