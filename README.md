
# Whiteboard App

This is a real-time collaborative whiteboard application where users can join rooms and draw together. The app uses **Next.js**, **Prisma**, **TailwindCSS**, and **WebSockets** to enable the functionality.

## Features
- **Real-time collaboration**: Users can join rooms and draw simultaneously.
- **Authentication**: Secure user authentication using **NextAuth**.
- **Prisma ORM**: For managing database interactions.
- **Responsive design**: Built using **TailwindCSS** for styling.

## Project Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v18.x.x or later)
- **npm** (v9.x.x or later) or **yarn**
- **PostgreSQL** (For the database)

### Cloning the Repository

Clone the GitHub repository to your local machine using the following command:

```bash
git clone https://github.com/BiswayanPaul/whiteboard-app.git
```
### Install Dependencies
Navigate into the project directory and install the necessary dependencies:
```bash
cd whiteboard-app
npm install
```

### Set Up Environment Variables
Create a .env file in the root of the project. You'll need to provide the following variables:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

Replace USER, PASSWORD, HOST, PORT, and DATABASE with your actual PostgreSQL credentials.
You can generate a random NEXTAUTH_SECRET using a command like openssl rand -base64 32.


###Prisma Setup
Generate the Prisma client and apply migrations to the database:

```bash
npx prisma generate
npx prisma migrate dev
```


# WebSocket Server (TypeScript)

This is a WebSocket server built using **Node.js**, **TypeScript**, **Express**, and **ws**. It leverages TypeScript for type safety and scalability.

## Project Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18.x.x or later)
- **npm** (v9.x.x or later)

### Cloning the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/websocket-server.git
```

### Install Dependencies
Navigate to the project directory and install the required dependencies:

```bash
cd websocket-server
npm install
```

### TypeScript Configuration
The project uses a tsconfig.json file to define compiler options. Key configurations include:

- Target: ES2016
- Module: commonjs
- Root Directory: ./src
- Output Directory: ./dist
- Strict Mode: enabled for type-checking.
For more details, you can explore the tsconfig.json file.

### Running the Server
Compile the TypeScript files: TypeScript files need to be compiled before running the server.

```bash
npx tsc -b
```

### Start the Server: After compiling, start the server using Node.js.

```bash
node dist/index.js
```

### Running the Application
Once everything is set up, you can start the development server:

```bash
npm run dev
```
