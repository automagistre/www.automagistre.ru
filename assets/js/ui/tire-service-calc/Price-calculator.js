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
  BASE_PRICE = 400

  TIRE_EXTRA_PRICE = 0

  DIAMETER_EXTRA_PRICE = {
    17: 100,
    18: 200,
    19: 300,
    20: 400
  }

  CAR_EXTRA_PRICE = {
    car: 0,
    suv: 200,
    minibus: 100,
    crossover: 100,
  }
}

class ReplaceBalanceWheelsPriceCalculator extends FormulaPriceCalculator {
  BASE_PRICE = 1000

  TIRE_EXTRA_PRICE = 100

  DIAMETER_EXTRA_PRICE = {
    17: 100,
    18: 200,
    19: 400,
    20: 800
  }

  CAR_EXTRA_PRICE = {
    car: 0,
    suv: 300,
    minivan: 0,
    crossover: 0,
  }
}

class FullReplaceWheelsPriceCalculator extends FormulaPriceCalculator {
  BASE_PRICE = 1500

  TIRE_EXTRA_PRICE = 200

  DIAMETER_EXTRA_PRICE = {
    16: 100,
    17: 200,
    18: 500,
    19: 800,
    20: 1500
  }

  CAR_EXTRA_PRICE = {
    car: 0,
    suv: 800,
    minivan: 400,
    crossover: 400,
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
    13: 1900,
    14: 1900,
    15: 1900,
    16: 2000,
    17: 2000,
    18: 3000,
    19: 3000,
    default: 3500,
  }
}

class WheelKeepingPriceCalculator extends ListPriceCalculator {
  PRICE = {
    13: 2300,
    14: 2300,
    15: 2500,
    16: 2500,
    17: 2500,
    18: 3500,
    19: 4000,
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
  PRICE = 200
}

class PressureSensorPriceCalculator extends FixedPriceCalculator {
  PRICE = 1000
}

export default PriceCalculatorFactory;
