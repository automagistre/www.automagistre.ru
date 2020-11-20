import {ApolloClient, InMemoryCache} from '@apollo/client';
import {
  getVehiclesByManufacturer,
  maintenancesByVehicleID,
  getVehicleByID
} from './gql/queries';
import CarCase from '../ui/SelectCarModal/CarCase';

const SERVER_URL = APOLLO_URL

class ServerData {

  constructor() {
    this.client = new ApolloClient({
      uri: SERVER_URL,
      cache: new InMemoryCache(),
    })
  }

  async getVehiclesByManufacturer(manufacturer) {
    try {
      const {data} = await this.client.query({
        query: getVehiclesByManufacturer,
        variables: {manufacturer}})
      return {
        'response': 200,
        'data': data.getVehiclesByManufacturer
                .map(vehicle =>  new CarCase({
                  id: vehicle._id,
                  caseName: vehicle.caseName,
                  name: vehicle.name,
                  manufacturer: vehicle.manufacturer.name,
                  yearFrom: vehicle.yearFrom,
                  yearTill: vehicle.yearTill
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
      'data': data.maintenancesByVehicleID
      .map(eq => {
        return {
          id: eq.id,
          name: `${eq.engine.capacity} ${eq.transmission} ${eq.wheelDrive}`,
          mileageRepeat: 15,
          works: eq.works.map(work => {
            return {
              name: work.name,
              price: work.price.amount / 100,
              repeat: work.period,
              type: work.recommended ? 'recommendation' : 'work',
              note: work.description,
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
          id: data.getVehicleByID._id,
          caseName: data.getVehicleByID.caseName,
          name: data.getVehicleByID.name,
          manufacturer: data.getVehicleByID.manufacturer.name,
          yearFrom: data.getVehicleByID.yearFrom,
          yearTill: data.getVehicleByID.yearTill
        }
      }
    } catch (e) {
      return {
        'response': 500,
        'data': {}
      }
    }
  }

}

export default ServerData;
