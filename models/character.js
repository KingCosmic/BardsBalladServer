const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const characterSchema = new Schema({
  ownerID: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true
  },

  personality: {
    bonds: {
      type: String,
      default: 'Mittsie, Aliza\'s mother. '
    },

    flaws: {
      type: String,
      default: 'Very untrusting and spiteful of authority.'
    },

    ideals: {
      type: String,
      default: 'Leads a simple life, doesn\'t like gambling, values alone time.'
    },

    traits: {
      type: String,
      default: 'Loyal, Honest, Self-Concerned, Frivilous with time.'
    }
  },

  castingClass: { type: String, default: 'WIZARD' },
  
  castingAbility: { type: String, default: 'INT' },

  castingDC: { type: Number, default: 15 },

  castingBonus: { type: Number, default: 7 },

  spellSlots: {
    one: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    two: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    three: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    four: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    five: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    six: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    seven: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    eight: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    nine: {
      current: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    }
  },

  name: {
    type: String,
    required: true,
    default: 'Aliza Cartwight'
  },

  race: {
    type: String,
    default: 'Human'
  },

  languages: {
    type: String,
    default: 'common'
  },

  alignment: {
    type: String,
    default: 'Neutral/Good'
  },

  background: {
    type: String,
    default: 'Farmhand'
  },

  job: {
    type: String,
    default: 'adventurer'
  },

  passivePerception: {
    type: Number,
    default: 10
  },

  proficiency: {
    type: Number,
    default: 2
  },

  initiative: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  },

  backstory: {
    type: String,
    default: 'Aliza Cartwright is a female farmhand who, when clergymen of the church found and killed her father for adultery, was forced to return to her mother\'s hovel in Estermeyer, where she grew up. Aliza, discontent with her new life and seeking medicine for her now-ailing mother returned to the scene of the murder to find some old family artifacts, but instead found the house nearly immaculate with a small entity sitting inside. Mittsie, as the creature identified itself, is a shadow spirit \'in training\', sent by her master Alevie to find and torment the people responsible for the murders'
  },

  allies: {
    type: String,
    default: 'Mittsie, and her mother.'
  },

  ac: {
    type: Number,
    default: 0
  },

  inspiration: {
    type: Number,
    default: 0
  },

  hp: {
    current: {
      type: Number,
      default: 10
    },
    max: {
      type: Number,
      default: 10
    },
    temp: {
      type: Number,
      default: 0
    }
  },

  exp: {
    current: {
      type: Number,
      default: 0
    },
    needed: {
      type: Number,
      default: 300
    }
  },

  speed: {
    type: Number,
    default: 30
  },

  feats: {
    type: Array,
    default: []
  },

  spells: {
    type: Array,
    default: []
  },

  savingThrows: {
    charisma: { type: Boolean, default: false },
    constitution: { type: Boolean, default: false },
    dexterity: { type: Boolean, default: false },
    intelligence: { type: Boolean, default: false },
    strength: { type: Boolean, default: false },
    wisdom: { type: Boolean, default: false }
  },

  skills: {
    acrobatics: { type: Boolean, default: false },
    animalHandling: { type: Boolean, default: false },
    arcana: { type: Boolean, default: false },
    athletics: { type: Boolean, default: false },
    deception: { type: Boolean, default: false },
    history: { type: Boolean, default: false },
    insight: { type: Boolean, default: false },
    intimidation: { type: Boolean, default: false },
    investigation: { type: Boolean, default: false },
    medicine: { type: Boolean, default: false },
    nature: { type: Boolean, default: false },
    perception: { type: Boolean, default: false },
    performance: { type: Boolean, default: false },
    persuasion: { type: Boolean, default: false },
    religion: { type: Boolean, default: false },
    sleightOfHand: { type: Boolean, default: false },
    stealth: { type: Boolean, default: false },
    survival: { type: Boolean, default: false }
  },

  stats: {
    charisma: {
      type: Number,
      default: 10
    },
    constitution: {
      type: Number,
      default: 10
    },
    dexterity: {
      type: Number,
      default: 10
    },
    intelligence: {
      type: Number,
      default: 10
    },
    strength: {
      type: Number,
      default: 10
    },
    wisdom: {
      type: Number,
      default: 10
    }
  },

  pieces: {
    copper: {
      type: Number,
      default: 0
    },

    etherium: {
      type: Number,
      default: 0
    },

    gold: {
      type: Number,
      default: 0
    },

    silver: {
      type: Number,
      default: 0
    },

    platinum: {
      type: Number,
      default: 0
    }
  },

  hitdice: {
    type: String,
    default: '1d8'
  },

  deathsaves: {
    fails: {
      type: Number,
      default: 0
    },
    success: {
      type: Number,
      default: 0
    }
  },

  organization: {
    img: {
      type: String,
      default: 'https://cdn.discordapp.com/emojis/536669809715445770.png?v=1'
    },
    name: {
      type: String,
      default: 'Sleeping Knights'
    }
  },

},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  } 
})

module.exports = mongoose.model('characters', characterSchema);