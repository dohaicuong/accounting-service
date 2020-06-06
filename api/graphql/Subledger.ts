import { schema } from "nexus"

schema.objectType({
  name: 'Subledger',
  definition: t => {
    t.model.id()
    t.model.accounts()
  }
})