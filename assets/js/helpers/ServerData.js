import {ApolloClient, InMemoryCache} from '@apollo/client';
import {
  getVehiclesByManufacturerID,
  maintenancesByVehicleID,
  getVehicleByID,
  getCountOfReviews,
  getReviews, getStats,
} from './gql/queries';
import CarCase from '../ui/SelectCarModal/CarCase';
import {GRAPHQL_SERVER} from '../vars/globals';

const engineType = {
  'diesel': 'D'
}

const airIntakeType = {
  'turbo': 'T'
}

class ServerData {

  constructor() {
    this.client = new ApolloClient({
      uri: GRAPHQL_SERVER,
      cache: new InMemoryCache(),
    })
  }

  async getVehiclesByManufacturerID(manufacturerID) {
    try {
      const {data: {vehicles}} = await this.client.query({
        query: getVehiclesByManufacturerID,
        variables: {manufacturerID}})
      return {
        'response': 200,
        'data': vehicles.map( vehicle => {
          const { id, caseName, name,
                  manufacturer: {name: manufacturer, id: manufacturerID},
                  production: {from, till}} = vehicle
          return new CarCase({
            id, caseName, name, manufacturer, manufacturerID,
            yearFrom: from || 1990,
            yearTill: till }, this)})
      }
    } catch (error) {
      return {
        'response': 500,
        'data': []
      }
    }
  }

  async maintenancesByVehicleID(vehicleId) {
    try {
    const {data: {maintenances}} = await  this.client.query({
      query: maintenancesByVehicleID,
      variables: {id: vehicleId}})
    return {
      'response': 200,
      'data': maintenances
      .map(({id, works, engine, transmission, wheelDrive}) => {
        const mileageRepeat = Math.min(...works.map(work => +work.period))
        return {
          id, mileageRepeat,
          name: `${engine.capacity}${engineType[engine.type] || ''}${airIntakeType[engine.airIntake] || ''} ${transmission} ${wheelDrive}`,
          works: works.map(work => {
            const {id, name, period: repeat, recommended, description: note, position, parts, price} = work
            return {
              id, name, repeat, note,
              price: price,
              type: recommended ? 'recommendation' : 'work',
              position: position === 0 ? Infinity : position,
              parts: parts.map(part => {
                const {quantity,
                  part: {id, name, unit = 'шт', price, manufacturer: {name: manufacture}}} = part
                return {
                  id, name, manufacture, unit,
                  count: quantity / 100,
                  serverCount: quantity,
                  price: price
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

  async getVehicleByID(vehicleId) {
    try {
      const {data: {vehicle: {
          id, caseName, name,
          manufacturer: {name: manufacturer},
          production: {from: yearFrom, till: yearTill}
      }}} = await this.client.query({
        query: getVehicleByID,
        variables: {id: vehicleId}})

      return {
        'response': 200,
        'data': {id, caseName, name, manufacturer, yearFrom, yearTill}
      }
    } catch (e) {
      return {
        'response': 500,
        'data': {}
      }
    }
  }


  async getReviewsByPageNumber(count, after) {
    try {
      const {data: {reviews: {nodes, pageInfo, totalCount}}} = await this.client.query({
        query: getReviews,
        variables: {count, after}})
      return {
        'response': 200,
        'data': {
          pageInfo,
          totalCount,
          reviews: nodes.map(({
            author, content, source, publishAt
          }) => {
            return {
              author, content, source,
              publish_at: new Date(publishAt),
              manufacturer: '',
              model: '',
            }
          }),
        }
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
      const {data:{reviews:{totalCount}}} = await this.client.query({
        query: getCountOfReviews,
      })
      return {
        'response': 200,
        'data': totalCount
      }
    } catch (e) {
      return {
        'response': 500,
        'data': undefined
      }
    }
  }

  async getStats() {
    try {
      const {data:{ stats:{orders, vehicles}}} = await this.client.query({
        query: getStats,
      })
      return {
        'response': 200,
        'data': {orders, vehicles}
      }
    } catch (e) {
      return {
        'response': 500,
        'data': {orders: undefined, vehicles: undefined}
      }
    }
  }
}

export default ServerData;
