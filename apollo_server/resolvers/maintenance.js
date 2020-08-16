import Maintenance from '../mongo/maintenanceShema';

const  resolvers = {
  Query: {
    async maintenances() {
      return await Maintenance.find()
    },
    async maintenanceByCaseName(parent, args) {
      return Maintenance.findOne({
        'vehicle.caseName': args.caseName,
        'vehicle.manufacturer.name': args.manufacturer
      }).exec()
    }
  }
}

export default resolvers
