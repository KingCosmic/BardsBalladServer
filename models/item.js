const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  rarity: {
    type: String,
    required: true
    /*
      Notes: "None" is for mundane items. "Unknown (Magic)" is for miscellaneous magical items. "Unknown" is for miscellaneous mundane items.

      ["None", "Common", "Uncommon", "Rare", "Very Rare", "Legendary", "artifact", "Unknown", "Unknown (Magic)", "Varies"]
    */
  },
  tags: {
    type: Array<String>
    /*
      Notes: Can have multiple.
      
      ["ammunition", "armor", "axe", "sword", "weapon", "sentient", "poison"]
    */
  },
})

module.exports = mongoose.model('items', itemSchema);