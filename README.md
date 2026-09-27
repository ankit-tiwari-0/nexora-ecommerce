Nexora Ecommerce

A full-stack modern e-commerce web application built with React, Node.js, Express, MongoDB, Redis, and Stripe. Nexora provides a complete shopping experience with authentication, product browsing, cart management, coupons, checkout, and an admin dashboard.

🌐 Live Website: https://nexora-ecommerce-obrx.onrender.com/

🚀 Features
🛍️ Customer Features
Browse products
Browse products by category
Featured products section
Product search/browsing
Add products to cart
Update cart items
Remove products from cart
User registration and login
Persistent authentication
Purchase success and cancellation pages
Coupon support
Secure Stripe checkout
👨‍💼 Admin Features
Admin dashboard
Product management
Create products
Delete products
Manage featured products
View analytics
Manage coupons
Monitor store activity
🔐 Authentication & Security
JWT-based authentication
HTTP cookies
Protected routes
Role-based access
Password hashing
CORS configuration
Environment-based configuration
⚡ Performance & Caching
Redis caching with Upstash
Featured product caching
MongoDB database
Optimized API requests
Responsive React interface
💳 Payments
Stripe Checkout integration
Purchase success handling
Purchase cancellation handling
Automatic coupon generation based on purchase conditions
🛠️ Tech Stack
Frontend
React.js
Vite
Tailwind CSS
React Router
Axios
Zustand
React Hot Toast
Lucide React
GSAP
Backend
Node.js
Express.js
MongoDB
Mongoose
Redis
ioredis
JWT
Cookie Parser
CORS
Services
MongoDB Atlas for database
Upstash Redis for caching
ImageKit for image storage
Stripe for payments
Render for deployment
Deployment

The frontend and backend are packaged into a single Docker container and deployed on Render.

React + Vite
     ↓
Docker
     ↓
Node.js + Express
     ↓
MongoDB + Redis
     ↓
Stripe / ImageKit
📁 Project Structure
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
    ├── package.json
    └── vite.config.js
⚙️ Local Installation
1. Clone the repository
git clone https://github.com/ankit-tiwari-0/nexora-ecommerce.git
cd nexora-ecommerce
2. Install frontend dependencies
cd nexora-web
npm install
3. Install backend dependencies
cd ../nexora-api
npm install
4. Configure environment variables

Create:

nexora-api/.env

Example:

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

For the frontend:

VITE_API_URL=/api

Never commit real secrets or .env files to GitHub.

🐳 Docker

Nexora can run as a single Docker container containing both the React frontend and Express backend.

Build the image:

docker build -t nexora-app .

Run it:

docker run --name nexora-app -p 5000:5000 --env-file nexora-api/.env nexora-app

Open:

http://localhost:5000
🌐 Production

Nexora is deployed on Render using Docker.

Production frontend API requests use:

baseURL: "/api"

instead of a hardcoded localhost URL.

Production environment:

NODE_ENV=production
CLIENT_URL=https://nexora-ecommerce-obrx.onrender.com
Live Demo

https://nexora-ecommerce-obrx.onrender.com

🔄 Application Flow
User
 │
 ▼
React Frontend
 │
 │ /api
 ▼
Express Backend
 │
 ├──────────────► MongoDB
 │
 ├──────────────► Redis / Upstash
 │
 ├──────────────► ImageKit
 │
 └──────────────► Stripe
💳 Payment Flow
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
Order/Purchase Processing
  ↓
Coupon Generation
🔐 Environment Variables

The application requires environment variables for:

Variable	Purpose
NODE_ENV	Application environment
PORT	Server port
MONGO_URI	MongoDB connection
REDIS_URL	Upstash Redis connection
JWT_SECRET	Authentication token signing
IMAGEKIT_PRIVATE_KEY	ImageKit authentication
IMAGEKIT_PUBLIC_KEY	ImageKit authentication
IMAGEKIT_URL_ENDPOINT	ImageKit image endpoint
STRIPE_SECRET_KEY	Stripe payments
CLIENT_URL	Frontend URL
📱 Responsive Design

The application is designed to work across:

Desktop
Laptop
Tablet
Mobile

The Featured Products section also adapts its product layout based on screen size.

🧑‍💻 Author

Ankit Kumar Tiwari

GitHub: github.com/ankit-tiwari-0

LinkedIn: LinkedIn Profile
