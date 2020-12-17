import {ApolloClient, InMemoryCache} from '@apollo/client';
import {
    getVehiclesByManufacturerID,
    maintenancesByVehicleID,
    getVehicleByID,
    getCountOfReviews,
    getLastReviews,
    getReviewsByPageNumber

} from './gql/queries';
import CarCase from '../ui/SelectCarModal/CarCase';

// const SERVER_URL = APOLLO_URL
// const SERVER_URL = 'http://localhost:3000'
const SERVER_URL = 'http://msk.automagistre.local/api/www'

class ServerData {

  constructor() {
    this.client = new ApolloClient({
      uri: SERVER_URL,
      cache: new InMemoryCache(),
    })
  }

  async getVehiclesByManufacturerID(manufacturerID) {
    try {
      const {data} = await this.client.query({
        query: getVehiclesByManufacturerID,
        variables: {manufacturerID}})
      return {
        'response': 200,
        'data': data.vehicles
                .map(vehicle =>  new CarCase({
                  id: vehicle.id,
                  caseName: vehicle.caseName,
                  name: vehicle.name,
                  manufacturer: vehicle.manufacturer.name,
                  manufacturerID: vehicle.manufacturer.id,
                  yearFrom: vehicle.production.from || 1990,
                  yearTill: vehicle.production.till
                }, this))
      }

    } catch (error) {
      return {
        'response': 500,
        'data': []
      }
    }
  }

  async maintenancesByVehicleID(id) {
    try {
    const {data} = await  this.client.query({
      query: maintenancesByVehicleID,
      variables: {id}})
    return {
      'response': 200,
      'data': data.maintenances
      .map(eq => {
        const mileageRepeat = Math.min(...eq.works.map(work => +work.period))
        let engineType = eq.engine.type || '',
            airIntakeType = eq.engine.airIntake || ''
        engineType = engineType.toLowerCase() === 'diesel' ? 'D' : ''
        airIntakeType = airIntakeType.toLowerCase() === 'turbo' ? 'T' : ''
        return {
          id: eq.id,
          name: `${eq.engine.capacity}${airIntakeType}${engineType} ${eq.transmission} ${eq.wheelDrive}`,
          mileageRepeat,
          works: eq.works.map(work => {
            return {
              id: work.id,
              name: work.name,
              price: work.price.amount / 100,
              repeat: work.period,
              type: work.recommended ? 'recommendation' : 'work',
              note: work.description,
              position: work.position === 0 ? 9999 : work.position,
              parts: work.parts.map(part => {
                return {
                  id: part.part.id,
                  name: part.part.name,
                  manufacture: part.part.manufacturer.name,
                  unit: 'шт',
                  count: part.quantity / 100,
                  price: part.part.price.amount / 100
                }
              })
            }
          })
        }
      })
    }

    } catch (e) {
      return {
        'response': 500,
        'data': []
      }
    }
  }

  async getVehicleByID(id) {
    try {
      const {data} = await this.client.query({
        query: getVehicleByID,
        variables: {id}})
      return {
        'response': 200,
        'data': {
          id: data.vehicle._id,
          caseName: data.vehicle.caseName,
          name: data.vehicle.name,
          manufacturer: data.vehicle.manufacturer.name,
          yearFrom: data.vehicle.production.from,
          yearTill: data.vehicle.production.till
        }
      }
    } catch (e) {
      return {
        'response': 500,
        'data': {}
      }
    }
  }

  async getLastReviews(count) {
    try {
      const {data} = await this.client.query({
        query: getLastReviews,
        variables: {count}})
      return {
        'response': 200,
        'data': data.getLastReviews.map(review => {
          return {
            author: review.author,
            manufacturer: '',
            model: '',
            content: review.content,
            source: 'Я.карты',
            publish_at: new Date(review.publishAt)
          };
        })
      }
    } catch (e) {
      return {
        'response': 500,
        'data': []
      }
    }
  }

  async getReviewsByPageNumber(count, page) {
    try {
      const {data} = await this.client.query({
        query: getReviewsByPageNumber,
        variables: {count, page}})
      return {
        'response': 200,
        'data': data.getReviewsByPageNumber.map(review => {
          return {
            author: review.author,
            manufacturer: '',
            model: '',
            content: review.content,
            source: 'Я.карты',
            publish_at: new Date(review.publishAt)
          };
        })
      }
    } catch (e) {
      return {
        'response': 500,
        'data': []
      }
    }
  }

  async getCountOfReviews() {
    try {
      const {data} = await this.client.query({
        query: getCountOfReviews,
      })
      return {
        'response': 200,
        'data': data.getCountOfReviews
      }
    } catch (e) {
      return {
        'response': 500,
        'data': 376
      }
    }
  }
}

export default ServerData;
