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




