"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.objectType({
    name: 'LineItem',
    definition: t => {
        t.model.id();
        t.model.account();
        t.model.transaction();
        t.model.createdAt();
    }
});
