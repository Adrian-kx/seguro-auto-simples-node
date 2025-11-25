---
# Seguro Auto – Padrões de Projeto

Trabalho de padrões de projeto usando o domínio de **Seguro Auto (bônus-malus, franquia, sinistros)**.
---

## Objetivo

Simular um sistema simples de seguro auto com:

- cálculo de prêmio por perfil
- adicionais de apólice (coberturas extras)
- registro de sinistros com notificação

Aplicando os padrões:

```md
- Strategy (cálculo de prêmio com bônus-malus)
- Decorator (adicionais de cobertura)
- Observer (notificação de sinistros)
- Factory Method (criação de Strategy)
- Singleton (logger)
```

---

## Padrões escolhidos e justificativa

### 1. Strategy – cálculo de prêmio (com bônus-malus)

**Onde:** pasta `strategies/` e uso em `domain/Policy.js`.

- `BaseCalculationStrategy` define a interface de cálculo.
- `YoungDriverStrategy`, `ExperiencedDriverStrategy`, `FleetStrategy` implementam regras diferentes.
- O método `applyBonusMalus` centraliza o bônus-malus (anos sem sinistro x quantidade de sinistros).
- `Policy` recebe uma Strategy via `setCalculationStrategy` e delega o cálculo do prêmio.

**Por quê:**

O cálculo de prêmio varia conforme o perfil (jovem, experiente, frotista) e isso tende a crescer com o tempo. O Strategy permite trocar a lógica em tempo de execução, sem mudar a classe `Policy`, e ainda centralizar o bônus-malus.

Nos testes (`strategy.test.js`) eu provo que trocar a strategy muda o valor do prêmio.

---

### 2. Decorator – adicionais de apólice

**Onde:** pasta `decorators/`.

- `BasePolicyDecorator` é o decorator base.
- `GlassCoverageDecorator`, `TowServiceDecorator`, `SpareCarDecorator` empilham funcionalidades.
- Cada decorator soma um valor ao prêmio e concatena texto na descrição.

**Por quê:**

Coberturas adicionais (vidros, guincho, carro reserva) são opcionais e combináveis. O Decorator permite empilhar essas coberturas em cima da apólice base, sem explodir em subclasses como `PolicyComVidrosGuinchoCarroReserva`. No menu, vou adicionando decorators por cima da mesma apólice.

Nos testes (`decorator.test.js`) mostro que o prêmio aumenta com cada decorator e que a descrição final contém todas as coberturas.

---

### 3. Observer – notificação de sinistros

**Onde:** `observers/` e `domain/Claim.js`.

- `Subject` mantém uma lista de observers.
- `Observer` é a interface.
- `Claim` estende `Subject` e chama `notify` ao registrar o sinistro.
- `InsuredObserver` e `BrokerObserver` recebem a notificação (dados do sinistro) e exibem no console.

**Por quê:**

Quando um sinistro é registrado, é natural querer notificar várias partes (segurado, corretor, etc.) sem acoplar a lógica de notificação dentro da classe `Claim`. Com Observer, basta registrar novos observers.

Nos testes (`observer.test.js`) verifico que ambos observers recebem o payload do sinistro.

---

### 4. Factory Method – criação das strategies

**Onde:** `strategies/StrategyFactory.js`.

- `StrategyFactory.create(type)` recebe uma string (jovem, experiente, frota) e devolve o objeto de strategy correto.

**Por quê:**

No menu, o usuário escolhe o perfil por texto/numero. Em vez de espalhar `new YoungDriverStrategy()` etc. pelo código, centralizo a criação na factory. Fica mais fácil adicionar um novo perfil depois, alterando só a fábrica.

Cobertura de testes em `factory.test.js`.

---

### 5. Singleton – Logger

**Onde:** `infra/LoggerSingleton.js`.

- Implementa um logger com instância única.
- Armazena os logs em memória e também imprime no console.
- Usado em `Policy`, `Claim` e no menu.

**Por quê:**

Eu queria algo simples para mostrar a unicidade do objeto. O logger é um bom candidato porque posso usá-lo em vários pontos e ver que todos compartilham o mesmo histórico de logs.

Cobertura em `singleton.test.js`.

---

## Diagrama

O diagrama em mermaid está no arquivo [`diagram.md`](./diagram.md).

---

## Como rodar o projeto

### 1. Instalar dependências

No terminal, dentro da pasta do projeto:

```md
npm install
```

2. Execute o menu interativo

```md
npm start
```

O menu permite:

1. Criar apólice
2. Escolher perfil (Strategy)
3. Adicionar coberturas (Decorator)
4. Calcular preço final
5. Registrar sinistro (Observer)
6. Ver logs (Singleton)

---

# Como Rodar os Testes

1. Rode todos os testes:

```md
npm test
```

Isso executa automaticamente:

```md
- strategy.test.js
- decorator.test.js
- observer.test.js
- factory.test.js
- singleton.test.js
```

Desenvolvido por: **Adrian Xavier**  
GitHub: **[@Adrian-kx](https://github.com/Adrian-kx)**
