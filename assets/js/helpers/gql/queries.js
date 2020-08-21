import { gql } from '@apollo/client'

export const getVehiclesByManufacturer = gql`
    query getVehiclesByManufacturer($manufacturer: String) {
      getVehiclesByManufacturer(manufacturer: $manufacturer) {
          _id
          caseName
          localizedName
          manufacturer {
              name
          }
          name
          yearFrom
          yearTill
    }}`
