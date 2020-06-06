import { schema } from "nexus";

schema.inputObjectType({
  name: 'CreateAccountInput',
  definition: t => {
    t.string('subledgerId', { nullable: false })

    t.string('name', { nullable: false })
    t.string('description', { nullable: false })
    t.field('accountType', { type: 'AccountType', nullable: false })
  }
})

schema.objectType({
  name: 'CreateAccountPayload',
  definition: t => {
    t.field('account', { type: 'Account' })
  }
})

schema.extendType({
  type: 'Mutation',
  definition: t => {
    t.field('createAccount', {
      type: 'CreateAccountPayload',
      args: {
        input: schema.arg({
          type: 'CreateAccountInput',
          nullable: false
        })
      },
      resolve: async (_, { input }, { db }) => {
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