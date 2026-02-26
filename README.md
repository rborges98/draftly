# Draftly

> Draftly is a **monorepo-based collaborative platform** for real-time brainstorming and idea sharing.
> It provides an intuitive interface for teams to work together effectively.

## ✨ Features

- 🧠 Real-time collaboration
- ✍️ **Rich text editor** with shared state
- 👥 Multi-room support
- 🔄 WebSocket-based synchronization
- 📦 Monorepo architecture with shared packages

## 🛠 Tech Stack

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.dot.io&logoColor=white)

## 📂 Project Structure

```txt
apps/
  web/          # Next.js frontend
  server/       # Node.js + Socket.IO backend
packages/
  shared/       # Shared types and utilities
```

## 💻 Requirements

Before you begin, ensure you meet the following requirements:

- Node.js **v16+**
- npm
- MongoDB instance (local or cloud)

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/rborges98/draftly.git
cd draftly
```

### 2. Install dependencies

```sh
npm install
```

---

### 3. Environment variables

Draftly uses separate environment variables for frontend and backend.

#### Frontend (`apps/web/.env`)

```env
NEXT_PUBLIC_SOCKET_URI=localhost:8080
MONGODB_URI=mongodb://localhost:27017/draftly
```

#### Backend (`apps/server/.env`)

```env
MONGODB_URI=mongodb://localhost:27017/draftly
```

---

### 4. Run the project

```sh
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

---

## 📫 Contributing to Draftly

To contribute to Draftly, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 📝 License

This project is under license. See the [LICENSE](LICENSE.md) file for more details.
