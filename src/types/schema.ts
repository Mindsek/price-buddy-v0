// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "mongodb"
//   url      = env("DATABASE_URL")
// }

// model Account {
//   id                String   @id @default(uuid()) @map("_id")
//   userId            String
//   type              String
//   provider          String
//   providerAccountId String
//   refresh_token     String?  @db.String
//   access_token      String?  @db.String
//   expires_at        Int?
//   token_type        String?
//   scope             String?
//   id_token          String?  @db.String
//   session_state     String?
//   user              User     @relation(fields: [userId], references: [id], onDelete: Cascade)
//   @@unique([provider, providerAccountId])
// }

// model Session {
//   id           String   @id @default(uuid()) @map("_id")
//   sessionToken String   @unique
//   userId       String
//   expires      DateTime
//   user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
// }

// model User {
//   id            String    @id @default(uuid()) @map("_id")
//   name          String?
//   email         String?   @unique
//   emailVerified DateTime?
//   image         String?
//   createdAt     DateTime  @default(now())
//   updatedAt     DateTime  @updatedAt
//   accounts      Account[]
//   sessions      Session[]
//   supermarkets  Supermarket[] // Supermarchés propres à l'utilisateur
//   products      Product[]     // Produits propres à l'utilisateur
// }

// model VerificationToken {
//   id         String   @id @default(uuid()) @map("_id")
//   identifier String
//   token      String   @unique
//   expires    DateTime
//   @@unique([identifier, token])
// }

// model Supermarket {
//   id        String    @id @default(uuid()) @map("_id")
//   name      String    @unique
//   address   String?
//   prices    Price[]
//   userId    String
//   user      User      @relation(fields: [userId], references: [id])
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// model Product {
//   id        String    @id @default(uuid()) @map("_id")
//   name      String
//   category  String
//   prices    Price[]
//   userId    String
//   user      User      @relation(fields: [userId], references: [id])
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// model Price {
//   id           String      @id @default(uuid()) @map("_id")
//   price        Float
//   product      Product     @relation(fields: [productId], references: [id])
//   supermarket  Supermarket @relation(fields: [supermarketId], references: [id])
//   productId    String
//   supermarketId String
//   createdAt    DateTime    @default(now())
// }
