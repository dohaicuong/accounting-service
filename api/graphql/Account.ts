import { schema } from "nexus"

schema.objectType({
  name: 'Account',
  definition: t => {
    t.model.id()
    t.model.lineItems()
  }
})