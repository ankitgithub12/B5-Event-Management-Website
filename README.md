# BE5 Eventory - Premium Event Management & Admin Portal

BE5 Eventory is a modern, high-end event management platform designed to provide seamless planning and execution for all types of events, from grand weddings to professional corporate galas. The codebase is divided into a robust React-based frontend and an MVC Express backend, secured with token-based JWT and fully integrated with Cloudinary image hosting.

---

## 🌐 Deployed Links

*   **Client Application**: [https://be5-event-management-website.onrender.com/](https://be5-event-management-website.onrender.com/)
*   **Server API**: [https://b5-event-management-website-server.onrender.com/](https://b5-event-management-website-server.onrender.com/)

---

## ✨ Features

*   **Dynamic Landing Page**: A stunning, responsive home page with multiple specialized sections.
*   **Service Showcases**: Detailed views for various event categories including College Events, Corporate Events, Weddings, and more.
*   **Interactive Motion Portfolio**: A beautiful gallery with staggered "left-to-right" slide animations and interactive horizontal hover effects.
*   **Premium Testimonials**: Dynamic ratings with staggered entrance motion and interactive hover feedback using Framer Motion.
*   **Interactive UI Components**: Subtle micro-interactions like card lift effects, scale feedback, and polished spring-based transitions.
*   **Custom Planner**: A dedicated section for users to plan their custom events.
*   **Advanced Contact Form**: A user-friendly consultation form with integrated date validation (restricts past date selection).
*   **Premium Design**: Modern aesthetics using a sophisticated color palette, glassmorphism effects, and a custom animation system.

### 👑 Responsive Admin Dashboard
A premium administration portal (located under `/admin/*` and guarded by JWT authorization blocks) designed to manage all dynamic contents:
*   **Analytics Overview Panel**: Dynamic, responsive Recharts area and bar graphs displaying monthly revenues and booking distributions.
*   **Events CRUD Listing**: Write, read, modify, and delete active showcase events with direct Cloudinary file uploads.
*   **Bookings & Planner Manager**: Review custom client planner requests, guest metrics, establish invoice quotes ($), and modify planning phases (Pending, Confirmed, Completed, Cancelled).
*   **Services Catalog**: Create corporate catering packages or customization structures.
*   **Inquiries & Lead Inbox**: Unified mailbox tracking contact logs and client comments. Mark emails as Read/Replied or contact clients directly.
*   **System Permissions**: Register and manage fellow administrators and staff access.
*   **Real-time Alerts**: Native Socket.io configurations pushing new booking badges to the active admin session instantly.

---

## 🛠️ Tech Stack

*   **Frontend**: 
    *   [React](https://react.dev/) (v19)
    *   [Vite](https://vitejs.dev/) (v8)
    *   [Tailwind CSS](https://tailwindcss.com/) (v4)
    *   [Framer Motion](https://www.framer.com/motion/) (Animations)
    *   [Lucide React](https://lucide.dev/) (Iconography)
    *   [React Router](https://reactrouter.com/) (Navigation)
    *   [Recharts](https://recharts.org/) (Analytical Visualizations)
    *   [Socket.io-client](https://socket.io/) (Real-time notifications client)
*   **Backend & Server**:
    *   [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) (RESTful MVC API Server)
    *   [MongoDB](https://www.mongodb.com/) (Data persistence)
    *   [Socket.io](https://socket.io/) (Real-time event emitter server)
    *   [Cloudinary SDK](https://cloudinary.com/) (Media storage)
    *   [Multer](https://github.com/expressjs/multer) & [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary) (Multipart middleware parser)
    *   [BcryptJS](https://github.com/dcodeIO/bcrypt.js) (Administrative password hashing)
    *   [JSONWebToken](https://jwt.io/) (Security headers auth issuer)

---

## 📂 Project Structure

```text
BE5-Event-Management-Website/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI elements & layouts (sidebar/navbar)
│   │   ├── pages/       # Page-level components & CRUD administration views
│   │   ├── assets/      # Images, official BE5 logos, and styling sheets
│   │   ├── utils/       # JWT axios interceptors
│   │   └── App.jsx      # Main application entry and protected routes
│   ├── .env             # Client-side environment file (ignored in git)
│   ├── .env.example     # Client-side template
│   └── package.json
├── server/              # Backend API & MVC Server
│   ├── config/          # MongoDB & Cloudinary SDK configurations
│   ├── middleware/      # Admin role-guard authorization blocks
│   ├── models/          # MongoDB document schemas (Users, Events, Bookings)
│   ├── controllers/     # API request handler functions
│   ├── routes/          # API express router definitions
│   ├── .env             # Backend secret environment keys (ignored in git)
│   ├── .env.example     # Backend template
│   └── server.js        # Main backend application boot file
└── README.md            # Project documentation
```

---

## 🚀 Getting Started & Configuration

### Prerequisites
*   Node.js (v18 or higher)
*   MongoDB Instance (Atlas or Local)
*   Cloudinary Account (for event & gallery uploads)

### 🗝️ Environment Variable Setup

To run the application in development or production, copy `.env.example` in both folders to a newly created `.env` file and insert the values:

#### 1. Backend Server Setup (`server/.env`)
Create `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_signing_token_secret

# Default Administrator Credentials (auto-seeded on DB connection if users empty)
ADMIN_EMAIL=Ceomonika@gmail.com
ADMIN_PASSWORD=24@12@21

# Cloudinary Integration Details
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### 2. Frontend Client Setup (`client/.env`)
Create `client/.env` (prefixed with `VITE_` to enable loading in Vite):
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## 🏃 Running the Application

### 1. Installation
Run npm installs in both root directories:
```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Run Development Servers
```bash
# Start backend API (typically runs on http://localhost:5000)
cd server
npm run dev

# Start frontend client (typically runs on http://localhost:5173)
cd ../client
npm run dev
```

### 3. Production Deployment Build
When deploying the frontend to static CDN hosting (Vercel, Netlify) and backend to a container provider (Render, Railway, Heroku):
```bash
# Build Client production bundle
cd client
npm run build
```
*Make sure to configure the Environment variables in your production server dashboard matching the values in `.env` files.*

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
