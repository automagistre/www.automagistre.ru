import { gql } from '@apollo/client'

export const getVehiclesByManufacturerID = gql`
    query getVehiclesByManufacturerID($manufacturerID: Uuid!) {
        vehicles(manufacturerId: $manufacturerID) {
          id
          caseName
          localizedName
          manufacturer {
              id
              name
          }
          name
          production {
              till
              from
          }
    }}`


export const maintenancesByVehicleID = gql`  
    query maintenancesByVehicleID($id: Uuid!) {
        maintenances(vehicleId: $id) {
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
              id
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
              position
          }
      }}`

export const getVehicleByID = gql`
  query getVehicleByID($id: Uuid!) {
      vehicle(id: $id) {
          id
          caseName
          localizedName
          manufacturer {
              name
          }
          name
          production {
              till
              from
          }
      }
  }
`
export const getReviews = gql`
    query getLastReviews($count: Int, $after: Uuid) {
        reviews(first: $count, after: $after) {
            nodes{
                id
                author
                content
                source
                publishAt
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            totalCount
        }
    }
`

export const getCountOfReviews = gql`
    query getCountOfReviews {
        reviews{
            totalCount
        }
    }
`
