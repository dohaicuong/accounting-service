import { schema } from "nexus"

schema.objectType({
  name: 'Subledger',
  definition: t => {
    t.model.id()
    t.model.name()
    t.model.description()
    t.model.accounts()
  }
})