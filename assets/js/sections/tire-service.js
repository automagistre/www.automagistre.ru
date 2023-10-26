import Selector from '../ui/Selector';
import TireService from '../ui/tire-service-calc/Tire-service';
import PriceGroup from '../ui/tire-service-calc/Price-group';
import { TireServiceForm } from '../ui/forms';
import ServerDataSender from '../helpers/server-data-sender';
import SuccessFeedBackPopup from '../ui/Popups/SuccessFeedBackPopup';
import ErrorFeedBackPopup from '../ui/Popups/ErrorFeedBackPopup';

const PRICE = {
  groups: [
    {
      name: 'Комплексный Шиномонтаж',
      services: [
        {
          id: 'ReplaceWheels',
          name: 'Переустановка колес',
        }, {
          id: 'ReplaceBalanceWheels',
          name: 'Переустановка колес c балансировкой',
        }, {
          id: 'FullReplaceWheels',
          name: 'Полный шиномонтаж',
        },
        {
          id: 'FullReplaceWheelsRunFlat',
          name: 'Полный шиномонтаж',
        },
      ],
      onlyOne: true,
    }, {
      name: 'Хранение шин',
      services: [
        {
          id: 'TireKeeping',
          name: 'Хранение шин',
        }, {
          id: 'WheelKeeping',
          name: 'Хранение шин на дисках',
        },
      ],
      onlyOne: true,
    }, {
      name: 'Дополнительно',
      services: [
        // {
        //   id: 'PressureSensor',
        //   name: 'Шиномонтаж при наличии датчиков давления',
        // }, 
        {
          id: 'ReplaceNipples',
          name: 'Заменить ниппеля на новые',
        }, 
        {
          id: 'NewPackages',
          name: 'Комплект новых пакетов для колес',
        },
      ],
      onlyOne: false,
    },
  ],
};

const tireServiceSec = () => {
  const secNode = document.querySelector('#tire-service');
  const tireSelectorNode = secNode.querySelector('.js-tire-selector');
  const carSelectorNode = secNode.querySelector('.js-car-selector');
  const tireServiceNode = secNode.querySelector('.price-groups');
  const tireServiceTotalNode = secNode.querySelector('.tire-order__cost');
  const tireServiceFromNode = secNode.querySelector('.sec-about__form');
  const submitButton = secNode.querySelector('.js-tire-service-submit');
  const carSelector = new Selector(carSelectorNode);
  const tireSelector = new Selector(tireSelectorNode);
  const tireService = new TireService(tireServiceNode);

  const updateTotalCost = () => {
    tireServiceTotalNode.innerHTML = `${tireService.totalCost.toFormat()}<i class="icon-rub">a</i>`;
  };

  carSelector.onChange = tireSelector.onChange = () => {
    if (carSelector.currentSelect && tireSelector.currentSelect) {
      tireService.updatePrice(tireSelector.currentSelect, carSelector.currentSelect);
      updateTotalCost();
      tireService.show();
    } else {
      tireService.hide();
    }
  };

  for (const group of PRICE.groups) {
    const priceGroup = new PriceGroup(group, updateTotalCost);
    tireService.addPriceGroup(priceGroup);
  }
  tireService.render(tireServiceNode);

  const form = new TireServiceForm(tireServiceFromNode, tireSelector, carSelector, tireService);

  const dataSender = new ServerDataSender();
  dataSender.onSuccess = () => {
    (new SuccessFeedBackPopup('Мы получили Ваш заказ!')).open();
    form.clear();
  };
  dataSender.onError = () => {
    (new ErrorFeedBackPopup('Нет соединения с сервером, повторите попытку позже')).open();
  };

  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (form.isValid) {
      await dataSender.sendForm(form);
    } else {
      form.showInvalidInputs();
    }
  });
};

export default tireServiceSec;
