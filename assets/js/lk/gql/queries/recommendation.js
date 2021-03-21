const gql = require('graphql-tag');

const GET_RECOMMENDATIONS_BY_CAR_ID = gql`
    query getRecommnedationsByCarId($carId: ID!) {
        recommendations(carId: $carId) {
            id
            name
            price {
                amount
            }
            date
            isChecked @client
            parts {
                id
                part {
                    id
                    manufacturer {
                        name
                    }
                    name
                    price {
                        amount
                    }
                    unit
                }
                quantity
                isChecked @client
            }
        }
    }
`;

export default GET_RECOMMENDATIONS_BY_CAR_ID
