const gql = require('graphql-tag');

const GET_WORKS_BY_CAR_ID = gql`
  query getWorksByCarId($carId: ID!, $after: String, $first: Int) {
#      activeCarId @client @export(as: "carId")
      works(carId: $carId, after: $after, first: $first) {
          edges {
              node {
                  id
                  name
                  price {
                      amount
                  }
                  order {
                      number
                      closeDate
                      mileage
                  }
              }
          }
          pageInfo {
              endCursor
              hasNextPage
          }
          totalCount
      }
  }
`;

export default GET_WORKS_BY_CAR_ID;
