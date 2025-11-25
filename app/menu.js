const readlineSync = require("readline-sync");
const Insured = require("../domain/Insured");
const Policy = require("../domain/Policy");
const Claim = require("../domain/Claim");
const StrategyFactory = require("../strategies/StrategyFactory");
const GlassCoverageDecorator = require("../decorators/GlassCoverageDecorator");
const TowServiceDecorator = require("../decorators/TowServiceDecorator");
const SpareCarDecorator = require("../decorators/SpareCarDecorator");
const InsuredObserver = require("../observers/InsuredObserver");
const BrokerObserver = require("../observers/BrokerObserver");
const LoggerSingleton = require("../infra/LoggerSingleton");

function printHeader() {
  console.clear();
  console.log("========================================");
  console.log("        Sistema de Seguro Auto          ");
  console.log("========================================\n");
}

function printFooter() {
  console.log("\n----------------------------------------");
  console.log("Desenvolvido por: Adrian Xavier");
  console.log("----------------------------------------\n");
}

function mainMenu() {
  let exit = false;
  let policy = null;
  let policyComponent = null;
  let strategy = null;
  const logger = LoggerSingleton.getInstance();

  while (!exit) {
    printHeader();
    console.log("1) Criar apólice");
    console.log("2) Definir perfil de cálculo (Strategy)");
    console.log("3) Adicionar coberturas (Decorator)");
    console.log("4) Calcular prêmio");
    console.log("5) Registrar sinistro (Observer)");
    console.log("6) Ver logs");
    console.log("0) Sair");

    printFooter();
    const option = readlineSync.question("Escolha uma opcao: ");

    switch (option) {
      case "1": {
        const name = readlineSync.question("Nome do segurado: ");
        const email = readlineSync.question("Email do segurado (simulado): ");
        const carValueInput = readlineSync.question(
          "Valor estimado do carro (ex: 50000): "
        );
        const basePremium = Number(carValueInput) * 0.05 || 1000;
        const noClaimsYears = Number(
          readlineSync.question("Anos sem sinistro: ")
        );
        const claimsCount = Number(
          readlineSync.question("Quantidade de sinistros anteriores: ")
        );
        const isFleet = readlineSync
          .question("E frota? (s/n): ")
          .toLowerCase()
          .startsWith("s");
        const fleetSize = isFleet
          ? Number(readlineSync.question("Quantidade de veiculos na frota: "))
          : 1;

        const insured = new Insured({ name, email });
        policy = new Policy({
          insured,
          basePremium,
          noClaimsYears,
          claimsCount,
          fleetSize,
        });
        policyComponent = policy;

        logger.log(`Apólice criada para ${name}`);
        console.log("\nApólice criada com sucesso!");
        readlineSync.question("\nPressione ENTER para continuar...");
        break;
      }

      case "2": {
        if (!policy) {
          console.log("\nCrie uma apólice primeiro.");
        } else {
          console.log("\nPerfis disponíveis:");
          console.log("1) Jovem");
          console.log("2) Experiente");
          console.log("3) Frotista");

          const opt = readlineSync.question("Escolha o perfil: ");
          let type;
          if (opt === "1") type = "jovem";
          else if (opt === "2") type = "experiente";
          else if (opt === "3") type = "frota";

          try {
            strategy = StrategyFactory.create(type);
            policy.setCalculationStrategy(strategy);
            // se já tiver decorators, propago a strategy
            if (policyComponent !== policy) {
              policyComponent.setCalculationStrategy(strategy);
            }
            console.log("\nStrategy definida com sucesso.");
          } catch (e) {
            console.log(`\nErro: ${e.message}`);
          }
        }
        readlineSync.question("\nPressione ENTER para continuar...");
        break;
      }

      case "3": {
        if (!policyComponent) {
          console.log("\nCrie uma apólice primeiro.");
          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }

        console.log("\nCoberturas disponíveis:");
        console.log("1) Vidros");
        console.log("2) Guincho");
        console.log("3) Carro reserva");
        console.log("0) Voltar");

        const cov = readlineSync.question("Escolha a cobertura: ");

        if (cov === "1") {
          policyComponent = new GlassCoverageDecorator(policyComponent);
          logger.log("Cobertura de vidros adicionada");
        } else if (cov === "2") {
          policyComponent = new TowServiceDecorator(policyComponent);
          logger.log("Cobertura de guincho adicionada");
        } else if (cov === "3") {
          policyComponent = new SpareCarDecorator(policyComponent);
          logger.log("Cobertura de carro reserva adicionada");
        }

        console.log("\nCobertura aplicada (se selecionada).");
        readlineSync.question("\nPressione ENTER para continuar...");
        break;
      }

      case "4": {
        if (!policy) {
          console.log("\nCrie uma apólice primeiro.");
        } else if (!strategy) {
          console.log("\nDefina um perfil de cálculo primeiro.");
        } else {
          const premium = policyComponent.getPremium();
          const description = policyComponent.getDescription();

          console.log("\nResumo da apólice:");
          console.log(description);
          console.log(`Prêmio final: R$ ${premium.toFixed(2)}`);
        }
        readlineSync.question("\nPressione ENTER para continuar...");
        break;
      }

      case "5": {
        if (!policy) {
          console.log("\nCrie uma apólice primeiro.");
          readlineSync.question("\nPressione ENTER para continuar...");
          break;
        }

        const description = readlineSync.question(
          "Descricao do sinistro (ex: colisao traseira): "
        );
        const claimId = Date.now().toString();

        const claim = new Claim({
          id: claimId,
          policy,
          description,
        });

        const insuredObserver = new InsuredObserver(policy.insured);
        const brokerObserver = new BrokerObserver("Corretora Exemplo");

        claim.attach(insuredObserver);
        claim.attach(brokerObserver);

        claim.register();

        console.log("\nSinistro registrado e notificacoes enviadas.");
        readlineSync.question("\nPressione ENTER para continuar...");
        break;
      }

      case "6": {
        console.log("\nLogs registrados:");
        logger.getLogs().forEach((log) => {
          console.log(`${log.timestamp.toISOString()} - ${log.message}`);
        });
        readlineSync.question("\nPressione ENTER para continuar...");
        break;
      }

      case "0":
        exit = true;
        console.log("\nSaindo do sistema...");
        break;

      default:
        console.log("\nOpcao inválida.");
        readlineSync.question("\nPressione ENTER para continuar...");
    }
  }
}

if (require.main === module) {
  mainMenu();
}

module.exports = mainMenu;
