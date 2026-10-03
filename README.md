# 🏠 Rayan Estate

A modern full-stack real estate web application built with the MERN stack. Rayan Estate allows users to browse, search, filter, and manage property listings through a responsive and user-friendly interface.

🔗 **Live Demo:** https://mern-estate-knqx.onrender.com/

---

## 📌 About the Project

**Rayan Estate** is a full-stack real estate platform developed to provide a complete property-listing experience.

Users can create an account, manage their profile, create property listings, update or delete their own listings, search for properties, apply filters, sort results, view detailed property information, and contact landlords.

The project was developed as a practical MERN stack application to strengthen full-stack development, authentication, database management, API development, state management, and deployment skills.

---

## ✨ Features

* 🔐 User signup, signin & JWT authentication
* 👤 User profile management & avatar upload
* 🏡 Create, update & delete property listings
* 🔎 Search, filtering & sorting
* 💰 Rent, sale & offer listings
* 🚗 Parking & furnished filters
* 📸 Property image gallery
* 📩 Contact landlord
* 📱 Responsive design
* 🛡️ Protected listing ownership

---

## 🛠️ Tech Stack

**Frontend**

* React + Vite
* Redux Toolkit
* React Router
* Tailwind CSS
* Swiper
* React Icons

**Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT
* bcryptjs

**Services**

* Appwrite Storage
* MongoDB Atlas
* Render

---

## 📂 Project Structure

```text
Rayan Estate
├── client/        # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── redux/
│
├── api/           # Node.js & Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── utils/
│
└── README.md
```

---

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd mern_estate
```

### 2. Install dependencies

**Backend:**

```bash
cd api
npm install
```

**Frontend:**

```bash
cd ../client
npm install
```

### 3. Environment Variables

Create a `.env` file in the `api` folder:

```env
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Configure your Appwrite credentials according to your setup.

### 4. Start the application

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
cd client
npm run dev
```

---

## 🚀 Deployment

The application is deployed using **Render**.

🔗 **Live Application:**
https://mern-estate-knqx.onrender.com/

---

## 🔮 Future Improvements

* ❤️ Favorites / wishlist
* 💬 Real-time messaging
* 🗺️ Google Maps integration
* ⭐ Property reviews & ratings
* 📊 Admin dashboard
* 📧 Email notifications

---

## 👩‍💻 Developer

**Ayesha Afzal**
Computer Science Student | Full-Stack Developer

---

## ⭐ Feedback

Feedback and suggestions are always welcome!

If you like the project, consider giving the repository a ⭐.

---

## 📄 License

Created for learning, portfolio development, and demonstration purposes.




