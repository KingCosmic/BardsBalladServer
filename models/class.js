const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const classSchema = new Schema({
  name: String,
  hd: Number,
  proficiency: [],
  startingProficiencies: {
    armor: [],
    weapons: [],
    skills: {
      choose: Number,
      from: Array<String>
    }
  },
  startingEquipment: {
    additionalFromBackground: Boolean,
    goldAlternative: String,
    default: Array<String>
  }
})

module.exports = mongoose.model('classes', classSchema);