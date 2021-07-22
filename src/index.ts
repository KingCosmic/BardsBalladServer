// setup our process.env variables for use
require('dotenv').config()

import { server as Server } from '@hapi/hapi'
import Database from './db'

import HapiJWT from 'hapi-auth-jwt2'
import HapiGate from 'hapi-gate'
import HapiJWTValidator from './validators/jwt'

import routes from './routes'
import { Boom } from '@hapi/boom'

const init = async () => {
  console.log('starting')

  await Database.connect()
  console.log('connected to database')

  const server = Server({
    port: process.env.PORT || 4000,
    host: process.env.dev ? 'localhost' : '0.0.0.0',
    routes: {
      cors: true,
      validate: {
        failAction: async (request, h, err) => {
          if (!process.env.dev) {
            // In prod, log a limited error message and throw the default Bad Request error.
            console.error('ValidationError:', err.message);
            throw new Boom(`Invalid request payload input`);
          } else {
            // During development, log and respond with the full error.
            console.error(err);
            throw err;
          }
        }
      }
    }
  })

  // sets up JWT authentication
  await server.register(HapiJWT)

  // forces our connections to https and non www
  await server.register({
    plugin: HapiGate,
    options: {
      https: false,
      nonwww: true
    }
  })

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.jwtKey,
    validate: HapiJWTValidator
  })

  server.auth.default('jwt')

  server.route(routes)

  await server.start()
  console.log('Server running on %s', server.info.uri)
};

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()