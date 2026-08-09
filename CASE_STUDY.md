# DevTask — Case Study

## Problem
Managing development tasks and personal projects can become difficult when tasks are scattered across different places. DevTask was created to provide a single platform for managing tasks efficiently.

## Solution
DevTask is a full-stack task management application where users can register, login, and securely manage their tasks. Users can create, view, update, and delete their tasks through a responsive interface.

## Technology Choices
- **React + Vite** — Frontend development
- **Tailwind CSS** — Responsive and modern UI
- **Node.js + Express.js** — Backend REST API
- **MongoDB + Mongoose** — Persistent database
- **JWT + bcryptjs** — Authentication and password security
- **Axios** — Frontend-backend communication
- **Vitest + React Testing Library** — Automated testing

## Architecture
The application follows a client-server architecture:

React Frontend → Express/Node.js API → MongoDB

The frontend handles the UI, the backend manages authentication and CRUD operations, and MongoDB stores application data.

## Biggest Challenge
The biggest challenge was connecting authentication between the frontend and backend, especially handling JWT tokens, API requests, protected routes, and database authentication.

## How I Solved It
I debugged the application layer by layer by checking frontend requests, backend routes, database operations, token generation, and protected routes separately. This helped identify and fix integration issues efficiently.

## Outcome
DevTask gave me practical experience in building a complete full-stack application, including authentication, CRUD operations, database integration, validation, testing, responsive UI, and deployment.