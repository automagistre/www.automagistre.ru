export const carModel = {
  id: 1,
  manufacture: 'Nissan',
  name: 'Juke',
  model: 'J10',
  startYear: 2001,
  stopYear: '',
  img: '/images/costing/altima.jpg',
  equipments: {
    100500: {
      name: '1,5/1,8 MT 2WD',
      mileageRepeat: 15,
      works: [
        {
          id: 1,
          name:'Замена масла',
          price: 500,
          repeat: 15,
          recommendation: false,
          parts: [
            {
              id:4,
              name: 'Масло ДВС',
              manufacture: 'Nissan',
              count: 4.5,
              price: 600
            },
            {
              id:5,
              name: 'Фильтр',
              manufacture: 'Nissan',
              count: 1,
              price: 400
            },
          ]
        },
        {
          id: 2,
          name:'Замена масла АКПП',
          price: 500,
          repeat: 60,
          recommendation: false,
          parts: [
            {
              id:4,
              name: 'Масло ДВС',
              manufacture: 'Nissan',
              count: 4.5,
              price: 600
            },
            {
              id:7,
              name: 'Фильтр',
              manufacture: 'Nissan',
              count: 1,
              price: 400
            },
          ]
        },
        {
          id: 3,
          name:'Диагностика',
          price: 500,
          repeat: 45,
          recommendation: false,
          parts: [ ]
        },
        {
          id: 8,
          name:'Замена масла',
          price: 500,
          repeat: 60,
          recommendation: true,
          parts: [
            {
              id:4,
              name: 'Масло ДВС',
              manufacture: 'Nissan',
              count: 4.5,
              price: 600
            },
            {
              id:5,
              name: 'Фильтр',
              manufacture: 'Nissan',
              count: 1,
              price: 400
            },
          ]
        }
      ],
    },

    100501: {
      name: '7.0T MT 2WD',
      mileageRepeat: 10,
      works: [
        {
          id: 1,
          name:'Замена масла',
          price: 500,
          repeat: 10,
          recommendation: false,
          parts: [
            {
              id:4,
              name: 'Масло ДВС',
              manufacture: 'Nissan',
              count: 4.5,
              price: 600
            },
            {
              id:5,
              name: 'Фильтр',
              manufacture: 'Nissan',
              count: 1,
              price: 405
            },
          ]
        },
      ]
    }
  }
};
