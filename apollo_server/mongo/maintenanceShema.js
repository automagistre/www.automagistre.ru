const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MaintenanceSchema = new Schema({
  _id: String,
  engine: {
    airIntake: String,
    capacity: String,
    injection: String,
    name: String,
    type: String,
  },
  transmission: String,
  vehicle: {
    _id: String,
    caseName: String,
    localizedName: String,
    manufacturer: {
      id: String,
      localizedName: String,
      name: String,
    },
    name: String,
    yearFrom: String,
    yearTill: String,
  },
  wheelDrive: String,
  works: [{
    description: String,
    name: String,
    parts: [
      {
        part: {
          discount: {
            amount: String,
            currency: String,
          },
          id: String,
          manufacturer: {
            id: String,
            localizedName: String,
            name: String,
          },
          name: String,
          number: String,
          price: {
            amount: String,
            currency: String,
          },
          universal: Boolean
        },
        quantity: Number,
        recommended: Boolean
      }
    ],
    period: Number,
    price: [
      {
        amount: String,
        currency: String,
      }
    ],
    recommended: Boolean
  }]
})

export default mongoose.model('maintenance', MaintenanceSchema, 'maintenance')
