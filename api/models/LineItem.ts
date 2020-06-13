import { schema } from "nexus";

schema.objectType({
  name: 'LineItem',
  definition: t => {
    t.model.id()
    t.model.amount()
    t.model.description()
    t.model.account()
    t.model.transaction()
  }
})