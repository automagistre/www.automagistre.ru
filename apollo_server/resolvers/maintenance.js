import Maintenance from '../mongo/maintenanceShema';

export default {
  Query: {

    async getVehiclesByManufacturerID(_, args) {
      return Maintenance.find({'vehicle.manufacturer.id': args.manufacturerID}, {vehicle: 1, _id: 0}).distinct('vehicle')
    },

    async getVehicleByID(_, args) {
      const vehicle = await Maintenance.findOne({'vehicle._id': args.id}, {vehicle: 1})
      return vehicle.vehicle
    },

    async getWorksByMaintenanceID(_, args) {
      const maintenance = await Maintenance.findById(args.id)
      return maintenance.works
    },

    async maintenancesByVehicleID(_, args) {
      return  Maintenance.find({'vehicle._id': args.id}).exec()
    }
  }
}

