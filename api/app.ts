import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import { JWT_SECRET } from './configs'

use(prisma())

use(auth({
  appSecret: JWT_SECRET
}))
