```mermaid
classDiagram
  class Policy {
    +insured
    +basePremium
    +noClaimsYears
    +claimsCount
    +fleetSize
    +setCalculationStrategy(strategy)
    +getPremium()
    +getDescription()
  }

  class BaseCalculationStrategy {
    +calculate(policy)
    +applyBonusMalus(basePremium, policy)
  }

  class YoungDriverStrategy
  class ExperiencedDriverStrategy
  class FleetStrategy

  class BasePolicyDecorator {
    -policyComponent
    +getPremium()
    +getDescription()
  }

  class GlassCoverageDecorator
  class TowServiceDecorator
  class SpareCarDecorator

  class Subject {
    -observers
    +attach(o)
    +detach(o)
    +notify(data)
  }

  class Claim {
    +register()
  }

  class Observer {
    +update(data)
  }

  class InsuredObserver
  class BrokerObserver

  Policy ..> BaseCalculationStrategy
  BaseCalculationStrategy <|-- YoungDriverStrategy
  BaseCalculationStrategy <|-- ExperiencedDriverStrategy
  BaseCalculationStrategy <|-- FleetStrategy

  Policy <|-- BasePolicyDecorator
  BasePolicyDecorator <|-- GlassCoverageDecorator
  BasePolicyDecorator <|-- TowServiceDecorator
  BasePolicyDecorator <|-- SpareCarDecorator

  Subject <|-- Claim
  Subject o--> Observer
  Observer <|-- InsuredObserver
  Observer <|-- BrokerObserver