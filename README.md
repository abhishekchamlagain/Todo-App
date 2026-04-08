# Todo App - MERN Stack

A full-stack todo application built with MongoDB, Express, React, and Node.js.

## Features

- ✅ Create, read, update, and delete tasks
- 📋 Separate views for ongoing and completed tasks
- ☑️ Toggle tasks between ongoing and completed with checkboxes
- 🎨 Clean and responsive UI with Tailwind CSS
- 🔄 Real-time updates with React state management

## Project Structure

```
Todo-app/
├── backend/                 # Node.js & Express server
│   ├── server.js           # Main server file
│   ├── database/           # Database configuration
│   ├── modules/            # Data models (Todo, User)
│   ├── controller/         # Route controllers
│   ├── routes/             # API routes
│   └── package.json
│
├── frontend/               # React Vite application
│   ├── src/
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # React entry point
│   │   └── components/     # React components
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── deploy-to-github.js     # GitHub deployment script (not committed)
```

## Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Deploying to GitHub

### Step 1: Run the Deployment Script
The `deploy-to-github.js` script will:
- Commit each file individually with professional commit messages
- Not include itself in the commits (automatically added to .gitignore)

```bash
node deploy-to-github.js
```

### Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Create a new repository
3. Copy the repository URL

### Step 3: Connect and Push
```bash
git remote add origin <your-github-url>
git branch -M main
git push -u origin main
```

## Commit Message Convention

The script uses professional commit messages following this convention:
- `feat:` - New features
- `fix:` - Bug fixes
- `style:` - Styling and configuration
- `build:` - Package and build configurations
- `docs:` - Documentation
- `chore:` - Maintenance tasks

## Environment Variables

Create `.env` files in both backend and frontend directories:

**Backend .env:**
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

**Frontend .env:**
```
VITE_API_URL=http://localhost:5000
```

## Technologies Used

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Vite, Tailwind CSS
- **Tools:** Git, GitHub

## License

This project is open source and available under the MIT License.

## Author

Made with ❤️ by Abhishek Chamlagain
