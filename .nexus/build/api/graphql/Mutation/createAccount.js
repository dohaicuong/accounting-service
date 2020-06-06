"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
nexus_1.schema.inputObjectType({
    name: 'CreateAccountInput',
    definition: t => {
        t.string('subledgerId', { nullable: false });
        t.string('name', { nullable: false });
        t.string('description', { nullable: false });
        t.field('accountType', { type: 'AccountType', nullable: false });
    }
});
nexus_1.schema.objectType({
    name: 'CreateAccountPayload',
    definition: t => {
        t.field('account', { type: 'Account' });
    }
});
nexus_1.schema.extendType({
    type: 'Mutation',
    definition: t => {
        t.field('createAccount', {
            type: 'CreateAccountPayload',
            args: {
                input: nexus_1.schema.arg({
                    type: 'CreateAccountInput',
                    nullable: false
                })
            },
            resolve: (_, { input }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
                const account = yield db.account.create({
                    data: {
                        name: input.name,
                        description: input.description,
                        accountType: input.accountType,
                        Subledger: {
                            connect: {
                                id: input.subledgerId
                            }
                        }
                    }
                });
                return {
                    account
                };
            })
        });
    }
});
