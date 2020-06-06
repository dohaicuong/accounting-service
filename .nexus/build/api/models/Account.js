"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.objectType({
    name: 'Account',
    definition: t => {
        t.model.id();
        t.model.name();
        t.model.description();
        t.field('accountType', {
            type: 'AccountType',
            nullable: false,
            resolve: root => {
                const type = root.accountType;
                return type;
            }
        });
        t.model.lineItems();
    }
});
