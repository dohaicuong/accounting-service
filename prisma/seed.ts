import { PrismaClient } from '@prisma/client'
var faker = require('faker');

const db = new PrismaClient()

main()

async function testObjects() {
  const randomPrice = faker.commerce.price();

  console.log(randomPrice);
}

async function main() {
  const ledgers = [
    {
      name: "General Ledger",
      description: "Top Level Accounting ledger",
      subledgers: {
        create: [
          {
            name: "Assets",
            description: "Assets Account Subset",
            accounts: {
              create: [
                {
                  name: "Equipment",
                  description: "Office equipment for consumption",
                  accountType: "Asset",
                },
                {
                  name: "Cash",
                  description: "General Cash Account",
                  accountType: "Asset",
                },
                {
                  name: "Merchandise",
                  description: "Merchandise for sale",
                  accountType: "Asset",
                },
              ]
            }
          }, 
          {
            name: "Equities",
            description: "Equity Account Subset",
            accounts: {
              create: [
                {
                  name: "Equity",
                  description: "Shareholder's Stock",
                  accountType: "Equity"
                }
              ]
            }
          }
        ]
      }
    }
  ]

  let promises = []

  for (const ledger of ledgers) {
    promises.push(db.ledger.create({ data: ledger }))
  }

  Promise.all(promises);

  const equipmentId: string = await new Promise(async () => {
    return (await db.account.findMany({
      where: {
        name: "Equipment"
      },
      select: {
        id: true
      }
    })).pop().id;
  });
  
  const cashId: string = await new Promise(async () => {
    return (await db.account.findMany({
      where: {
        name: "Cash"
      },
      select: {
        id: true
      }
    })).pop().id;
  });

  const merchandiseId: string = await new Promise(async () => {
    return (await db.account.findMany({
      where: {
        name: "Merchandise"
      },
      select: {
        id: true
      }
    })).pop().id;
  });

  const equitiesId: string = await new Promise(async () => {
    return (await db.account.findMany({
      where: {
        name: "Equities"
      },
      select: {
        id: true
      }
    })).pop().id;
  });

  const transactions = [
    {
      lineItems: {
        create: [
          // Cash
          {
            amount: 10000,
            description: "Initial shareholder investment",
            account: {
              connect: {
                id: cashId,
              }
            }
          },
          // Equity
          {
            amount: 10000,
            description: "Initial shareholder investment",
            account: {
              connect: {
                id: equitiesId
              }
            }
          }
        ]
      }
    },
    {
      LineItems: {
        create: [
          // Equipment 
          {
            amount: 599.99,
            description: "Laptop, Lenovo Thinkpad Serial ID #555555",
            account: {
              connect: {
                id: equipmentId
              }
            }
          },
          // Cash
          {
            amount: -599.99, 
            description: "Laptop, Lenovo Thinkpad Serial ID #555555",
            account: {
              connect: {
                id: cashId
              }
            }
          },
        ]
      }
    }, 
    {
      LineItems: {
        create: [
          // Equipment 
          {
            amount: 1999.99,
            description: "Laptop, Razer Brikk Serial ID #190812873",
            account: {
              connect: {
                id: equipmentId
              }
            }
          },
          // Cash
          {
            amount: -1999.99,
            description: "Laptop, Razer Brikk Serial ID #190812873",
            account: {
              connect: {
                id: cashId
              }
            }
          },
        ]
      }
    }, 
    {
      LineItems: {
        create: [
          // Equipment 
          {
            amount: 15,
            description: "Pens",
            account: {
              connect: {
                id: equipmentId
              }
            }
          },
          // Cash
          {
            amount: -15, 
            description: "Pens",
            account: {
              connect: {
                id: cashId
              }
            }
          },
        ]
      } 
    },
    {
      LineItems: {
        create: [
          // Equipment 
          {
            amount: 25.50,
            description: "Knife for the company kitchen",
            account: {
              connect: {
                id: equipmentId
              }
            }
          },
          // Cash
          {
            amount: -25.50,
            description: "Knife for the company kitchen",
            account: {
              connect: {
                id: cashId
              }
            }
          },
        ]
      } 
    },
    {
      LineItems: {
        create: [
          // Merchandise
          {
            amount: 1500,
            description: "100 T-Shirts, black",
            account: {
              connect: {
                id: merchandiseId
              }
            }
          },
          {
            amount: 499.90,
            description: "10 Zircon Rings",
            account: {
              connect: {
                id: merchandiseId
              }
            }
          },
          {
            amount: 5000, 
            description: "500 Small Budai Statues",
            account: {
              connect: {
                id: merchandiseId
              }
            }
          },
          // Cash
          {
            amount: 6999.90,
            description: "Initial merchandise purchase",
            account: {
              connect: {
                id: cashId
              }
            }
          },
        ]
      } 
    }
  ]

  promises = [];

  for (const transaction of transactions) {
    promises.push(db.transaction.create({ data: transaction }));
  }

  Promise.all(promises);

  console.log('Seed Complete');

  db.disconnect()
}