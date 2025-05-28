# Ecommerce Next.js

> A full-featured online store built with Next.js 13, React, and MongoDB.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)

---

## About

This project is an ecommerce application built with **Next.js 13** (App Router), **React**, and **TailwindCSS**, using **MongoDB Atlas** as the database. The app includes a product catalog, item detail pages, a dynamic shopping cart, and RESTful API endpoints.

## Features

- Product listing and detail views
- Add and remove items from the cart
- Persistent cart stored in the database
- CRUD operations for products (via API)
- Dynamic and client-side rendering for real-time interactions
- Error handling in endpoints with user feedback

## Technologies

- Next.js 13 (App Router)
- React 18+
- TailwindCSS
- MongoDB Atlas
- TypeScript
- ESLint / Prettier

## Prerequisites

- Node.js v18+ installed
- MongoDB Atlas account and cluster

## Installation

1. Clone the repository:
   ```powershell
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```

## Environment Variables

Copy `.env.local.example` to `.env.local` and set the following variables:

```dotenv
MONGODB_USER=<Your MongoDB user>
MONGODB_PASSWORD=<Your MongoDB password>
MONGODB_URI=<Your full connection string or cluster URL>
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`  
  Starts the development server at http://localhost:3000

- `npm run build`  
  Builds the application for production

- `npm start`  
  Starts the production server

- `npm run lint`  
  Runs ESLint to check for code style issues

## Project Structure

```text
app/
├─ api/               # RESTful API endpoints
│  ├─ products/       # Product CRUD operations
│  └─ users/[id]/cart # Cart endpoints
├─ cart/              # Shopping cart pages
├─ products/          # Product listing and detail pages
├─ components/        # Reusable components
├─ db.ts              # MongoDB connection
└─ globals.css        # Global styles

public/               # Static assets (images, icons)
```

## API Reference

### Products

- `GET /api/products`  
  Returns a list of all products.

- `GET /api/products/:id`  
  Returns the details of a single product by ID.

- `DELETE /api/products/:id`  
  Deletes a product and cascades removal from carts.

### User Cart

- `GET /api/users/:id/cart`  
  Retrieves items in the user’s cart.

- `POST /api/users/:id/cart`  
  Adds a product to the cart.  
  ```json
  { "productId": "<product ID>" }
  ```

- `DELETE /api/users/:id/cart`  
  Removes a product from the cart.  
  ```json
  { "productId": "<product ID>" }
  ```


Developed with 🧡 by **Pedro Reis**  
📧 dropecosta@gmail.com  
[LinkedIn](https://www.linkedin.com/in/dropecosta/) | [GitHub](https://github.com/dropecosta)