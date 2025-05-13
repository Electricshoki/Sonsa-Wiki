# Wiki Platform for Club Knowledge Sharing

This project is a structured wiki system developed to support knowledge management within a student organization.

The backend is implemented using Django REST Framework, and the frontend is built with React.  
User authentication and access control are modeled using a deterministic finite automaton (DFA), enabling a clearly defined and verifiable state transition system for actions such as login, registration, and email verification.

The system is designed to be modular and maintainable, with deployment support via Docker.

## Tech Stack

- Frontend: React, React Router, Axios, Tailwind CSS
- Backend: Django, Django REST Framework
- Authentication Flow: DFA-based state transition model
- Deployment: Docker, batch scripts for local development

## Features (Planned and Implemented)

- User authentication and role-based access control
- Document creation and editing (Markdown support)
- Version history and document tracking (planned)
- Administrative interface for content management (planned)

This project originated from an internal need to maintain long-term, shareable technical documentation within the club.
