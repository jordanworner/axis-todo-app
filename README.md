# Axis Todo App

## How to run

### Using Docker Compose

`docker-compose up`

### Without Docker / Docker Compose

Dependencies
- Node.js 16+

#### Backend Service

From the project root go to the backend directory

`cd backend`

In another terminal session start an in Memory MongoDB instance

`npm run dev:database`

Build and start the backend service

`npm run start build && npm start`

#### Frontend Service

From the project root go to the frontend directory

`cd frontend`

Build the service

`npm run build`

Start the frontend service

`npm run preview`

Go to http://localhost:8080 to view the app
