import { schema } from "nexus";

schema.inputObjectType({
  name: 'DeleteAccountInput',
  definition: t => {
    t.id('accountId')
  }
})

schema.objectType({
  name: 'DeleteAccountPayload',
  definition: t => {
    t.field('account', { type: 'Account' })
  }
})

schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('deleteAccount', {
      type: 'DeleteAccountPayload',
      args: {
        input: schema.arg({
          type: 'DeleteAccountInput',
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