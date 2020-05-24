import Selector from '../ui/Selector';
import TireService from '../ui/tire-service-calc/Tire-service';
import PriceGroup from '../ui/tire-service-calc/Price-group';

const PRICE = {
  groups:[
    {
      name: 'Комплесный Шиномонтаж',
      services: [
        {
          id: 'ReplaceWheels',
          name: 'Переустановка колес'
        },{
          id: 'ReplaceBalanceWheels',
          name: 'Переустановка колес c балансировки'
        },{
          id: 'FullReplaceWheels',
          name: 'Полный шиномонтаж'
        }
      ]
    },{
      name: 'Хранение шин',
      services: [
        {
          id: 'TireKeeping',
          name: 'Хранение шин'
        },{
          id: 'WheelKeeping',
          name: 'Хранение шин на дисках'
        }
      ]
    },{
      name: 'Допонительно',
      services: [
        {
          id: 'PressureSensor',
          name: 'Шиномотаж при наличии датчиков давления'
        },{
          id: 'ReplaceNipples',
          name: 'Заменить ниппеля на новые'
        },{
          id: 'NewPackages',
          name: 'Комплект новых пакетов для колес'
        }
      ]
    }
  ]
}

const tireServiceSec = () => {
  const secNode = document.querySelector('#tire-service'),
        tireSelectorNode = secNode.querySelector('.js-tire-selector'),
        carSelectorNode = secNode.querySelector('.js-car-selector'),
        tireServiceNode = secNode.querySelector('.price-groups'),
        carSelector = new Selector(carSelectorNode),
        tireSelector = new Selector(tireSelectorNode)
  const tireService = new TireService(tireServiceNode)

  carSelector.onChange = tireSelector.onChange = () =>{
    if (carSelector.currentSelect && tireSelector.currentSelect) {
      tireService.updatePrice(tireSelector, carSelector)
      tireService.show()
    } else {
      tireService.hide()
    }
  }

  for(let group of PRICE.groups) {
    tireService.addPriceGroup(new PriceGroup(group))
  }
  tireService.render(tireServiceNode)
}

export default tireServiceSec;
