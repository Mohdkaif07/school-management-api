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
