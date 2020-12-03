const {gql} = require('apollo-server')


const Queries = gql`
    type Query {
        getVehiclesByManufacturerID(manufacturerID: String): [Vehicle]!,
        getVehicleByID(id: String): Vehicle
        getWorksByMaintenanceID(id: String): [Work]!
        maintenancesByVehicleID(id: String): [Maintenance]!
        getLastReviews(count: Int): [Review]
        getReviewsByPageNumber(count: Int, page: Int): [Review]
        getCountOfReviews: Int
    }
`
export default Queries
