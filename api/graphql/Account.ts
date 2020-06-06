import { schema } from "nexus"

schema.objectType({
  name: 'Account',
  definition: t => {
    t.model.id()
    t.model.name()
    t.model.description()
    // TODO enum
    t.model.accountType()
    t.model.lineItems()
  }
})