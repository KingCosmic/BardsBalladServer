import { UserType } from '../types/user'
import Db from '../db'

// TODO: add in more checks (maybe a token, or something similar)
// rn all we check is if there's a user with that id, people could forge jwt's

// checks to see if the person is valid
export default async (decoded, request, h) => {

  try {
    const users = await Db.Users.find({
      _id: decoded.id,
    })
    .limit(1).toArray()

    if (users.length === 0) return { isValid: false }

    return { isValid: true, credentials: users[0] }
  } catch(e) {
    return { isValid: false }
  }
}