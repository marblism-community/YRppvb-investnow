import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('a99b9475-dc19-482c-8483-b667bdd729fc', '1Vincenzo27@yahoo.com', 'David Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'cus_D4v1dB', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('b9047fb2-74a3-4bbb-85bb-9da5552a3b8e', '7Hank.Kuvalis55@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=9', 'cus_M1ch43lJ', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('382e1b45-cc1c-4079-859c-b6fbe0ecf9a7', '19Guy53@gmail.com', 'Emily Clark', 'https://i.imgur.com/YfJQV5z.png?id=21', 'cus_3m1lyC', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('0350592b-956e-43c3-be73-5a7d62c7f129', '25Dax_Gleichner@gmail.com', 'Michael Jordan', 'https://i.imgur.com/YfJQV5z.png?id=27', 'cus_3m1lyC', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('99ed32e5-3bcd-4bd3-9513-ef844e5dd620', '31Brian19@hotmail.com', 'Emily Clark', 'https://i.imgur.com/YfJQV5z.png?id=33', 'cus_M1ch43lJ', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('2e50bfca-b223-4b45-b84f-7d966c3e0caa', '37Adriana86@hotmail.com', 'David Brown', 'https://i.imgur.com/YfJQV5z.png?id=39', 'cus_3m1lyC', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('da4548d2-360f-4023-aadc-68e77d30308f', '43Amina.OHara64@hotmail.com', 'Emily Clark', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_3m1lyC', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('ac750e6a-8e49-43d4-9434-745e93915a1e', '49Anastacio_Senger13@yahoo.com', 'Michael Jordan', 'https://i.imgur.com/YfJQV5z.png?id=51', 'cus_M1ch43lJ', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "password") VALUES ('efdddaad-89df-41b9-a911-9a11dbaeb262', '55Lonny80@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=57', 'cus_J0hnd03', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('f90a21bd-daa5-42c1-9128-fc71d04ff90d', 'HealthTech Ventures', 'Innovative healthcare solutions to improve patient outcomes.', 'User base increased by 200 in the last quarter.', '0350592b-956e-43c3-be73-5a7d62c7f129');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('67bc3b81-1943-4f8d-b141-72dd918f3227', 'Green Energy Solutions', 'A cuttingedge technology company revolutionizing the industry.', 'Expanded market reach to 5 new countries.', 'efdddaad-89df-41b9-a911-9a11dbaeb262');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('db28a9e4-c189-48d9-8976-51827d9da98f', 'Tech Innovators', 'Transforming education with advanced learning platforms.', 'User base increased by 200 in the last quarter.', '99ed32e5-3bcd-4bd3-9513-ef844e5dd620');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('d599bb07-63c2-4800-832a-b72c5764805b', 'HealthTech Ventures', 'Innovative healthcare solutions to improve patient outcomes.', 'Revenue growth of 150 yearoveryear.', '99ed32e5-3bcd-4bd3-9513-ef844e5dd620');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('2f642b0e-4f2a-46c6-b257-8a6e414188d3', 'Green Energy Solutions', 'Providing sustainable energy solutions for a greener future.', 'User base increased by 200 in the last quarter.', 'a99b9475-dc19-482c-8483-b667bdd729fc');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('8cd90d1f-dd8e-4372-a20a-b8d4d429d5c4', 'HealthTech Ventures', 'Leading the way in financial technology and digital banking.', 'Achieved a 30 reduction in operational costs.', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('93aeb16a-fca1-491d-b0bb-a9f9e6c9c5ea', 'HealthTech Ventures', 'Innovative healthcare solutions to improve patient outcomes.', 'Revenue growth of 150 yearoveryear.', '382e1b45-cc1c-4079-859c-b6fbe0ecf9a7');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('52afebd4-df37-4989-8a57-82854e51cd89', 'HealthTech Ventures', 'Providing sustainable energy solutions for a greener future.', 'User base increased by 200 in the last quarter.', 'efdddaad-89df-41b9-a911-9a11dbaeb262');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('06d044b4-7693-431b-bfd3-665794c97ed3', 'Tech Innovators', 'Transforming education with advanced learning platforms.', 'Achieved a 30 reduction in operational costs.', '382e1b45-cc1c-4079-859c-b6fbe0ecf9a7');
INSERT INTO "Startup" ("id", "name", "description", "performanceMetrics", "userId") VALUES ('5f59f65c-c0ba-482e-beab-95327a712627', 'Tech Innovators', 'Leading the way in financial technology and digital banking.', 'Expanded market reach to 5 new countries.', 'efdddaad-89df-41b9-a911-9a11dbaeb262');

INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('07133fe4-6d3c-46c7-be6a-6e27dbf54838', 'Jane Smith', 'jane.smithexample.com', 'ac750e6a-8e49-43d4-9434-745e93915a1e');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('f9ea2689-94d2-4489-aed7-2795b88a0b2b', 'John Doe', 'jane.smithexample.com', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('c7249a63-f809-44be-b8b7-625b764eb6e8', 'John Doe', 'robert.johnsonexample.com', 'ac750e6a-8e49-43d4-9434-745e93915a1e');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('5428a1cd-4806-4d8c-b03f-39b26214f489', 'Jane Smith', 'john.doeexample.com', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('27eaf730-e980-46d6-91e7-d168b84cd797', 'Jane Smith', 'robert.johnsonexample.com', '382e1b45-cc1c-4079-859c-b6fbe0ecf9a7');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('c9517667-5454-422c-a4b3-025454caa3f8', 'Jane Smith', 'michael.brownexample.com', 'ac750e6a-8e49-43d4-9434-745e93915a1e');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('60743001-7c2d-4465-ac13-80dfb944c7cc', 'Michael Brown', 'emily.davisexample.com', 'a99b9475-dc19-482c-8483-b667bdd729fc');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('310b0d61-0f97-473a-925a-7c92dddef5db', 'Jane Smith', 'emily.davisexample.com', '2e50bfca-b223-4b45-b84f-7d966c3e0caa');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('40d96636-0d2c-44f2-a697-74f0a09d1300', 'Robert Johnson', 'john.doeexample.com', 'ac750e6a-8e49-43d4-9434-745e93915a1e');
INSERT INTO "Investor" ("id", "name", "contactInfo", "userId") VALUES ('69ac7137-5f61-4733-8f96-42d6d7dab86b', 'Emily Davis', 'robert.johnsonexample.com', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('d34900b3-3adb-4afd-bfea-50804e46e098', 37, '2023-07-15T21:49:15.604Z', 'd599bb07-63c2-4800-832a-b72c5764805b', '40d96636-0d2c-44f2-a697-74f0a09d1300');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('e5e1daaf-aee9-4160-9099-bdd67c57d3fa', 850, '2024-06-02T19:11:29.968Z', 'f90a21bd-daa5-42c1-9128-fc71d04ff90d', '07133fe4-6d3c-46c7-be6a-6e27dbf54838');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('eced3a71-6d06-4670-a4f1-d5b0093f5fff', 11, '2024-10-21T03:37:40.826Z', '67bc3b81-1943-4f8d-b141-72dd918f3227', 'c9517667-5454-422c-a4b3-025454caa3f8');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('62a97d42-6f13-4733-ab68-72de42ed1593', 407, '2024-01-23T18:56:48.605Z', '06d044b4-7693-431b-bfd3-665794c97ed3', '07133fe4-6d3c-46c7-be6a-6e27dbf54838');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('81c37e0a-89d8-469f-95d7-510d47e71718', 866, '2023-12-25T10:51:22.093Z', '8cd90d1f-dd8e-4372-a20a-b8d4d429d5c4', 'c9517667-5454-422c-a4b3-025454caa3f8');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('e3ce7b79-13dc-455f-88ad-31ab095a83e1', 57, '2024-10-10T06:26:30.770Z', '67bc3b81-1943-4f8d-b141-72dd918f3227', '69ac7137-5f61-4733-8f96-42d6d7dab86b');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('b895f658-401e-4653-824d-097b8e3311fa', 359, '2024-04-17T07:16:04.758Z', 'd599bb07-63c2-4800-832a-b72c5764805b', 'f9ea2689-94d2-4489-aed7-2795b88a0b2b');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('68bbfceb-5bde-43ff-9387-e5ccc1e51223', 570, '2024-05-20T04:44:22.867Z', 'f90a21bd-daa5-42c1-9128-fc71d04ff90d', 'c7249a63-f809-44be-b8b7-625b764eb6e8');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('c1511980-1add-47af-820a-8c0034478b1f', 927, '2024-08-26T01:18:33.471Z', '8cd90d1f-dd8e-4372-a20a-b8d4d429d5c4', 'f9ea2689-94d2-4489-aed7-2795b88a0b2b');
INSERT INTO "Investment" ("id", "amount", "date", "startupId", "investorId") VALUES ('39320a70-26c3-44a8-a110-73d1c88b374f', 25, '2023-08-03T19:57:38.204Z', '2f642b0e-4f2a-46c6-b257-8a6e414188d3', '5428a1cd-4806-4d8c-b03f-39b26214f489');

INSERT INTO "Organization" ("id", "name") VALUES ('8ef22e79-389b-4527-a570-6bdf39c7ec77', 'FinTech Pioneers');
INSERT INTO "Organization" ("id", "name") VALUES ('0ce3b9a0-078c-437a-b80d-3e73462b8f96', 'FinTech Pioneers');
INSERT INTO "Organization" ("id", "name") VALUES ('37a6a55b-07b5-49ee-b248-ba2b54cbf738', 'HealthTech Ventures');
INSERT INTO "Organization" ("id", "name") VALUES ('c46035ee-76a8-41fc-a81f-94f088e048b9', 'FinTech Pioneers');
INSERT INTO "Organization" ("id", "name") VALUES ('173a01eb-5068-48c5-b9f0-c6991f97a1ae', 'HealthTech Ventures');
INSERT INTO "Organization" ("id", "name") VALUES ('d3b0ebf2-d410-406d-a5a5-d802c1975c7d', 'Green Energy Solutions');
INSERT INTO "Organization" ("id", "name") VALUES ('35c22c2f-0e73-4536-874f-8f3b54ee08c8', 'Green Energy Solutions');
INSERT INTO "Organization" ("id", "name") VALUES ('baf69a97-3bb9-4b88-8efb-11148e7dbcf8', 'Green Energy Solutions');
INSERT INTO "Organization" ("id", "name") VALUES ('be85872f-b4c6-41a0-b89b-be344655523b', 'FinTech Pioneers');
INSERT INTO "Organization" ("id", "name") VALUES ('812145bb-cad1-42ad-aef2-4fb577c2fe22', 'AI Disruptors LLC');

INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('c8cf2e3e-fa2f-42e3-8195-484519d28411', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=181', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=182', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=183', 'db28a9e4-c189-48d9-8976-51827d9da98f', '60743001-7c2d-4465-ac13-80dfb944c7cc');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('646ddee6-5479-4ed5-afa2-f032fd09ebf5', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=185', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=186', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=187', '5f59f65c-c0ba-482e-beab-95327a712627', '69ac7137-5f61-4733-8f96-42d6d7dab86b');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('36e95561-fc26-43bb-9cc5-19c5a93ef4a7', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=189', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=190', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=191', '93aeb16a-fca1-491d-b0bb-a9f9e6c9c5ea', '27eaf730-e980-46d6-91e7-d168b84cd797');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('9f59d5b9-6a79-4e51-9c80-d2a96eb5aabd', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=193', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=194', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=195', '67bc3b81-1943-4f8d-b141-72dd918f3227', '07133fe4-6d3c-46c7-be6a-6e27dbf54838');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('a7a06520-f9cd-4e4f-97c0-d06f9f71d676', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=197', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=198', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=199', '8cd90d1f-dd8e-4372-a20a-b8d4d429d5c4', '5428a1cd-4806-4d8c-b03f-39b26214f489');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('62a4b729-2146-4404-b2ed-64f93b036ee7', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=201', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=202', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=203', '5f59f65c-c0ba-482e-beab-95327a712627', '27eaf730-e980-46d6-91e7-d168b84cd797');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('d2b441b2-9d22-43f7-b5f7-e4388e3b4a23', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=205', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=206', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=207', '2f642b0e-4f2a-46c6-b257-8a6e414188d3', 'c7249a63-f809-44be-b8b7-625b764eb6e8');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('2aed60fc-be36-4e55-a39a-2407ca4fcc84', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=209', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=210', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=211', '06d044b4-7693-431b-bfd3-665794c97ed3', 'c7249a63-f809-44be-b8b7-625b764eb6e8');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('f9cc72c7-fb37-48ac-bb9f-99cc215de141', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=213', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=214', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=215', '5f59f65c-c0ba-482e-beab-95327a712627', 'f9ea2689-94d2-4489-aed7-2795b88a0b2b');
INSERT INTO "Document" ("id", "filename", "filetype", "filepathUrl", "startupId", "investorId") VALUES ('435795a8-2a0d-4561-a257-2929a5aa8f0d', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=217', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=218', 'https://slicedinvoices.com/pdf/wordpress-pdf-invoice-plugin-sample.pdf?id=219', '2f642b0e-4f2a-46c6-b257-8a6e414188d3', 'c7249a63-f809-44be-b8b7-625b764eb6e8');

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
