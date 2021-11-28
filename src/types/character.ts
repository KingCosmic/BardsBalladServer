import Joi from 'joi'

export interface CharacterType {
  version:string,
  _id:string,
  ownerID:string,
  bonds:string,
  flaws:string,
  ideals:string,
  traits:string,
  castingClass:string,
  castingAbility:string,
  castingDC:number,
  castingBonus:number,
  spellSlots:[],
  name:string,
  race:string,
  languages:string,
  alignment:string,
  background:string,
  job:string,
  passivePerception:number,
  initiative:number,
  backstory:string,
  ac:number,
  inspiration:number,
  hp: {
    current:number,
    max:number,
    temp:number
  },
  exp:number,
  speed:number,
  items:[],
  feats:[],
  spells:[],
  armorProfs:string,
  weaponProfs:string,
  toolProfs:string,
  savingThrows: {
    charisma:boolean,
    constitution:boolean,
    dexterity:boolean,
    intelligence:boolean,
    strength:boolean,
    wisdom:boolean,
  },

  skills: {
    acrobatics:number,
    animalHandling:number,
    arcana:number,
    athletics:number,
    deception:number,
    history:number,
    insight:number,
    intimidation:number,
    investigation:number,
    medicine:number,
    nature:number,
    perception:number,
    performance:number,
    persuasion:number,
    religion:number,
    sleightOfHand:number,
    stealth:number,
    survival:number,
  },
  stats: {
    charisma:number,
    constitution:number,
    dexterity:number,
    intelligence:number,
    strength:number,
    wisdom:number
  },
  hitdice:string,
  deathsaves: {
    fails:number,
    success:number
  },
  createdAt:string
  updatedAt:string
}

// TODO: add schema types for spells, items, etc.
export const CharacterSchema = Joi.object({
  version: Joi.string().required(),
  system: Joi.string().required(),
  _id: Joi.string().required(),
  ownerID: Joi.string().required(),
  avatar: Joi.string().allow('').required(),
  castingClass: Joi.string().required(),
  castingAbility: Joi.string().required(),
  castingDC: Joi.number().required(),
  castingBonus: Joi.number().required(),

  pieces: Joi.any(),
  __v: Joi.number(),
  revision: Joi.string().allow(''),

  spellSlots: Joi.array().items(Joi.object({
    level: Joi.number().required(),
    current: Joi.number().required(),
    max: Joi.number().required()
  })).required(),

  actions: Joi.array().required(),
  conditions: Joi.array().required(),
  creatures: Joi.array().required(),

  name: Joi.string().allow('').required(),
  race: Joi.string().allow('').required(),
  age: Joi.number().required(),
  languages: Joi.string().allow('').required(),
  alignment: Joi.string().allow('').required(),
  background: Joi.string().allow('').required(),
  job: Joi.string().allow('').required(),
  passivePerception: Joi.number().required(),
  initiative: Joi.number().required(),
  backstory: Joi.string().allow('').required(),
  ac: Joi.number().required(),
  inspiration: Joi.number().required(),

  hp: Joi.object({
    current: Joi.number().required(),
    max: Joi.number().required(),
    temp: Joi.number().required()
  }).required(),

  exp: Joi.number().required(),
  speed: Joi.number().required(),
  items: Joi.array().required(),
  feats: Joi.array().required(),
  spells: Joi.array().required(),

  // TODO:
  armorProfs: Joi.array().required(),
  weaponProfs: Joi.array().required(),
  toolProfs: Joi.array().required(),

  savingThrows: Joi.object({
    charisma: Joi.boolean().required(),
    constitution: Joi.boolean().required(),
    dexterity: Joi.boolean().required(),
    intelligence: Joi.boolean().required(),
    strength: Joi.boolean().required(),
    wisdom: Joi.boolean().required(),
  }).required(),

  skills: Joi.object({
    acrobatics: Joi.number().required(),
    animalHandling: Joi.number().required(),
    arcana: Joi.number().required(),
    athletics: Joi.number().required(),
    deception: Joi.number().required(),
    history: Joi.number().required(),
    insight: Joi.number().required(),
    intimidation: Joi.number().required(),
    investigation: Joi.number().required(),
    medicine: Joi.number().required(),
    nature: Joi.number().required(),
    perception: Joi.number().required(),
    performance: Joi.number().required(),
    persuasion: Joi.number().required(),
    religion: Joi.number().required(),
    sleightOfHand: Joi.number().required(),
    stealth: Joi.number().required(),
    survival: Joi.number().required(),
  }).required(),

  stats: Joi.object({
    charisma: Joi.number().required(),
    constitution: Joi.number().required(),
    dexterity: Joi.number().required(),
    intelligence: Joi.number().required(),
    strength: Joi.number().required(),
    wisdom: Joi.number().required()
  }).required(),

  hitdice: Joi.string().required(),

  deathsaves: Joi.object({
    fails: Joi.number().required(),
    success: Joi.number().required()
  }),

  createdAt: Joi.string().required(),
  updatedAt: Joi.string().required()
})
