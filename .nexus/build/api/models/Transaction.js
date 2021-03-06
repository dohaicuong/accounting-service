"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.objectType({
    name: 'Transaction',
    definition: t => {
        t.model.id();
        t.model.lineItems();
        t.model.createdAt();
    }
});
