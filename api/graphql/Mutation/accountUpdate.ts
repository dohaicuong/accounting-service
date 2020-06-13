import { schema } from "nexus";

schema.inputObjectType({
  name: 'AccountUpdateInput',
  definition: t => {
    t.id('accountId', { nullable: false })
    t.string('name')
    t.string('description')
    t.field('accountType', { type: 'AccountType' })
  }
})

schema.objectType({
  name: 'AccountUpdatePayload',
  definition: t => {
    t.field('account', { type: 'Account' })
  }
})

schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('accountUpdate', {
      type: 'AccountUpdatePayload',
      args: {
        input: schema.arg({
          type: 'AccountUpdateInput',
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