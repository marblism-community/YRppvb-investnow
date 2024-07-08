import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `
INSERT INTO "User" (
  "id",
  "email", 
  "name", 
  "pictureUrl", 

"password"
) VALUES (
  '21a857f1-ba5f-4435-bcf6-f910ec07c0dc',
  'test@test.com',
  'John Doe',
  'https://i.imgur.com/sbRCzP7.png',

'$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC'
);

INSERT INTO "Role" (
  "id",
  "userId",
  "name"
) VALUES (
  '31a857f1-ba5f-4435-bcf6-f910ec07c0dc',
  '21a857f1-ba5f-4435-bcf6-f910ec07c0dc',
  'admin'
);
  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
