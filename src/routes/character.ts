import { CharacterType, CharacterSchema } from '../types/character'
import { UserType } from '../types/user'
import Db from '../db'

import { nanoid } from 'nanoid'

import { ServerRoute } from '@hapi/hapi'

import Joi from 'joi'

const routes: ServerRoute[] = []

/**
 * return all characters for a single user.
 */
routes.push({
  method: 'GET',
  path: '/characters',
  handler: async (req, h) => {
    try {
      // grab all our characters that this user has.
      const characters = await Db.Characters.find({
        ownerID: (req.auth.credentials as unknown as UserType)._id
      }).toArray()

      // respond with the characters
      return h.response(characters).code(200)
    } catch(e) {
      // return a server error.
      return h.response(e).code(500)
    }
  },
  options: {
    auth: 'jwt'
  }
})

/**
 * Here we get information for a specific character.
 * 
 * Do we still nead this route? maybe if we provide links
 * to let others see your character.
 */
routes.push({
  method: 'GET',
  path: '/characters/{characterID}',
  handler: async (req, h) => {
    try {
      const userID = (req.auth.credentials as unknown as UserType)._id

      const characters:Array<CharacterType> = await Db.Characters.find({
        _id: req.params.characterID
      })
      .limit(1).toArray()

      if (characters.length === 0)
        return h.response({ message: 'failed to find that character' }).code(404)

      const character = characters[0]

      if (character.ownerID !== userID)
        return h.response({ message: 'you do not have authorization to edit this character' }).code(403)

      return h.response(character).code(200)
    } catch(e) {
      return h.response(e).code(500)
    }
  },
  options: {
    auth: 'jwt'
  }
})

/**
 * Here we sync our characters. Create new ones when needed,
 * update existing ones and delete ones that may exist.
 *
 * need to see if it's more performant to make small changes or just overrite the whole object
 * on modifications though.
 */

interface SyncPayload {
  created: CharacterType[]
  updated: CharacterType[]
  deleted: string[]
}

routes.push({
  method: 'POST',
  path: '/characters/sync',
  handler: async (req, h) => {
    try {
      const credentials = (req.auth.credentials as unknown as UserType)
      const { created, updated, deleted } = req.payload as SyncPayload

      // bulk write is great here.
      await Db.Characters.bulkWrite([
        // convert created characters into insertOne's
        ...created.map(char => {

          // we need to replace the client side generated id...
          // ...with one made by the server.
          char._id = nanoid(23)

          return {
            insertOne: {
              document: char
            }
          }
        }),

        // convert updated characters into replaceOne's
        ...updated.map(char => {
          return {
            replaceOne: {
              filter: { _id: char._id },
              replacement: char
            }
          }
        }),

        // and convert deleted into deleteOne's
        ...deleted.map(id => {
          return {
            deleteOne: {
              filter: { _id: id }
            }
          }
        })
      ]);

      // grab all our characters that this user has.
      const characters = await Db.Characters.find({
        ownerID: credentials._id
      }).toArray()

      // respond with the characters
      return h.response(characters).code(200)

    } catch(e) {
      return h.response(e).code(500)
    }
  },
  options: {
    auth: 'jwt',
    validate: {
      payload: Joi.object({
        created: Joi.array().items(CharacterSchema).required(),
        updated: Joi.array().items(CharacterSchema).required(),
        deleted: Joi.array().items(Joi.string()).required()
      })
    }
  }
})

export default routes
