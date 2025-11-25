const LoggerSingleton = require("../infra/LoggerSingleton");

describe("Singleton - Logger", () => {
  test("sempre retorna a mesma instância", () => {
    const logger1 = LoggerSingleton.getInstance();
    const logger2 = LoggerSingleton.getInstance();

    expect(logger1).toBe(logger2);
  });

  test("logs são compartilhados na mesma instância", () => {
    const logger1 = LoggerSingleton.getInstance();
    const logger2 = LoggerSingleton.getInstance();

    logger1.log("teste 1");
    logger2.log("teste 2");

    const logs = logger1.getLogs();
    expect(logs.length).toBeGreaterThanOrEqual(2);
  });
});
