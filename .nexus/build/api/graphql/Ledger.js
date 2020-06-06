"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.objectType({
    name: 'Ledger',
    definition: t => {
        t.model.id();
        t.model.subledgers();
    }
});
