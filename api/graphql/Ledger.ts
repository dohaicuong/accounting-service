import { schema } from "nexus";

schema.objectType({
  name: 'Ledger',
  definition: t => {
    t.model.id()
    t.model.subledgers()
  }
})