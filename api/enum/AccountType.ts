import { schema } from "nexus";

schema.enumType({
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
})