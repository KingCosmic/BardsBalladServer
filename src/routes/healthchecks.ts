import { ServerRoute } from '@hapi/hapi'

const routes: ServerRoute[] = []

interface AuthPayload {
  email:string
  password:string
}

// this route is for health checks (digital ocean apps)
routes.push({
  method: 'GET',
  path: '/',
  handler: async (req, h) => {
    return h.response('nice').code(200)
  },
  options: {
    auth: false
  }
})

export default routes