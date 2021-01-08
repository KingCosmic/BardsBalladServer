import { CharacterType } from '../types/character'
import Db from '../db'

import { ServerRoute } from '@hapi/hapi'

const routes: ServerRoute[] = []

/**
 * return all characters for a single user.
 */
routes.push({
  method: 'GET',
  path: '/characters',
  handler: async (req, h) => {
    try {
      const characters = await Db.Characters.find({
        ownerID: (req.auth.credentials as any)._id
      }).toArray()

      return h.response(characters).code(200)
    } catch(e) {
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
      const userID = (req.auth.credentials as any)._id

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
  created:[]
  updated:[]
  deleted:[]
}

routes.push({
  method: 'POST',
  path: '/characters/sync',
  handler: async (req, h) => {
    try {
      const credentials = (req.auth.credentials as any)
      const { created, updated, deleted } = req.payload as SyncPayload

      // create

      // update

      // delete ?

    } catch(e) {
      return h.response(e).code(500)
    }
  }
})

export default routes
