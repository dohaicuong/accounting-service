import { schema } from "nexus";
import { TokenPayload, getTokenPayload } from "../utils";

schema.queryType({
  definition: t => {
    // t.crud.ledgers()
    // t.crud.ledger()
    t.field('me', {
      type: 'User',
      resolve: async (_, __, { token, db }) => {
        const tokenPayload = getTokenPayload(token)
        return db.user.findOne({ where: { id: tokenPayload.sub }})
      }
    })
  }
})