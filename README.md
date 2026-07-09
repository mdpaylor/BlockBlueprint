# BloxBlueprint

BloxBlueprint is a full-stack web application designed to help Roblox developers organize and manage their game development projects. It provides a centralized platform for planning game architecture, tracking development tasks, organizing updates, documenting systems, and visualizing relationships between components.

The goal of this project is to demonstrate modern full-stack software engineering practices using Java, Spring Boot, React, PostgreSQL, Docker, and cloud deployment.

---

## Features

### User Authentication
- User registration
- Secure login
- BCrypt password hashing
- JWT authentication
- Protected API endpoints

### Project Management
- Create and manage multiple Roblox projects
- Project descriptions
- Automatic creation and update timestamps

### Component Architecture
Organize projects into reusable components such as:

- Module Scripts
- Server Scripts
- Local Scripts
- Remote Events
- Remote Functions
- Bindable Events
- Bindable Functions
- Folders
- Models
- Objects
- Custom component types

Each component supports:

- Parent/child hierarchy
- Descriptions
- Notes
- Tags
- Links to related components

### Component Functions

Store functions that belong to scripts.

Each function includes:

- Name
- Description
- Nested (child) functions
- Parent function relationships

### Task Management

Create development tasks including:

- Bug fixes
- Features
- World design
- UI work
- Scripting
- Testing
- Custom task types

Each task supports:

- Status
- Priority
- Due date
- Tags
- Notes
- Optional update association

### Updates

Plan future game releases by grouping related tasks.

Each update includes:

- Version
- Title
- Description
- Release date
- Status

### Monetization

Track monetization systems including:

- Gamepasses
- Developer Products

Each entry contains:

- Name
- Description
- Price
- Type
- Notes
- Tags

### Notes

Attach detailed notes to components and tasks.

### Tags

Create custom tags for organizing:

- Components
- Tasks

Examples:

- Needs Refactoring
- High Priority
- Multiplayer
- UI
- Combat
- Completed

### Component Links

Model relationships between components such as:

- Uses
- Calls
- Requires
- References
- Parents

---

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MapStruct
- Flyway
- JWT Authentication
- Maven

### Frontend

- React
- TypeScript
- Vite

### Database

- PostgreSQL

### DevOps

- Docker
- Docker Compose

### Deployment (Planned)

- Backend
- Frontend
- PostgreSQL Database

---

## Project Structure

```
BloxBlueprint/
│
├── backend/
│   ├── Spring Boot
│   ├── REST API
│   ├── Security
│   └── Dockerfile
│
├── frontend/
│   ├── React
│   ├── TypeScript
│   └── Dockerfile
│
├── database/
│   ├── SQL
│   └── Flyway Migrations
│
├── docker-compose.yml
│
└── README.md
```

---

## Technologies Demonstrated

This project showcases experience with:

- RESTful API design
- Object-oriented programming
- Authentication & Authorization
- Password hashing
- JWT security
- Database design
- Relational modeling
- JPA/Hibernate
- Entity relationships
- Flyway database migrations
- Docker containerization
- Full-stack development
- Modern React development
- TypeScript
- PostgreSQL
- Git version control

---

## Future Enhancements

- Drag-and-drop architecture editor
- Interactive component graph visualization
- Project search and filtering
- File attachments
- Image uploads
- Team collaboration
- Role-based authorization
- Dark mode
- Dashboard analytics
- Import Roblox project structure
- Export project documentation
- Notifications
- Calendar integration

---

## Purpose

BloxBlueprint is being developed as both a practical productivity tool for Roblox game development and a portfolio project demonstrating professional software engineering practices across frontend development, backend development, database design, authentication, security, and deployment.
