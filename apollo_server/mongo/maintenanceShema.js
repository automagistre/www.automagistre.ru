import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const MaintenanceSchema = new Schema({
  _id: String,

  transmission: String,
  engine: {
    name: String,
    type: Object,
    airIntake: String,
    injection: String,
    capacity: String
  },
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
    _id: String,
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
    price: {
        amount: String,
        currency: String,
    },
    recommended: Boolean
  }]
})

const Maintenance = mongoose.model('maintenance', MaintenanceSchema, 'maintenance')

export default Maintenance
