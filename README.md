# Price Buddy

Price Buddy is a Progressive Web App (PWA) designed to help users track and compare product prices across different supermarkets. Built with Next.js, it uses GitHub authentication via NextAuth and MongoDB with Prisma for data storage. The app allows users to manage supermarkets, add products, associate prices with supermarkets, and view savings insights on a dashboard.

## Features

### 1. /supermarkets - Manage Supermarkets

**Purpose**: Add and view supermarkets to keep track of where prices are sourced.  
**Functionality**:

- Add a supermarket with a name (e.g., "Carrefour") and an address to differentiate locations.
- View a list of all supermarkets you’ve added.  
  **Example**: Add "Carrefour - 123 Main St" and "Carrefour - 456 Market Ave" to distinguish between stores.

### 2. /products - Manage Products and Prices

**Purpose**: Add products and associate them with supermarkets and prices.  
**Functionality**:

- Add a product (e.g., "Milk").
- Link a product to one or more supermarkets with a specific price (e.g., "Milk at Carrefour - 123 Main St costs $1.20").
- View all products and their prices across supermarkets.  
  **Example**: Track "Milk" at multiple Carrefour locations with different prices.

### 3. /dashboard - Savings Overview

**Purpose**: Get insights into your price tracking and savings.  
**Functionality**:

- Total savings: Calculate how much you’ve saved by choosing the cheapest options.
- Number of tracked products: Show how many products you’re monitoring.
- Number of supermarkets: Display the count of supermarkets you’ve added.
- Best savings: Highlight the biggest price difference for the same product between two supermarkets (e.g., "Milk: $1.20 at Carrefour vs. $1.50 at Leclerc = $0.30 saved").  
  **Example**: "You’re tracking 5 products across 3 supermarkets and saved $2.50 total!"

## Authentication

- **GitHub Login**: Securely log in using your GitHub account via NextAuth.
- **Protected Routes**: Only authenticated users can access `/supermarkets`, `/products`, and `/dashboard` and `/`.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Authentication**: NextAuth.js with GitHub provider
- **Database**: MongoDB with Prisma ORM
- **Deployment**: Vercel (or local development)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)
- GitHub App or OAuth App credentials (`GITHUB_ID` and `GITHUB_SECRET`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mindsek/price-buddy-v0.git
   cd price-buddy-v0
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```bash
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   AUTH_SECRET=your_auth_secret
   ```

4. Générer les types Prisma:

   ```bash
   npx prisma generate
   ```

   Note: Cette étape est automatiquement incluse dans la commande `npm run build`.

5. Démarrer le serveur de développement:

   ```bash
   npm run dev
   ```

   Ou pour un environnement de production:

   ```bash
   npm run build && npm run start
   ```

6. Accéder à l'application dans votre navigateur à l'adresse `http://localhost:3000`.

## Deployment

Deploy to Vercel by pushing to a GitHub repo and configuring the environment variables in the Vercel dashboard.

## USAGE

- Sign In: Go to /signin and log in with GitHub.
- Add Supermarkets: Visit /supermarkets to add stores with names and addresses.
- Add Products: Go to /products to add products and link them to supermarkets with prices.
- View Insights: Check /dashboard for savings stats and comparisons.
