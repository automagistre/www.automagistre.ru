const {gql} = require('apollo-server')


const Queries = gql`
    type Query {
        getVehiclesByManufacturerID(manufacturerID: String): [Vehicle]!,
        getVehicleByID(id: String): Vehicle
        getWorksByMaintenanceID(id: String): [Work]!
        maintenancesByVehicleID(id: String): [Maintenance]!
        getReviews: [Review]
    }
`
export default Queries
