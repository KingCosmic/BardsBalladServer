
import healthChecks from './healthchecks'
import characterRoutes from './character'
import userRoutes from './user'

export default [
  ...healthChecks,
  ...characterRoutes,
  ...userRoutes,
]