const userUuid = 'dummy_user_uuid'
const carUuid = 'dummy_car_uuid'

class DummyServerData {

  getUser(uuid) {
    const users = {}
    users[userUuid] = {
      name: 'Иван',
      surname: 'Суходрищев',
      mobilePhone: '+79261111111',
      officePhone: '+74952222222',
      email: undefined,
    }
    return new Promise(resolve => setTimeout(() =>resolve(users[uuid]), 1000))
  }

  getCarsByUserId() {
    const data =[
      {
        id: carUuid + "_1",
        caseInfo: {
          manufacturer: 'Nissan',
          name: 'Qashgai',
          caseName: 'J10',
        },
        year: '2008',
        engine: {
          name: 'MR20DE',
          type: 'Бензин',
          airIntake: undefined,
          injection: undefined,
          capacity: 2.0
        },
        identifier: 'SJNFBNJ10U1281039',
        gosnomer: 'А001АА97'
      },
      {
        id: carUuid + "_2",
        caseInfo: {
          manufacturer: 'Ваз',
          name: '2107',
          caseName: 'Жига',
        },
        year: '1978',
        engine: {
          name: undefined,
          type: 'Бензин',
          airIntake: undefined,
          injection: undefined,
          capacity: 1.6
        },
        identifier: 'XJNFBNJ10U1281039',
        gosnomer: 'R001US05'
      }
    ]
    return new Promise(resolve => setTimeout(() =>resolve(data), 1000))
  }

  getWorksByCarID(carid) {
    const carUuid_1 = carUuid + '_1';
    const carUuid_2 = carUuid + '_2';
    const carsWorks = {};
    carsWorks[carUuid_1] = [
      {
        id: 'UUID_1',
        name: 'Замена масла ДВС',
        price: {
          amount: 50000,
          currency: "RUR"
        },
        order: {
          id: carUuid_1 + 'order_1',
          number: 36580
        },
        partsTotalPrice: {
          amount: 280000,
          currency: "RUR"
        },
        date: '01.01.2020',
        mileage: 90000
      },
      {
        id: 'UUID_2',
        name: 'Замена Воздушного фильтра',
        price: {
          amount: 0,
          currency: "RUR"
        },
        order: {
          id: carUuid_1 + 'order_1',
          number: 36580
        },
        partsTotalPrice: {
          amount: 50000,
          currency: "RUR"
        },
        date: '01.01.2020',
        mileage: 90000
      }
    ];
    carsWorks[carUuid_2] = [
      {
        id: 'UUID_3',
        name: 'Замена Двигателя',
        price: {
          amount: 2500000,
          currency: "RUR"
        },
        order: {
          id: carUuid_2 + 'order_1',
          number: 36583
        },
        partsTotalPrice: {
          amount: 0,
          currency: "RUR"
        },
        date: '01.01.2019',
        mileage: 300000
      },
      {
        id: 'UUID_4',
        name: 'Замена дисков',
        price: {
          amount: 180000,
          currency: "RUR"
        },
        order: {
          id: carUuid_2 + 'order_2',
          number: 36584
        },
        partsTotalPrice: {
          amount: 850000,
          currency: "RUR"
        },
        date: '01.02.2019',
        mileage: 350000
      }
    ]
    return new Promise(resolve => setTimeout(() =>
        resolve(carsWorks[carid]), 700))
  }
}

export default DummyServerData

export {
  userUuid
}
