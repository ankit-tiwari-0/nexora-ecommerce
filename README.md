# 🛍️ Nexora Ecommerce

> A modern full-stack e-commerce platform built with React, Node.js, Express, MongoDB, Redis, and Stripe.

Nexora is a complete e-commerce application with authentication, product browsing, category filtering, cart management, coupons, Stripe checkout, Redis caching, image management, analytics, and an admin dashboard.

---

## 🌐 Live Demo

**Live Website:**  
https://nexora-ecommerce-obrx.onrender.com/

---

## 📸 Preview

<img width="1886" height="1043" alt="Nexora Ecommerce" src="https://github.com/user-attachments/assets/0fcf7635-9f09-409b-8624-67428798cda0" />

---

# ✨ Features

## 🛍️ Customer Features

- Browse all products
- Browse products by category
- Featured products section
- Product search
- Add products to cart
- Update cart quantities
- Remove products from cart
- User registration and login
- Persistent authentication
- Coupon support
- Secure Stripe checkout
- Purchase success page
- Purchase cancellation page

---

## 👨‍💼 Admin Features

- Admin dashboard
- Product management
- Create products
- Delete products
- Manage featured products
- Coupon management
- Analytics dashboard
- Store activity monitoring

---

## 🔐 Authentication & Security

- JWT-based authentication
- HTTP-only cookies
- Protected routes
- Role-based access control
- Password hashing
- CORS configuration
- Environment-based configuration

---

## ⚡ Performance & Caching

- Redis caching with Upstash
- Featured product caching
- MongoDB database
- Optimized API requests
- Responsive React interface

---

## 💳 Payment System

Nexora uses **Stripe Checkout** for secure online payments.

### Payment Flow

```text
User
  ↓
Add Product to Cart
  ↓
Checkout
  ↓
Stripe Checkout
  ↓
Payment
  ↓
Purchase Success
  ↓
Order / Purchase Processing
  ↓
Coupon Generation
```

### Payment Features

- Stripe Checkout integration
- Purchase success handling
- Purchase cancellation handling
- Automatic coupon generation based on purchase conditions

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | UI development |
| Vite | Frontend build tool |
| Tailwind CSS | Styling |
| React Router | Routing |
| Axios | API requests |
| Zustand | State management |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| GSAP | Animations |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| Redis | Caching |
| ioredis | Redis client |
| JWT | Authentication |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin requests |

## Services

| Service | Purpose |
|---|---|
| MongoDB Atlas | Database hosting |
| Upstash Redis | Redis caching |
| ImageKit | Image storage |
| Stripe | Payments |
| Render | Deployment |

---

# 🏗️ Architecture

```text
                    ┌──────────────────┐
                    │   React + Vite   │
                    │    Frontend      │
                    └────────┬─────────┘
                             │
                            /api
                             │
                             ▼
                    ┌──────────────────┐
                    │ Node.js +        │
                    │ Express Backend  │
                    └───────┬──────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
      ┌───────────┐   ┌───────────┐   ┌───────────┐
      │ MongoDB   │   │   Redis   │   │  ImageKit │
      │   Atlas   │   │  Upstash  │   │   Images  │
      └───────────┘   └───────────┘   └───────────┘
                            │
                            ▼
                     ┌────────────┐
                     │   Stripe   │
                     │  Payments  │
                     └────────────┘
```

---

# 📁 Project Structure

```text
nexora-ecommerce/
│
├── Dockerfile
├── .dockerignore
│
├── nexora-api/
│   ├── controllers/
│   ├── lib/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── nexora-web/
    ├── public/
    ├── src/
    │   ├── components.jsx/
    │   ├── pages/
    │   ├── stores/
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js
```

---

# ⚙️ Local Development

## 1. Clone the Repository

```bash
git clone https://github.com/ankit-tiwari-0/nexora-ecommerce.git

cd nexora-ecommerce
```

