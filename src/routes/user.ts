import * as bcrypt from 'bcrypt'

import { UserType } from '../types/user'
import Db from '../db'

import Joi from 'joi'

import { nanoid } from 'nanoid'

import { ServerRoute } from '@hapi/hapi'
import { Document } from 'mongoose'

import jwt from 'jsonwebtoken'

const routes: ServerRoute[] = []

interface AuthPayload {
  email:string
  password:string
}

routes.push({
  method: 'POST',
  path: '/auth/login',
  handler: async (req, h) => {
    const { email, password } = req.payload as AuthPayload

    console.log(`logging in ${email}`)

    const users = await Db.Users.find({ email: email.toLowerCase().trim() }).limit(1).toArray()

    if (users.length === 0)
      return h.response('no users with that email').code(404)

    let user = users[0] as Document & UserType

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword)
      return h.response('passwords do not match').code(403)

    const token = jwt.sign({
      id: user._id,
      email: user.email,
      beta: user.beta,
      patreon: user.patreon
    }, process.env.jwtKey);

    return h.response({
      token
    }).code(200)
  },
  options: {
    auth: false,
    validate: {
      payload: Joi.object({
        email: Joi.string().min(1).required(),
        password: Joi.string().min(7).required()
      })
    }
  }
})

routes.push({
  method: 'POST',
  path: '/auth/signup',
  handler: async (req, h) => {
    const { email, password } = req.payload as {
      email: string
      password: string
    }

    const site = email.split('@')[1]

    // don't allow signup with our emails.
    if (site === 'bardsballad.com') return h.response().code(403)

    const hash  = await bcrypt.hash(password, Number(process.env.saltingRounds))

    const userInfo = {
      _id: nanoid(23),
      email: email.toLowerCase(),
      password: hash,
      beta: false,
      patreon: false
    }

    const result = await Db.Users.insertOne(userInfo);
    const user = await Db.Users.findOne<UserType>({_id: result.insertedId});

    const token = jwt.sign({
      id: user._id,
      email: user.email,
      beta: user.beta,
      patreon: user.patreon
    }, process.env.jwtKey);

    return h.response({
      token
    }).code(200)
  },
  options: {
    auth: false,
    validate: {
      payload: Joi.object({
        email: Joi.string().min(1).required(),
        password: Joi.string().min(7).required()
      })
    }
  }
})

export default routes