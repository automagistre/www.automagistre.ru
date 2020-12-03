import { gql } from '@apollo/client'

export const getVehiclesByManufacturerID = gql`
    query getVehiclesByManufacturerID($manufacturerID: String) {
      getVehiclesByManufacturerID(manufacturerID: $manufacturerID) {
          _id
          caseName
          localizedName
          manufacturer {
              id
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
              _id
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
