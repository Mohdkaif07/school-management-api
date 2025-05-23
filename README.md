# 📚 School Management API

A Node.js + Express.js REST API for managing school data, using MySQL as the database. This system allows users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

---

## 🚀 Live API

🌐 **Base URL:**  
[https://school-management-api-production-82f9.up.railway.app](https://school-management-api-production-82f9.up.railway.app)

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL** with `mysql2/promise`
- **Hosted on Railway**

---

## 🗃️ Database Schema

```sql
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  address VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);

```

## 📌 API Endpoints

### ➕ Add School

- **URL:** `/addSchool`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**

```json
{
  "name": "Greenwood High",
  "address": "123 School Lane, Bengaluru",
  "latitude": 12.9716,
  "longitude": 77.5946
}
```
- **Success Response:**
  - `201 Created`
  - `✅ School added successfully!`

- **Error Response:**
  - `400 Bad Request`
  - `❌ All fields (name, address, latitude, longitude) are required!`

---

### 📍 List Schools by Proximity

- **URL:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude`: User’s current latitude
  - `longitude`: User’s current longitude

- **Example Request:**
```

- **Success Response:**
```json
[
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 School Lane, Bengaluru",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "distance": 0
  },
  {
    "id": 2,
    "name": "St. Joseph's School",
    "address": "MG Road, Bengaluru",
    "latitude": 12.9755,
    "longitude": 77.6035,
    "distance": 1.1
  }
]
```

- **Error Response:**
  - `400 Bad Request`
  - `❌ Latitude and longitude are required!`

---

### 🧪 Dummy School Seeder

- **URL:** `/add-dummy-school`
- **Method:** `GET`
- **Purpose:** Creates the `schools` table and inserts a test entry for validation/demo

---

## 🧑‍💻 How to Run Locally

### 📦 Prerequisites

- Node.js (v18+)
- MySQL Server

### ⚙️ Setup

```bash
# Clone the repository
git clone https://github.com/your-username/school-management-api.git
cd school-management-api

# Install dependencies
npm install
```
# Create a .env file with the following contents

```env
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASSWORD=yourpassword
MYSQLDATABASE=school_db
MYSQLPORT=3306
PORT=3000
```
---

## 🧪 Testing the APIs

Use [Postman](https://www.postman.com/) or any API client to test the endpoints:

- `POST /addSchool` — Add a new school
- `GET /listSchools?latitude=12.97&longitude=77.59` — List schools by proximity
- `GET /add-dummy-school` — Create table and insert sample school

---

## 📬 Postman Collection

A ready-to-use Postman collection is available:

🔗 [Postman Collection Link]([https://web.postman.co/workspace/526432ca-63be-40a3-896a-4adf883dc2d8/request/create?requestId=9c27bb1d-6bfe-427c-b385-2f1e77e40781](https://.postman.co/workspace/My-Workspace~526432ca-63be-40a3-896a-4adf883dc2d8/request/34501171-fbe8a5d4-b33f-43e4-bb9b-c060253fd968?action=share&creator=34501171&ctx=documentation))

> Replace the link above with your actual shared Postman collection URL.

---

## 👨‍💻 Author

Made with ❤️ by **MD KAIF**  
📧 Email: gamingstunt32@gmail.com  
🐙 GitHub: [MohdKAif07](https://github.com/MOhdkaif07)

---




