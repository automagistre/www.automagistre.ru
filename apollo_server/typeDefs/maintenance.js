const {gql} = require('apollo-server')


const typeDefs = gql`
  type Maintenance {
      id: String,
      engine: Engine,
      transmission: String,
      vehicle: Vehicle,
      wheelDrive: String,
      works: [Work]  
  }
  
  type Engine {
      airIntake: String,
      capacity: String,
      injection: String,
      name: String,
      type: String,
  }
  
  type Vehicle {
      id: String,
      caseName: String,
      localizedName: String,
      manufacturer: Manufacturer,
      name: String,
      yearFrom: String,
      yearTill: String,
  }
  
  type Manufacturer {
      id: String,
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
      discount: Price,
      id: String,
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
`
export default typeDefs
