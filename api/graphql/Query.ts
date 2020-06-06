import { schema } from "nexus";

schema.queryType({
  definition: t => {
    t.crud.ledgers()
    t.crud.ledger()
  }
})