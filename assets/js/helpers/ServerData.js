import {ApolloClient, InMemoryCache} from '@apollo/client';
import {getVehiclesByManufacturer} from './gql/queries'
import CarCase from '../ui/SelectCarModal/CarCase'

const SERVER_URL = 'http://localhost:3000'

class ServerData {

  constructor() {
    this.client = new ApolloClient({
      uri: SERVER_URL,
      cache: new InMemoryCache()
    })
  }

  async getVehiclesByManufacturer(manufacturer) {

    const {data} = await this.client.query({
      query: getVehiclesByManufacturer,
      variables: {manufacturer}})
    return data.getVehiclesByManufacturer
            .map(vehicle =>  new CarCase({
                id: vehicle._id,
                caseName: vehicle.caseName,
                name: vehicle.name,
                manufacturer: vehicle.manufacturer.name,
                yearFrom: vehicle.yearFrom,
                yearTill: vehicle.yearTill
              }, this))
  }

}

export default ServerData;
