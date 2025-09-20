# 🍱 iCanteen: A Smart Canteen Management System

**Course:** CSE 3100  
A web-based system to streamline institutional canteen operations — from ordering to staff management and real-time analytics.

---

## 📖 Table of Contents
- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Target Audience](#-target-audience)
- [UI Design](#-ui-design)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#-prerequisites)
  - [Installation](#-installation)
  - [Running the Application](#-running-the-application)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Team](#-team)
- [License](#-license)

---

## 📌 About the Project
**iCanteen** is a full-stack **Smart Canteen Management System** developed as a course project.  
It transforms traditional canteen operations by integrating:

- Role-based dashboards for **staff** and **customers**  
- Real-time **order tracking** and status updates  
- **Staff shift** and salary overview  
- **Menu & order management** (frontend complete; backend integrated with Laravel)  

🎯 Our mission is to **reduce waiting times**, **digitize operations**, and **improve customer experience** in institutional canteens.

---

## 🚀 Key Features

### ✅ Customer-Side
- Register / Login  
- Browse **menu items**  
- Place orders & view total bill  
- Track order status (pending → delivered)

### ✅ Staff/Admin-Side
- Staff dashboard with live stats  
- Add / update / delete **menu items**  
- Manage and track **orders**  
- View assigned **shifts**  
- Profile page with **salary info**  

### 📊 Analytics & Smart Modules
- Dashboard: total orders, pending/delivered, active staff  
- Responsive design for all devices  
- Background visuals for better UX  

---

## 🎯 Target Audience
- **Customers:** Students, faculty, guests  
- **Staff:** Kitchen team, delivery staff, managers  
- **Admins:** Canteen supervisors and institutional heads  

---

## 🎨 UI Design
- Modern, responsive, **role-based dashboards**  
- Easy navigation: Dashboard, Orders, Shifts, Profile  
- Background images + overlays for readability  

---

## 🔗 Technology Stack
**Frontend:**
- React.js  
- Material UI & Ant Design  
- TailwindCSS  
- React Router v6  

**Backend:**
- Laravel (PHP REST API)  
- MySQL  

**DevOps & Tools:**
- GitHub  
- Vercel (Frontend Deployment)  
- Postman (API Testing)  

---

## ⚙️ Getting Started

### 🔧 Prerequisites
- **Node.js** >= 18  
- **NPM** >= 8  
- **PHP** >= 8  
- **MySQL** >= 8  

### 📦 Installation
Clone the repository:
```bash
git clone https://github.com/Saobia3i/iCanteen.git
cd iCanteen/frontend

Install frontend dependencies:

npm install

🏃‍♂️ Running the Application
npm run dev


Now open: http://localhost:5173

For backend (Laravel):

cd ../backend/laravel
php artisan serve

🧪 Usage

Customers: Register/Login → Browse menu → Add to cart → Place order → Track status

Staff: Login → View dashboard → Manage orders → Add menu items → View profile

📁 Project Structure
iCanteen/
├── frontend/                # React + UI
│   ├── src/
│   │   ├── assets/          # Images, logos, background
│   │   ├── auth/            # Login & Register
│   │   ├── components/      # Shared components (Navbar, Footer, BackButton)
│   │   ├── pages/
│   │   │   ├── customer/    # Customer pages
│   │   │   │   ├── CustomerHome.jsx
│   │   │   │   ├── Menu.jsx
│   │   │   │   ├── AboutUs.jsx
│   │   │   │   └── Contact.jsx
│   │   │   └── staff/       # Staff pages
│   │   │       ├── StaffHome.jsx
│   │   │       ├── Order.jsx
│   │   │       ├── Shifts.jsx
│   │   │       └── Profile.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
└── backend/                 # Laravel backend
    └── laravel/
        ├── app/
        ├── routes/
        └── composer.json

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a branch: git checkout -b feature/YourFeature

Commit changes: git commit -m 'Add YourFeature'

Push: git push origin feature/YourFeature

Open a Pull Request

👨‍💻

Saobia Islam — ID:20220204088



📝 License

This project is licensed under the MIT License.


