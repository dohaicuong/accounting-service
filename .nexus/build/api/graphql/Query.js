"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.queryType({
    definition: t => {
        t.crud.ledgers();
        t.crud.ledger();
    }
});
