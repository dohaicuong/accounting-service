"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.enumType({
    name: 'AccountType',
    members: [
        'DIVIDENDS',
        'EXPENSES',
        'ASSETS',
        'LOSSES',
        'GAINS',
        'INCOME',
        'REVENUES',
        'LIABILITIES',
        'EQUITY'
    ]
});
