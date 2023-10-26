import Dinero from 'dinero.js/src/dinero';

class PriceCalculatorFactory {
  static getPriceCalculator(id) {
    switch (id) {
      case 'ReplaceWheels':
        return new ReplaceWheelsPriceCalculator();
      case 'ReplaceBalanceWheels':
        return new ReplaceBalanceWheelsPriceCalculator();
      case 'FullReplaceWheels':
        return new FullReplaceWheelsPriceCalculator();
      case 'FullReplaceWheelsRunFlat':
        return new FullReplaceWheelsRunFlatPriceCalculator();
      case 'TireKeeping':
        return new TireKeepingPriceCalculator();
      case 'WheelKeeping':
        return new WheelKeepingPriceCalculator();
      case 'PressureSensor':
        return new PressureSensorPriceCalculator();
      case 'ReplaceNipples':
        return new ReplaceNipplesPriceCalculator();
      case 'NewPackages':
        return new NewPackagesPriceCalculator();
      default:
        return undefined;
    }
  }
}

class PriceCalculator {
  constructor() {}

  getPrice() {}
}

class FormulaPriceCalculator extends PriceCalculator {
  BASE_PRICE = 0

  TIRE_EXTRA_PRICE = 0

  CAR_EXTRA_PRICE = {
    default: 0
  }

  DIAMETER_EXTRA_PRICE = {
    default: 0
  }

  /** *
   *
   * @param {Selector} tireSelector
   * @param {Selector} carSelector
   */

  getPrice(tireSelector, carSelector) {
    const tireDiameter = +tireSelector.value;
    const carType = carSelector.value;
    const tireExtraPrice = Dinero({ amount: this.TIRE_EXTRA_PRICE * 100 });
    const carExtraPrice = Dinero({ amount: this.CAR_EXTRA_PRICE[carType] * 100 || 0 });
    const carBasePrice = Dinero({ amount: this.BASE_PRICE * 100 });
    const diameterExtraPrice = Dinero({amount: this.DIAMETER_EXTRA_PRICE[tireDiameter] * 100 || 0 })
    return carBasePrice
      .add(tireExtraPrice
      .multiply(tireDiameter - 13))
      .add(carExtraPrice)
      .add(diameterExtraPrice);
  }
}

class ReplaceWheelsPriceCalculator extends FormulaPriceCalculator {
  BASE_PRICE = 800

  TIRE_EXTRA_PRICE = 0

  DIAMETER_EXTRA_PRICE = {
    16: 200,
    17: 200,
    18: 400,
    19: 400,
    20: 600
  }

  CAR_EXTRA_PRICE = {
    car: 0,
    suv: 300,
    minibus: 100,
    crossover: 100,
  }
}

class ReplaceBalanceWheelsPriceCalculator extends FormulaPriceCalculator {
  BASE_PRICE = 1200

  TIRE_EXTRA_PRICE = 0

  DIAMETER_EXTRA_PRICE = {
    15: 100,
    16: 500,
    17: 800,
    18: 1300,
    19: 1600,
    20: 1800
  }

  CAR_EXTRA_PRICE = {
    car: 0,
    suv: 400,
    minivan: 0,
    crossover: 0,
  }
}

class FullReplaceWheelsPriceCalculator extends FormulaPriceCalculator {
  BASE_PRICE = 2100

  TIRE_EXTRA_PRICE = 200

  DIAMETER_EXTRA_PRICE = {
    16: 100,
    17: 400,
    18: 500,
    19: 1100,
    20: 1300
  }

  CAR_EXTRA_PRICE = {
    car: 0,
    suv: 700,
    minivan: 0,
    crossover: 0,
  }
}

class FullReplaceWheelsRunFlatPriceCalculator extends FormulaPriceCalculator {
  BASE_PRICE = 2700

  TIRE_EXTRA_PRICE = 300

  DIAMETER_EXTRA_PRICE = {
    16: 200,
    17: 300,
    18: 700,
    19: 1400,
    20: 1700
  }

  CAR_EXTRA_PRICE = {
    car: 0,
    suv: 1000,
    minivan: 0,
    crossover: 0,
  }
}

class ListPriceCalculator extends PriceCalculator {
  PRICE = {
    default: 0,
  }

  getPrice(tireSelector) {
    const tireDiameter = +tireSelector.value;
    let price;
    try {
      price = Dinero({ amount: this.PRICE[tireDiameter] * 100 });
    } catch (e) {
      price = Dinero({ amount: this.PRICE.default * 100 });
    }
    return price;
  }
}

class TireKeepingPriceCalculator extends ListPriceCalculator {
  PRICE = {
    13: 3000,
    14: 3000,
    15: 3000,
    16: 3500,
    17: 3500,
    18: 4000,
    19: 4000,
    default: 4500,
  }
}

class WheelKeepingPriceCalculator extends ListPriceCalculator {
  PRICE = {
    13: 3500,
    14: 3500,
    15: 3500,
    16: 4000,
    17: 4000,
    18: 4500,
    19: 4500,
    default: 5000,
  }
}

class FixedPriceCalculator extends PriceCalculator {
  PRICE = 0

  getPrice() {
    return Dinero({ amount: this.PRICE * 100 });
  }
}

class ReplaceNipplesPriceCalculator extends FixedPriceCalculator {
  PRICE = 400
}

class NewPackagesPriceCalculator extends FixedPriceCalculator {
  PRICE = 0
}

class PressureSensorPriceCalculator extends FixedPriceCalculator {
  PRICE = 0
}

export default PriceCalculatorFactory;
