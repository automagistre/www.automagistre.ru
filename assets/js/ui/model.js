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
      works: {
        1: {
          name: 'Замена масла',
          price: 500,
          repeat: 15,
          recommendation: false,
          // note: 'Нужно менять каждый день',
          parts: {
            4: {
              name: 'Масло ДВС',
              manufacture: 'Nissan',
              unit: 'л',
              count: 4.5,
              price: 600
            },
            5: {
              name: 'Фильтр',
              manufacture: 'Nissan',
              count: 2,
              price: 400
            },
          }
        },
        2: {
          name: 'Замена масла АКПП',
          price: 500,
          repeat: 60,
          recommendation: false,
          parts: {
            4: {
              name: 'Масло АКПП',
              manufacture: 'Nissan',
              unit: 'л',
              count: 4.5,
              price: 600
            },
            7: {
              name: 'Фильтр АКПП',
              manufacture: 'Nissan',
              unit: 'шт',
              count: 1,
              price: 400
            }
          }
        },
        3: {
          name: 'Диагностика',
          price: 500,
          repeat: 45,
          recommendation: false,
          parts: {}
        },
        8: {
          name: 'Замена масла рек',
          price: 500,
          repeat: 60,
          recommendation: true,
          note: "Нужно менять и все, питух!",
          parts: {
            4: {
              name: 'Масло ДВС РЕК',
              manufacture: 'Nissan',
              unit: 'л',
              count: 4.5,
              price: 600
            },
            5: {
              name: 'Фильтр РЕК',
              manufacture: 'Nissan',
              unit: 'шт',
              count: 1,
              price: 400
            },

          }
        },
        9: {
          name: 'Диагностика',
          price: 500,
          repeat: 45,
          recommendation: true,
          parts: {}
        },
      }
    },

    100501: {
      name: '7.0T MT 2WD',
      mileageRepeat: 10,
      works: {
        1: {
          name: 'Замена масла',
          price: 500,
          repeat: 10,
          recommendation: false,
          parts: {
            4: {
              name: 'Масло ДВС',
              manufacture: 'Nissan',
              count: 4.5,
              unit: 'л',
              price: 600
            },
            5: {
              name: 'Фильтр',
              manufacture: 'Nissan',
              count: 1,
              unit: 'шт',
              price: 405
            },
          }
        },
      }
    }
  }
};
