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


export const maintenancesByVehicleID = gql`  
    query maintenancesByVehicleID($id: String) {
      maintenancesByVehicleID(id: $id) {
          id
          engine {
              name
              type
              airIntake
              injection
              capacity
          }
          transmission
          wheelDrive
          works {
              description
              name
              parts {
                  part {
                      id
                      discount {
                          amount
                          currency
                      }
                      manufacturer {
                          id
                          localizedName
                          name
                      }
                      name
                      number
                      price {
                          amount
                          currency
                      }
                      universal
                  }
                  quantity
              }
              period
              price {
                  amount
                  currency
              }
              recommended
          }
      }}`

export const getVehicleByID = gql`
  query getVehicleByID($id: String) {
      getVehicleByID(id: $id) {
          _id
          caseName
          localizedName
          manufacturer {
              name
          }
          name
          yearFrom
          yearTill
      }
  }
`
