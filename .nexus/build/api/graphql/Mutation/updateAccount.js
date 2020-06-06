"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.inputObjectType({
    name: 'UpdateAccountInput',
    definition: t => {
        t.string('accountId', { nullable: false });
        t.string('name');
        t.string('description');
        t.field('accountType', { type: 'AccountType' });
    }
});
nexus_1.schema.objectType({
    name: 'UpdateAccountPayload',
    definition: t => {
        t.field('account', { type: 'Account' });
    }
});
nexus_1.schema.extendType({
    type: 'Mutation',
    definition: t => {
        t.field('updateAccount', {
            type: 'UpdateAccountPayload',
            args: {
                input: nexus_1.schema.arg({
                    type: 'UpdateAccountInput',
                    nullable: false,
                })
            },
            resolve: (_, { input }, { db }) => {
                const account = db.account.update({
                    where: {
                        id: input.accountId
                    },
                    data: {
                        name: input.name,
                        description: input.description,
                        accountType: input.accountType,
                    }
                });
                return {
                    account
                };
            }
        });
    }
});