## 2. Install Frontend Dependencies

```bash
cd nexora-web
npm install
```

## 3. Install Backend Dependencies

```bash
cd ../nexora-api
npm install
```

---

# 🔑 Environment Variables

Create the following file:

```text
nexora-api/.env
```

### Backend

```env
NODE_ENV=development
PORT=5000

MONGO_URI=your_mongodb_uri

REDIS_URL=your_upstash_redis_url

JWT_SECRET=your_jwt_secret

IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

STRIPE_SECRET_KEY=your_stripe_secret_key

CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=/api
```

> ⚠️ Never commit real API keys, passwords, tokens, or `.env` files to GitHub.

---

# 🐳 Docker

Nexora can run as a **single Docker container** containing both the React frontend and Express backend.

## Build the Docker Image

```bash
docker build -t nexora-app .
```

## Run the Container

```bash
docker run \
  --name nexora-app \
  -p 5000:5000 \
  --env-file nexora-api/.env \
  nexora-app
```

Open:

```text
http://localhost:5000
```

---

# 🚀 Production Deployment

Nexora is deployed on **Render using Docker**.

### Production API Configuration

The frontend communicates with the backend using:

```js
baseURL: "/api"
```

instead of a hardcoded localhost URL.

### Production Environment

```env
NODE_ENV=production

CLIENT_URL=https://nexora-ecommerce-obrx.onrender.com
```

### Deployment Architecture

```text
React + Vite
     │
     ▼
   Docker
     │
     ▼
Node.js + Express
     │
     ├──────────► MongoDB Atlas
     │
     ├──────────► Upstash Redis
     │
     ├──────────► ImageKit
     │
     └──────────► Stripe
```

---

# 🔄 Application Flow

```text
                ┌───────────────┐
                │     User      │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ React Frontend│
                └───────┬───────┘
                        │
                       /api
                        │
                        ▼
                ┌───────────────┐
                │ Express API   │
                └───────┬───────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
      MongoDB         Redis        ImageKit
      Atlas           Upstash
                        │
                        ▼
                     Stripe
```

---

# 📊 Environment Variables

| Variable | Purpose |
|---|---|
| `NODE_ENV` | Application environment |
| `PORT` | Server port |
| `MONGO_URI` | MongoDB connection |
| `REDIS_URL` | Upstash Redis connection |
| `JWT_SECRET` | Authentication token signing |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit authentication |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit authentication |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit image endpoint |
| `STRIPE_SECRET_KEY` | Stripe payments |
| `CLIENT_URL` | Frontend URL |
| `VITE_API_URL` | Frontend API base URL |

---

# 📱 Responsive Design

Nexora is designed to work across:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

The Featured Products section automatically adapts its layout based on screen size.

---

# 🎯 Core Application Modules

```text
Authentication
      │
      ├── Register
      ├── Login
      ├── JWT
      └── Protected Routes

Products
      │
      ├── Product Listing
      ├── Categories
      ├── Search
      └── Featured Products

Shopping Cart
      │
      ├── Add Product
      ├── Update Quantity
      └── Remove Product

Coupons
      │
      ├── Coupon Management
      └── Purchase-Based Generation

Payments
      │
      ├── Stripe Checkout
      ├── Success
      └── Cancellation

Admin
      │
      ├── Product Management
      ├── Analytics
      ├── Coupons
      └── Store Activity
```

---

# 🧰 Development Tools

- Git & GitHub
- Postman
- Docker
- VS Code
- Render
- MongoDB Atlas
- Upstash
- ImageKit
- Stripe

---

# 👨‍💻 Author

## Ankit Kumar Tiwari

**GitHub:**  
https://github.com/ankit-tiwari-0

**LinkedIn:**  
https://www.linkedin.com/in/ankit-tiwari-8125ba35/

---

## 🌐 Live Project

**Nexora Ecommerce**

https://nexora-ecommerce-obrx.onrender.com/
