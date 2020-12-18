import {ApolloClient, InMemoryCache} from '@apollo/client';
import {
    getVehiclesByManufacturerID,
    maintenancesByVehicleID,
    getVehicleByID,
    getCountOfReviews,
    getReviews
} from './gql/queries';
import CarCase from '../ui/SelectCarModal/CarCase';

const SERVER_URL = APOLLO_URL

const engineType = {
  'diesel': 'D'
}

const airIntakeType = {
  'turbo': 'T'
}

class ServerData {

  constructor() {
    this.client = new ApolloClient({
      uri: SERVER_URL,
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
            const {id, name, period: repeat, recommended, description: note, position, parts, price:{amount: price}} = work
            return {
              id, name, repeat, note,
              price: price / 100,
              type: recommended ? 'recommendation' : 'work',
              position: position === 0 ? Infinity : position,
              parts: parts.map(part => {
                const {quantity,
                  part: {id, name, unit = 'шт', price:{amount: price}, manufacturer: {name: manufacture}}} = part
                return {
                  id, name, manufacture, unit,
                  count: quantity / 100,
                  price: price / 100
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
}

export default ServerData;
