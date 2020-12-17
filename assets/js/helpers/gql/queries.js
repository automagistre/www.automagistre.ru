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
export const getLastReviews = gql`
    query getLastReviews($count: Int) {
        getLastReviews(count: $count) {
            _id
            author
            content
            publishAt
        }
    }
`

export const getReviewsByPageNumber = gql`
    query getReviewsByPageNumber($count: Int, $page: Int) {
        getReviewsByPageNumber(count: $count, page: $page) {
            _id
            author
            content
            publishAt
        }
    }
`

export const getCountOfReviews = gql`
    query getCountOfReviews {
        getCountOfReviews
    }
`
