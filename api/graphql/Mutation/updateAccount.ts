import { schema } from "nexus";

schema.inputObjectType({
  name: 'UpdateAccountInput',
  definition: t => {
    t.id('accountId', { nullable: false })
    t.string('name')
    t.string('description')
    t.field('accountType', { type: 'AccountType' })
  }
})

schema.objectType({
  name: 'UpdateAccountPayload',
  definition: t => {
    t.field('account', { type: 'Account' })
  }
})

schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('updateAccount', {
      type: 'UpdateAccountPayload',
      args: {
        input: schema.arg({
          type: 'UpdateAccountInput',
          nullable: false,
        })
      },
      resolve: (_, { input }, { db }) => {
        const account = db.account.update({
          where: {
            id: input.accountId
          },
          data: {
            name: input.name,
            description: input.description,
            accountType: input.accountType,
          }
        })

        return {
          account
        }
      }
    })
  }
})