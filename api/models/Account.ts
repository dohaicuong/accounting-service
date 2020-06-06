import { schema } from "nexus"

schema.objectType({
  name: 'Account',
  definition: t => {
    t.model.id()
    t.model.name()
    t.model.description()
    t.field('accountType', {
      type: 'AccountType',
      nullable: false,
      resolve: root => {
        const type = root.accountType as any
        return type
      }
    })
    t.model.lineItems()
  }
})