# Next.js User Profile App

A modern web application built with **Next.js**, providing user authentication, profile management, and profile photo upload.  
The application integrates with a REST API secured with JWT authentication.

---

## 🚀 Features

- **User Authentication**  
  Secure login with JWT-based access and refresh tokens.

- **Profile Management**  
  View and edit user information including name, biography, phone, document, and social links.

- **Profile Photo Upload**  
  Upload and update the profile picture with instant preview.

- **Responsive UI**  
  Clean, modern, and adaptable design optimized for all devices.

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) – React framework for production-grade apps  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  
- [JWT](https://jwt.io/) – Secure authentication  
- Fetch API – Handling API requests  

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Stiven-Chacon/user-profile-app
cd user-profile-app
npm install
npm run dev
```
---

## 📂 Project Structure
```bash
USER-PROFILE-APP/
├── public/                # Static assets (images, icons, etc.)
├── src/
│   ├── app/               # Next.js 13 App Router
│   │   ├── profile/       # User profile routes
│   │   │   ├── edit/      # Profile edit page
│   │   │   └── page.tsx   # Profile view page
│   │   ├── layout.tsx     # Main layout wrapper
│   │   ├── page.tsx       # Login page
│   │   └── globals.css    # Global styles (Tailwind CSS)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions/helpers
│   └── services/          # API calls & authentication logic
```
---
