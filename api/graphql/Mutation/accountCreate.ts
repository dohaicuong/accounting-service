import { schema } from "nexus";

schema.inputObjectType({
  name: 'AccountCreateInput',
  definition: t => {
    t.id('subledgerId', { nullable: false })

    t.string('name', { nullable: false })
    t.string('description', { nullable: false })
    t.field('accountType', { type: 'AccountType', nullable: false })
  }
})

schema.objectType({
  name: 'AccountCreatePayload',
  definition: t => {
    t.field('account', { type: 'Account' })
  }
})

schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('accountCreate', {
      type: 'AccountCreatePayload',
      args: {
        input: schema.arg({
          type: 'AccountCreateInput',
          nullable: false
        })
      },
      resolve: async (_, { input }, { db }) => {
        // ledger, subledger, account
        const account = await db.account.create({
          data: {
            name: input.name,
            description: input.description,
            accountType: input.accountType,
            Subledger: {
              connect: {
                id: input.subledgerId
              }
            }
          }
        })

        return {
          account
        }
      }
    })
  }
})