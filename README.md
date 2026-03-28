_This project has been created as part of the 42 curriculum by ehode, ncorrear, kzhen-cl, drabarza, pboucher._

# Unicord

![illustration](/images/illustration.png)

## Description

**Unicord** is a full-stack web application focused on real-time interactions between users.
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
  - Design and maintain backend architecture (APIs, services, databases)
  - Define coding standards and review backend pull requests
  - Ensure performance, scalability, and security of backend services
  - Manage backend releases and coordinate with DevOps
  - Mentor and support backend developers

### `ncorrear`

- **Roles:** Tech Lead, Frontend Developer
- **Responsibilities:**
  - Design frontend architecture (state management, project structure)
  - Establish best practices (linting, testing, performance)
  - Review frontend pull requests and ensure code quality
  - Optimize user experience and client-side performance
  - Coordinate with backend team on API contracts

### `kzhen-cl`

- **Role(s):** Backend Developer
- **Responsibilities:**
  - Develop and maintain API endpoints
  - Debug and resolve backend issues
  - Collaborate with frontend developers for feature integration

### `drabarza`

- **Role(s):** DevOps
- **Responsibilities:**
  - Set up and manage infrastructure (Docker, Grafana, Prometheus)

### `pboucher`

- **Role(s):** Frontend Developer
- **Responsibilities:**
  - Develop user interfaces (React, UI components)
  - Ensure responsive design and accessibility
  - Fix bugs and improve user experience
  - Contribute to frontend testing

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

| table    | description                             |
| -------- | --------------------------------------- |
| users    | Stores user account information         |
| friends  | Stores relationships between users      |
| messages | Stores messages exchanged between users |

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

#### Use a framework for both the frontend and backend.

- Use a frontend framework (React, Vue, Angular, Svelte, etc.).
- Use a backend framework (Express, NestJS, Django, Flask, Ruby on Rails,
  etc.).
- Full-stack frameworks (Next.js, Nuxt.js, SvelteKit) count as both if you use
  both their frontend and backend capabilities.

> **Frontend:** `React`, `Tailwind CSS`

> **Backend:** `NestJS`

#### Implement real-time features using WebSockets or similar technology.

- Real-time updates across clients.
- Handle connection/disconnection gracefully.
- Efficient message broadcasting.

> We use `Socket.IO` to enable reliable real-time communication.

#### Allow users to interact with other users.

- A basic chat system (send/receive messages between users).
- A profile system (view user information).
- A friends system (add/remove friends, see friends list).

> That's literally the aim of the project.

#### A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints.

- GET /api/{something}
- POST /api/{something}
- PUT /api/{something}
- DELETE /api/{something}

> To enable users to develop bots, self bots, automation solutions...

#### Major: Standard user management and authentication.

- Users can update their profile information.
- Users can upload an avatar (with a default avatar if none provided).
- Users can add other users as friends and see their online status.
- Users have a profile page displaying their information.

> For a better experience with friends

#### Monitoring system with Prometheus and Grafana.

- Set up Prometheus to collect metrics.
- Configure exporters and integrations.
- Create custom Grafana dashboards.
- Set up alerting rules.
- Secure access to Grafana.

> We need to collect key metrics to ensure the infrastructure runs smoothly

### Minor Modules (1 pt each)

- Use an ORM for the database.
- A complete notification system for all creation, update, and deletion actions.
- Custom-made design system with reusable components, including a proper color palette, typography, and icons (minimum: 10 reusable components).
- Implement advanced search functionality with filters, sorting, and pagination.
- File upload and management system.
- Support for additional browsers.
- Voice/speech integration for accessibility or interaction.
- Content moderation AI (auto moderation, auto deletion, auto warning, etc.)

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
    client.send_message(friend.user.id_, "Hello, World!")
```

## Individual Contributions

### `ehode`

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
  - **Minor:** Content moderation AI (auto moderation, auto deletion, auto warning, etc.)

- Challenges:
  - Developing in **TypeScript**...

### `ncorrear`

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

### `kzhen-cl`

- Features:
  - **Mandatory:** Has lead the art direction.
  - **Mandatory:** Has generated the Terms of Service and Privacy Policy texts.
- Modules:
  - **Major:** Use a framework for both the frontend and backend.
  - **Major:** Implement real-time features using WebSockets or similar technology.
  - **Major:** A public API to interact with the database with a secured API key, rate limiting, documentation, and at least 5 endpoints.
  - **Major:** Standard user management and authentication.

### `drabarza`

- Features:
  - **Mandatory:** Docker configuration
  - Nginx configuration
- Modules:
  - **Major:** Monitoring system with Prometheus and Grafana.

### `pboucher`

- Modules:
  - **Major:** Use a framework for both the frontend and backend.

## Resources

### Documentation

- Official docs of used frameworks
- WebSocket documentation
- Docker documentation

### Tutorials / Articles

- https://docs.nestjs.com/
- https://react.dev/reference/react
- https://tailwindcss.com/docs

### AI Usage

AI tools were used for:

- Documentation writing

## ⚠️ Known Limitations

- Content Moderator AI: Rate limit of Gemini API
