# Easy Generator Task


### Frontend

- **React Query**: For data fetching and state management.
- **Zod Validation**: For schema-based form validation.
- **React Hook Form**: For form handling and validation.
- **ESLint and Prettier**: For code quality and formatting.
- **TailwindCSS**: For utility-first CSS framework.

Missing: Unit testing 

### Backend

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Mongoose ORM**: For MongoDB database management.

Missing: Unit testing 

## Getting Started
### 1. Clone the Repository

```bash
git clone https://github.com/SHUJAAT-DEV/easygenerator-task.git
cd easygenerator-task

### 2. Build and Run the Application with Docker Compose

```bash
docker-compose up --build
```

### 3. Access the Application

Once the Docker containers are up and running, you can access the services as follows:

- **Frontend**:  
  Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Backend API**:  
  Access the backend API at [http://localhost:3001/api/v1](http://localhost:3001/api/v1).

- **MongoDB**:  
  MongoDB will be running at `mongodb://localhost:27017`. You can connect using a MongoDB client such as [MongoDB Compass](https://www.mongodb.com/products/compass).

### 4. Stop the Docker Containers

To stop the running Docker containers, run the following command:

```bash
docker-compose down
```

## Notes
- Due to the short of time I haven't complete the unit test part .