import { schema } from "nexus";

schema.objectType({
  name: 'Transaction',
  definition: t => {
    t.model.id()
    t.model.lineItems()
    t.model.createdAt()
  }
})