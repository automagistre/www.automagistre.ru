import gql from 'graphql-tag';

export const GET_USER_CARS = gql`
  query getUserCars {
      cars {
          id
          vehicle {
              name
              caseName
              manufacturer {
                  name
              }
          }
          engine {
              capacity
              type
              
          }
          year
          identifier
          gosnomer
      }
  }
`
