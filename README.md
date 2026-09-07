# Saina Exhibitions Pvt. Ltd. (SEPL) - Corporate Website

The official, production-ready corporate single-page website and digital platform hub for **Saina Exhibitions Pvt. Ltd. (SEPL)**.

---

## 1. Project Overview

**Saina Exhibitions Pvt. Ltd. (SEPL)** connects brands, manufacturers, buyers, and industry leaders through premier B2B exhibitions, trade shows, business summits, and digital media publications.

This repository contains the complete full-stack corporate website:
- **Frontend (`frontend/`)**: Modern, responsive, accessible single-page website built with semantic HTML5, modern CSS3 (custom properties, flexbox, CSS grid, smooth animations), and vanilla ES6+ JavaScript.
- **Backend (`backend/`)**: RESTful API server built with Node.js and Express.js, featuring CORS protection, payload sanitization, structured error handling, and MongoDB persistence using Mongoose.
- **Database (MongoDB)**: Stores B2B contact and exhibition enquiries in the `contacts` collection of the `saina_exhibitions` database.

---

## 2. Directory Structure

```text
SEPL/
│
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── controllers/
│   │   └── contactController.js
│   └── middleware/
│       └── errorHandler.js
│
├── frontend/
│   ├── index.html
│   ├── favicon.ico
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│       ├── logo.svg
│       ├── logo.png
│       ├── hero.webp
│       ├── about.webp
│       ├── perfect-sourcing.webp
│       ├── gsi.webp
│       ├── tafs.webp
│       └── team/
│           ├── member-1.webp
│           ├── member-2.webp
│           └── member-3.webp
│
├── package.json
├── .gitignore
└── README.md
```

---

## 3. Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js, Express.js (v4.21.2)
- **Database**: MongoDB, Mongoose (v8.9.5)
- **Security & Utilities**: `dotenv`, `cors`

---

## 4. Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** running locally or via MongoDB Atlas

Verify your Node and MongoDB installations:
```bash
node -v
npm -v
```

Ensure MongoDB service is active:
```powershell
# Windows
Get-Service -Name MongoDB
```

---

### Installation

From the project root:

```bash
# Install dependencies for both root and backend
npm install
```

Alternatively, you can install directly inside the `backend` folder:
```bash
cd backend
npm install
```

---

### Configuration

The backend reads its configuration from `backend/.env`. A template is provided in `backend/.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/saina_exhibitions
NODE_ENV=development
```

> **Security Note:** Never commit `.env` to version control. It is already added to `.gitignore`.

---

### Running the Application

From the root directory:

```bash
# Production start
npm start

# Development mode with hot reload (nodemon)
npm run dev
```

Or from inside `backend/`:
```bash
cd backend
npm start
```

Once started, navigate to:
```text
http://localhost:5000
```

---

## 5. API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Server and Database health status | Public |
| `GET` | `/api/contact/health` | Contact API service status | Public |
| `POST` | `/api/contact` | Submit a new contact/exhibition enquiry | Public |

### Contact Submission Payload (`POST /api/contact`)

```json
{
  "name": "Rahul Sharma",
  "companyName": "Apex Apparel Pvt. Ltd.",
  "email": "rahul@apexapparel.com",
  "phone": "+91 98765 43210",
  "subject": "Exhibition Stall Booking",
  "message": "We would like to book a 36 sqm stall at the Garment Show of India."
}
```

#### Success Response (`201 Created`):
```json
{
  "success": true,
  "message": "Your enquiry has been submitted successfully."
}
```

#### Validation Error (`400 Bad Request`):
```json
{
  "success": false,
  "message": "A valid email address is required."
}
```

---

## 6. How to Replace Placeholder Content with Real Data

All official company assets and details are structured with clear placeholders so you can drop in real information without altering application logic:

### A. Replacing the Brand Logo
- Replace `frontend/images/logo.png` with your official corporate logo PNG (recommended dimension: ~680x140 at 2x).
- Or replace `frontend/images/logo.svg` with your official vector logo.

### B. Replacing Photos & Visuals
Place your high-resolution WebP images into `frontend/images/`:
- **Hero Exhibition Visual**: `frontend/images/hero.webp` (recommended: 1600x900)
- **About Us Image**: `frontend/images/about.webp` (recommended: 1200x800)
- **Perfect Sourcing Show**: `frontend/images/perfect-sourcing.webp` (recommended: 800x500)
- **Garment Show of India (GSI)**: `frontend/images/gsi.webp` (recommended: 800x500)
- **TAFS Show**: `frontend/images/tafs.webp` (recommended: 800x500)

### C. Replacing Team Members
1. Save team portraits in `frontend/images/team/`:
   - `member-1.webp` (square 500x500)
   - `member-2.webp` (square 500x500)
   - `member-3.webp` (square 500x500)
2. In `frontend/index.html`, locate the `<section id="team">` and update:
   - `[Team Member Name]`
   - `[Designation]`
   - `[Professional Bio]`
   - LinkedIn profile URL

### D. Replacing Official Platform URLs
In `frontend/js/script.js`, locate the `platformLinks` object at the top of the file:

```javascript
const platformLinks = {
  perfectSourcing: "https://www.perfectsourcing.net",  // Replace with official URL
  gsi: "https://garmentshowofindia.in",              // Replace with official URL
  tafs: "https://tafsshow.com"                        // Replace with official URL
};
```
When set to valid URLs, clicking any **"Visit Website →"** or **"Explore Platform →"** button will open the real site in a secure new tab (`target="_blank"` with `rel="noopener noreferrer"`). While set to placeholders, clicking shows an accessible modal informing the visitor that the URL will be linked once configured.

### E. Replacing Contact & Corporate Information
In `frontend/index.html`, search for `[OFFICIAL` and update:
- `[OFFICIAL OFFICE ADDRESS]`
- `[OFFICIAL PHONE]` (both display text and `href="tel:..."`)
- `[OFFICIAL EMAIL]` (both display text and `href="mailto:..."`)
- `[OFFICIAL BUSINESS HOURS]`
- Social media profile links (`[OFFICIAL_LINKEDIN_URL]`, `[OFFICIAL_INSTAGRAM_URL]`, etc.)
- Corporate registration / CIN number

---

## 7. Responsive Design Verification

The site has been tested across standard device viewports:
- **Desktop**: 1440px, 1280px
- **Laptop / Small Desktop**: 1024px
- **Tablet**: 768px
- **Mobile**: 430px, 390px, 375px

Features:
- Sticky header with dynamic backdrop blur and scroll state
- Accessible mobile drawer navigation with animated hamburger toggle
- Dynamic active navigation highlighting on scroll (`IntersectionObserver`)
- Scroll reveal animations with `prefers-reduced-motion` compliance
- Zero horizontal overflow on any device width

---

## 8. License

Copyright &copy; 2026 Saina Exhibitions Pvt. Ltd. (SEPL). All Rights Reserved.
