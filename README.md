# Simple To Do Using PERN Stack

## Tech Stack
1. PostgreSQL
2. Express.js
3. React.js
4. Node.js

## Database
1. PostgresSQL (Sequelize)

## API Testing
1. Postman

## Hosting
1. Frontend - Vercel
2. Backend - Vercel
3. Database - Supabase

Live Demo: [View](https://pern-todo-app-client-kt8xcb4qz-thakshakas-projects.vercel.app/)

## Deploy locally

1. Make sure to update config.json with your credentials
   ```
   .\server\db\sequelize\config\
   ```
   
2. Create postgres database with the provided database name in config.json
   ```
   "database": "perntodo"
   ```

4. Client side
  ```
  cd .\client\
  npm i
  ```

3. Server side
  ```
  cd .\server\
  npm i
  cd .\db\sequelize
  npx sequelize-cli db:migrate
  cd ../../
  nodemon index.js
  ```
