import { schema } from "nexus";
import { stringArg, arg } from "nexus/components/schema";
import { hashPassword, signToken, comparePassword } from "../../utils";

schema.objectType({
  name: 'AuthPayload',
  definition: t => {
    t.string('token', { nullable: false })
    t.field('user', { type: 'User' })
  }
})

schema.inputObjectType({
  name: 'SignupInput',
  definition: t => {
    t.string('name', { nullable: false })
    t.string('email', { nullable: false })
    t.string('password', { nullable: false })
  }
})
schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        input: arg({ type: 'SignupInput', nullable: false })
      },
      resolve: async (_, { input }, { db }) => {
        const checkUser = await db.user.findOne({ where: { email: input.email }})
        if(checkUser) throw new Error('User is existed')

        const hash = await hashPassword(input.password)
        const user = await db.user.create({ data: {
          ...input,
          password: hash
        }})

        const token = await signToken({ sub: user.id })

        return {
          token,
          user
        }
      }
    })
  }
})

schema.inputObjectType({
  name: 'LoginInput',
  definition: t => {
    t.string('email', { nullable: false })
    t.string('password', { nullable: false })
  }
})
schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('login', {
      type: 'AuthPayload',
      args: {
        input: arg({ type: 'LoginInput', nullable: false })
      },
      resolve: async (_, { input }, { db }) => {
        const user = await db.user.findOne({ where: { email: input.email }})
        if(!user) throw new Error('credentials wrong')

        const isMatch = await comparePassword(input.password, user.password)
        if(!isMatch) throw new Error('credentials wrong')

        const token = await signToken({ sub: user.id })

        return {
          token,
          user
        }
      }
    })
  }
})