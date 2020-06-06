import { schema } from "nexus";

schema.objectType({
  name: 'LineItem',
  definition: t => {
    t.model.id()
    t.model.account()
    t.model.transaction()
    t.model.createdAt()
  }
})