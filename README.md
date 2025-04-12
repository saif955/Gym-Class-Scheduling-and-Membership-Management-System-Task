# Gym Management System

A role-based gym management system with JWT authentication and capacity control.

## Quick Links

- [Postman API Docs](https://documenter.getpostman.com/view/41550644/2sB2cYe1Fn)  
- [Live Production App](https://gym-management-system-psi.vercel.app)

## Project Overview

Streamline gym operations with three key roles:
- **Admins**: Full control over trainers & schedules (max 5 classes/day)
- **Trainers**: View assigned schedules only
- **Trainees**: Book classes (max 10/session) & manage profiles

Key Features:
- 🛑 Automatic capacity enforcement
- 🔐 JWT authentication
- 🚦 Error handling for validation/security
- ⏱️ Session duration control (2-hour max)

## Technology Stack

**Core:**
- Node.js | Express.js | TypeScript
- MongoDB | Mongoose
- JWT | BcryptJS

**Dev Tools:**
- Nodemon | ts-node

## Entity Relationship Diagram

🔗 [View ERD Diagram](https://drive.google.com/file/d/1-BsYnYpAb-6_QDKZP7itFMxf4W0OtF0g/view?usp=drive_link)

## API Documentation

### API Base URLs

`🔧 Development`  
`http://localhost:4000/api`

`🚀 Production`  
`https://gym-management-system-psi.vercel.app/api`

### Authentication

Authorization: Bearer <JWT_TOKEN>

**Authentication Requirements:**
- 🔐 **Admin role endpoints**: Valid admin JWT_TOKEN required
- 🏋️ **Trainer role endpoints**: Valid trainer JWT_TOKEN required
- 🧘 **Trainee role endpoints**: Valid trainee JWT_TOKEN required

**Auth Category:**

 | Endpoint               | Method | Role       | Description                     |
 |------------------------|--------|------------|---------------------------------|
 |`/users/login`          | POST   | Public     | User login                      |
 |`/users`                | POST   | Public     | Register user                   |

**Trainer Category:**
 
 | Endpoint               | Method | Role       | Description                     |
 |------------------------|--------|------------|---------------------------------|
 |`/trainer`              | POST   | Admin      | Create trainer                  |
 |`/trainer/{trainerId}`  | PUT    | Admin      | Update trainer                  |
 |`/trainer/{trainerId}`  | DELETE | Admin      | Delete trainer                  |
 
  **Schedule Category:**
  
 | Endpoint                | Method | Role       | Description                    |
 |-------------------------|--------|------------|--------------------------------|
 | `/schedule`             | POST   | Admin      | Create schedule                |
 | `/schedule/all`         | GET    | Admin      | Get all schedules              |
 | `/schedule/{scheduleId}`| PUT    | Admin      | Update schedule                |
 | `/schedule/{scheduleId}`| DELETE | Admin      | Delete schedule                |
 | `/schedule/`            | GET    | Trainer    | Get trainer schedules          |
 
**Trainee Category:**
  
 | Endpoint                | Method | Role       | Description                    |
 |-------------------------|--------|------------|--------------------------------|
 | `/trainee/profile`      | GET    | Trainee    | Get profile                    |
 | `/trainee/schedules`    | GET    | Trainee    | Get all schedules              |
 | `/trainee/profile`      | PUT    | Trainee    | Update profile                 |
 | `/trainee/enroll`       | POST   | Trainee    | Enroll in class                |

## API Testing

🔗 [View Postman Collection](https://documenter.getpostman.com/view/41550644/2sB2cYe1Fn) 

**Features:**
- 📚 Detailed endpoint documentation
- 🔄 Sample requests and responses
- 🔐 Authentication examples
- 🧩 Test collection ready for import

## Database Schema

### Schedule Model

| Field               | Type            | Description                          |
|---------------------|-----------------|--------------------------------------|
| `trainerId`         | `ObjectId`      | Reference to Trainer                 |
| `className`         | `String`        | Class name                           |
| `description`       | `String`        | Class description                    |
| `date`              | `Date`          | Class date                           |
| `startTime`         | `String`        | Start time (HH:mm format)            |
| `endTime`           | `String`        | End time (HH:mm format)              |
| `maxParticipants`   | `Number`        | Max capacity (default: 10)           |
| `currentParticipants` | `Number`      | Current enrollments                  |
| `participants`      | `[ObjectId]`    | Enrolled trainees                    |

### User Model

| Field               | Type            | Description                          |
|---------------------|-----------------|--------------------------------------|
| `name`              | `String`        | User's full name                     |
| `email`             | `String`        | Unique email                         |
| `password`          | `String`        | Hashed password                      |
| `role`              | `Enum`          | `admin`, `trainer`, or `trainee`     |
| `enrolledSchedules` | `[ObjectId]`    | Enrolled class IDs                   |


## 🔐 System Credentials

**👑 Admin Access**  
📧 Email: `saif@gmail.com`  
🔑 Password: `123456`  
💻 Access: Full system control  

**🏋️ Trainer Access**  
📧 Email: `trainer0@gmail.com`  
🔑 Password: `123456`  
💻 Access: View assigned schedules  

**🧘 Trainee Access**  
📧 Email: `trainee1@gmail.com`  
🔑 Password: `123456`  
💻 Access: Book classes & manage profile  

## Local Setup

1. **Clone repository**
```
git clone https://github.com/saif955/Gym-Class-Scheduling-and-Membership-Management-System-Task.git
cd Gym-Class-Scheduling-and-Membership-Management-System-Task
```
2. **Install dependencies**
```
npm install
```
3.**Setup Environment**  
   Create a `.env` file in root directory with the following content:
```
PORT=4000
MONGODB_URI=your_mongodb_uri                //example MONGODB_URI
JWT_SECRET=your_secret_key                  //example JWT_SECRET
JWT_EXPIRES_IN=1d                           //example JWT_EXPIRES_IN
```
4. **Run Server**
```
npm run dev
```
  Base Url: ```http://localhost:4000/api```
  
  Postman collection for local setup: 🔗 [Link](https://documenter.getpostman.com/view/41550644/2sB2cYe1LF)


