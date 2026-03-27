_This project has been created as part of the 42 curriculum by ehode, ncorrear, kzhen-cl, drabarza, pboucher._

# ft_transcendence

![illustration](/images/illustration.png)

## Description

**ft_transcendence** is a full-stack web application focused on real-time interactions between users.
The goal of the project is to build a modern, scalable platform combining social features, real-time communication, and a secure API.

### Key Features

- Real-time messaging system (WebSockets)
- User authentication and profile management
- Friends system with online status
- Public REST API with API key authentication
- File upload and management system
- Advanced search system (filters, sorting, pagination)
- Notification system
- Monitoring with Prometheus & Grafana
- Python API wrapper (**Unicord**)

## Instructions

### Prerequisites

Make sure you have the following installed:

- Docker & Docker Compose
- Node.js (if running locally outside Docker)
- Python 3.10+ (for Unicord wrapper)
- Git

### Environment setup

Create a `.env` file in the appropriate directory:

```env
TZ=Europe/Paris

# Database
MYSQL_ROOT_PASSWORD=admin
MYSQL_DATABASE=unicord
MYSQL_HOST=database

# JWT
JWT_SECRET=123
JWT_EXPIRATION=6h

# NGINX
FRONTEND_DOMAIN=unicord.fr
BACKEND_DOMAIN=api.unicord.fr
EMAIL_ADMIN=admin@unicord.fr

# Grafana
GF_SECURITY_ADMIN_PASSWORD=admin
GF_AUTH_ANONYMOUS_ENABLED=true
GF_AUTH_ANONYMOUS_ORG_ROLE=Viewer
GF_USERS_ALLOW_SIGN_UP=false

# Content Moderation AI
GEMINI_API_KEY=
```

### Run the project

```bash
make
```

This will:

- Create required directories
- Setup default assets
- Start all services using Docker

### Stop the project

```bash
make down
```

### Start the project (after stopping)

```bash
make up
```

### Clean environment

```bash
make clean
```

## Team Information

### `ehode`

- **Roles:** Tech Lead, Backend Developer
- **Responsibilities:**

### `ncorrear`

- **Roles:** Tech Lead, Frontend Developer
- **Responsibilities:**

### `kzhen-cl`

- **Role(s):** Backend Developer
- **Responsibilities:**

### `drabarza`

- **Role(s):** DevOps
- **Responsibilities:**

### `pboucher`

- **Role(s):** Frontend Developer
- **Responsibilities:**

## Project Management

### Organization

- Task distribution across team members
- Regular meetings and progress tracking

### Tools

- GitHub Issues/Pull request

### Communication

- Discord

## Technical Stack

### Frontend

- React
- TailwindCSS

### Backend

- NestJS

### Database

- MariaDB
- ORM used: TypeORM

### Other Technologies

- WebSockets (real-time features)
- Prometheus & Grafana (monitoring)
- Docker (containerization)

### Technical Choices Justification

Explain:

- Why this stack was chosen
- Scalability / performance considerations
- Developer experience

## Database Schema

### Overview

| table    | description               |
| -------- | ------------------------- |
| users    | contains user information |
| friends  | contains users relation   |
| messages | contains users message    |

![database schema](/images/database_schema.jpg)

### Relationships

- User ↔ Friends (one-to-many)
- User ↔ Messages (one-to-many)

## Features List

| Feature              | Description                             | Contributor(s)                    |
| -------------------- | --------------------------------------- | --------------------------------- |
| Authentication       | User login/register system              | `ehode` / `ncorrear` / `kzhen-cl` |
| Chat                 | Real-time messaging                     | `ehode` / `ncorrear` / `kzhen-cl` |
| Friends              | Add/remove users                        | `ehode` / `ncorrear`              |
| API                  | Public REST API                         | `ehode`                           |
| Upload               | File management system                  | `ehode` / `ncorrear`              |
| Grafana & Prometheus | Monitoring / Metrics                    | `drabarza`                        |
| Responsive           | Make the site working on smaller device | `pboucher`                        |

## Modules

### Major Modules (2 pts each)

#### Frameworks (Frontend + Backend)

- React + Backend framework
- Justification: modern, scalable architecture

#### Real-time Features

- WebSockets implementation
- Handles live updates and connections

#### User Interaction System

- Chat, profiles, friends

#### Public API

- Secured with API key
- Includes CRUD endpoints

#### Authentication System

- Profile management, avatars, friends

#### Monitoring System

- Prometheus + Grafana dashboards

### Minor Modules (1 pt each)

- ORM integration
- Notification system
- Design system (10+ reusable components)
- Advanced search
- File upload system
- Multi-browser support
- Voice integration

## Module of Choice

### Major: Python API Wrapper - **Unicord**

We developed a custom Python wrapper for our API.

### Why we chose this module

- Simplifies API usage for developers
- Enables automation and scripting
- Adds ecosystem value beyond the web app

### Technical Challenges

- Designing a clean and intuitive API
- Handling authentication (API key)
- Managing HTTP requests and responses
- Supporting proxies

### Value Added

- Makes the API easily usable in Python projects
- Encourages external integrations

### Why it deserves Major status

- Fully-featured client library
- Covers multiple endpoints (users, messages, friends)
- Includes advanced features like proxy support

### Unicord Example

```python
import unicord

client = unicord.Client(api_key="your_api_key")

friends = client.get_friends()
for friend in friends:
    client.send_message(friend.id_, "Hello, World!")
```

## Individual Contributions

### `ehode`

- Features:
- Modules:
  - **Major:** Use a framework for both the frontend and backend.
  - **Major:** Implement real-time features using WebSockets or similar technology.
  - **Major:** Allow users to interact with other users.
  - **Major:** A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints.
  - **Major:** Standard user management and authentication.
  - **Minor:** Use an ORM for the database.
  - **Minor:** Implement advanced search functionality with filters, sorting, and pagination.
  - **Minor:** File upload and management system.
  - **Major:** Monitoring system with Prometheus and Grafana.

- Challenges:

### `ncorrear`

- Features:
- Modules:
  - **Major:** Use a framework for both the frontend and backend.
  - **Major:** Implement real-time features using WebSockets or similar technology.
  - **Major:** Allow users to interact with other users.
  - **Major:** Standard user management and authentication.
  - **Minor:** A complete notification system for all creation, update, and deletion actions.
  - **Minor:** Custom-made design system with reusable components, including a propercolor palette, typography, and icons (minimum: 10 reusable components).
  - **Minor:** Implement advanced search functionality with filters, sorting, and pagination.
  - **Minor:** File upload and management system.
  - **Minor:** Support for additional browsers.
  - **Minor:** Voice/speech integration for accessibility or interaction.
- Challenges:

### `kzhen-cl`

- Features:
  - **Mandatory:** Has lead the art direction.
  - **Mandatory:** Has generated the Terms of Service and Privacy Policy texts.
- Modules:
  - **Major:** Use a framework for both the frontend and backend.
  - **Major:** Implement real-time features using WebSockets or similar technology.
  - **Major:** A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints.
  - **Major:** Standard user management and authentication.
- Challenges:

### `drabarza`

- Features:
- Modules:
  - **Major:** Monitoring system with Prometheus and Grafana.
- Challenges:

### `pboucher`

- Features:
- Modules:
  - **Major:** Use a framework for both the frontend and backend.
- Challenges:

## Resources

### Documentation

- Official docs of used frameworks
- WebSocket documentation
- Docker documentation

### Tutorials / Articles

- // TODO

### AI Usage

AI tools were used for:

- Documentation writing

## ⚠️ Known Limitations

// TODO
