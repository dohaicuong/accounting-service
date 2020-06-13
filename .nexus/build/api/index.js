"use strict";
// GENERATED NEXUS START MODULE
Object.defineProperty(exports, "__esModule", { value: true });
// Run framework initialization side-effects
// Also, import the app for later use
const nexus_1 = require("nexus");
// Last resort error handling
process.once('uncaughtException', error => {
    nexus_1.default.log.fatal('uncaughtException', { error: error });
    process.exit(1);
});
process.once('unhandledRejection', error => {
    nexus_1.default.log.fatal('unhandledRejection', { error: error });
    process.exit(1);
});
// Import the user's schema modules
require("./enum/AccountType");
require("./graphql/Query");
require("./models/Account");
require("./models/Ledger");
require("./models/LineItem");
require("./models/Subledger");
require("./models/Transaction");
require("./graphql/Mutation/createAccount");
require("./graphql/Mutation/updateAccount");
// Import the user's app module
require("./app");
nexus_1.default.assemble();
nexus_1.default.start();
