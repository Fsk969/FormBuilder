# 🛠️ Low Code Form Builder (Node.js + Prisma + NeonDB)

A full-stack form builder where users can visually create forms and save structured data using a Postgres database. Built with Express.js, Prisma ORM, and Neon (serverless Postgres).

---

## 🚀 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/low-code-form-builder.git
cd low-code-form-builder
```


### 2. Install dependencies
```
# For Frontend
cd client/frontend
npm install


#For Backend 
cd Backend
npm install

```

### 3. Set up environment variables
Create a .env file in the root directory and add the following:

```
DATABASE_URL=""

```

### 🧬 Prisma Setup
Commands for syncing Prisma schema with your database:
```
# Generate the Prisma client
npx prisma generate

# Push schema to the database
npx prisma db push

# OR, if you prefer migrations:
npx prisma migrate dev --name init

```

### Run the backend server

```
cd Backend
npm run dev

```

### Run the Frontend server
```
cd client/frontend
npm run dev
```

