const {gql} = require('apollo-server')


const typeDefs = gql`
  type Maintenance {
      id: ID,
      engine: Engine,
      transmission: String,
      vehicle: Vehicle,
      wheelDrive: String,
      works: [Work]  
  }
  
  type Engine {
      name: String,
      type: String,
      airIntake: String,
      injection: String,
      capacity: String,
  }
  
  type Vehicle {
      _id: ID,
      caseName: String,
      localizedName: String,
      manufacturer: Manufacturer,
      name: String,
      yearFrom: String,
      yearTill: String,
  }
  
  type Manufacturer {
      id: ID,
      localizedName: String,
      name: String,
  }
  
  type Work {
      description: String,
      name: String,
      parts: [PartItem],
      period: Int,
      price: Price,
      recommended: Boolean,
  }
  
  type PartItem {
      part: Part
      quantity: Int
      recommended: Boolean
  }
  
  type Part {
      id: ID,
      discount: Price,
      manufacturer: Manufacturer,
      name: String,
      number: String,
      price: Price,
      universal: Boolean,
  }
  
  type Price {
      amount: String,
      currency: String,
  }
  
  type Query {
      maintenances: [Maintenance]!
      maintenanceByCaseName(caseName: String, manufacturer: String): Maintenance
  }
`
export default typeDefs
