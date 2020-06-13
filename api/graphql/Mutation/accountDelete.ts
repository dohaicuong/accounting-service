import { schema } from "nexus";

schema.inputObjectType({
  name: 'AccountDeleteInput',
  definition: t => {
    t.id('accountId')
  }
})

schema.objectType({
  name: 'AccountDeletePayload',
  definition: t => {
    t.field('account', { type: 'Account' })
  }
})

schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('accountDelete', {
      type: 'AccountDeletePayload',
      args: {
        input: schema.arg({
          type: 'AccountDeleteInput',
          nullable: false
        })
      },
      resolve: (_, { input }, { db }) => {
        const account = db.account.delete({
          where: {
            id: input.accountId
          }
        })

        return {
          account
        }
      }
    })
  }
})