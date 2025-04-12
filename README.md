# Gym Management System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A role-based gym management system with JWT authentication and capacity control.

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

![ERD Diagram](/media/erd.png)

## API Documentation

### Base URL
`http://localhost:4000/api`

### Authentication
```http
Authorization: Bearer <JWT_TOKEN>
| Category  | Endpoint                | Method | Role       | Description                     |
|-----------|-------------------------|--------|------------|---------------------------------|
| Auth      | `/users/login`          | POST   | Public     | User login                      |
| Auth      | `/users`                | POST   | Public     | Register user                   |
| Trainer   | `/trainer`              | POST   | Admin      | Create trainer                  |
| Trainer   | `/trainer/{trainerId}`  | PUT    | Admin      | Update trainer                  |
| Trainer   | `/trainer/{trainerId}`  | DELETE | Admin      | Delete trainer                  |
| Schedule  | `/schedule`             | POST   | Admin      | Create schedule                 |
| Schedule  | `/schedule/all`         | GET    | Public     | Get all schedules               |
| Schedule  | `/schedule/{scheduleId}`| PUT    | Admin      | Update schedule                 |
| Schedule  | `/schedule/{scheduleId}`| DELETE | Admin      | Delete schedule                 |
| Trainee   | `/trainee/profile`      | GET    | Trainee    | Get profile                     |
| Trainee   | `/trainee/profile`      | PUT    | Trainee    | Update profile                  |
| Trainee   | `/trainee/enroll`       | POST   | Trainee    | Enroll in class                 |
```
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

## Default Credentials

| Role       | Email                  | Password    |
|------------|------------------------|-------------|
| **Admin**  | `saif@gmail.com`       | `123456`    |
| **Trainer**| `trainer0@gmail.com`   | `123456`    |
| **Trainee**| `trainee0@gmail.com`   | `123456`    |

Local Setup
Clone repository

bash
Copy
git clone https://github.com/saif955/Gym-Management-System.git
cd Gym-Management-System
Install dependencies

bash
Copy
npm install
Create .env file

env
Copy
PORT=4000
MONGODB_URI=mongodb://localhost:27017/gymdb
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
Start development server

bash
Copy
npm run dev
Deployment
Deployed on Vercel:
Vercel

bash
Copy
# Production build
npm run build

# Deploy with Vercel CLI
vercel
License
This project is licensed under the MIT License - see the LICENSE file for details.

Copy

This README features:
1. Responsive badges for quick status checks
2. Clear endpoint documentation in table format
3. Visual schema representation
4. Copy-paste ready setup commands
5. Environment variable templates
6. Deployment instructions
7. License information

Adjust the vercel deployment badge URL and repository links to match your actual project URLs.# Gym Management System

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![Node.js CI](https://github.com/saif955/Gym-Management-System/workflows/Node.js%20CI/badge.svg)

A role-based gym management system with JWT authentication and capacity control.

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

![ERD Diagram](/media/erd.png)

## API Documentation

### Base URL
`http://localhost:4000/api`

### Authentication
```http
Authorization: Bearer <JWT_TOKEN>
Endpoints Table
Category	Endpoint	Method	Role	Description
Auth	/users/login	POST	Public	User login
Auth	/users	POST	Public	Register user
Trainer	/trainer	POST	Admin	Create trainer
Trainer	/trainer/{trainerId}	PUT	Admin	Update trainer
Trainer	/trainer/{trainerId}	DELETE	Admin	Delete trainer
Schedule	/schedule	POST	Admin	Create schedule
Schedule	/schedule/all	GET	Public	Get all schedules
Schedule	/schedule/{scheduleId}	PUT	Admin	Update schedule
Schedule	/schedule/{scheduleId}	DELETE	Admin	Delete schedule
Trainee	/trainee/profile	GET	Trainee	Get profile
Trainee	/trainee/profile	PUT	Trainee	Update profile
Trainee	/trainee/enroll	POST	Trainee	Enroll in class
Database Schema
Schedule Model
Field	Type	Description
trainerId	ObjectId	Reference to Trainer
className	String	Class name
description	String	Class description
date	Date	Class date
startTime	String	Start time (HH:mm)
endTime	String	End time (HH:mm)
maxParticipants	Number	Max capacity (default: 10)
currentParticipants	Number	Current enrollments
participants	[ObjectId]	Enrolled trainees
User Model
Field	Type	Description
name	String	User's full name
email	String	Unique email
password	String	Hashed password
role	Enum	['admin', 'trainer', 'trainee']
enrolledSchedules	[ObjectId]	Enrolled class IDs
Credentials
Role	Email	Password
Admin	saif@gmail.com	123456
Trainer	trainer0@gmail.com	123456
Trainee	trainee0@gmail.com	123456
Local Setup
Clone repository

bash
Copy
git clone https://github.com/saif955/Gym-Management-System.git
cd Gym-Management-System
Install dependencies

bash
Copy
npm install
Create .env file

env
Copy
PORT=4000
MONGODB_URI=mongodb://localhost:27017/gymdb
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
Start development server

bash
Copy
npm run dev
Deployment
Deployed on Vercel:
Vercel

bash
Copy
# Production build
npm run build

# Deploy with Vercel CLI
vercel
License
This project is licensed under the MIT License - see the LICENSE file for details.

Copy

This README features:
1. Responsive badges for quick status checks
2. Clear endpoint documentation in table format
3. Visual schema representation
4. Copy-paste ready setup commands
5. Environment variable templates
6. Deployment instructions
7. License information

Adjust the vercel deployment badge URL and repository links to match your actual project URLs.
