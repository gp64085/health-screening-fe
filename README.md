<div align="center">
  <img src="https://via.placeholder.com/600x120?text=Health+Screening+App" alt="Health Screening App Logo"/>
  
  <h1>🩺 Health Screening App 🩺</h1>
  <p>QR-based health screening for safe public entry</p>
  
  <p>
    <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status"/>
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
    <img src="https://img.shields.io/badge/made%20with-Angular-red" alt="Angular"/>
    <img src="https://img.shields.io/badge/package%20manager-pnpm-yellow" alt="pnpm"/>
  </p>
</div>

---

## ✨ Overview

**Health Screening App** is a modern, QR-based health screening solution designed to check the health of users at the entry of any public place. Users simply scan a QR code and answer a quick quiz to determine their health status before entry. Perfect for offices, events, malls, and more!

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
$ git clone <repository-url>
$ cd health-screening-fe

# 2. Install dependencies (requires pnpm)
$ pnpm install

# 3. Start the development server
$ pnpm run start

# 4. Open your browser and visit
http://localhost:4200/
```

> ⚡ **Tip:** Make sure you have [pnpm](https://pnpm.io/) installed. If not, run `npm install -g pnpm`.

---

## 🛠️ Features

- 📱 **QR code scanning** for fast user identification
- 📝 **Simple health quiz** for screening
- ⚡ **Real-time health status** evaluation
- 🖥️ **User-friendly interface** for public entry points
- 🚀 **Fast & responsive** (built with Angular)

---

## 📸 Example Usage

<div align="center">
  <img src="https://via.placeholder.com/400x250?text=Scan+QR+Code+Screen" alt="Scan QR Code Example" width="400"/>
  <img src="https://via.placeholder.com/400x250?text=Health+Quiz+Screen" alt="Health Quiz Example" width="400"/>
</div>

---

## 📦 Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Angular CLI](https://angular.io/cli)
- [pnpm](https://pnpm.io/) (used as the package manager for this project)

#### pnpm Installation
If you do not have pnpm installed, you can install it globally:
```bash
npm install -g pnpm
```

> ℹ️ **Note:** This project uses pnpm for faster, more efficient dependency management. All commands in this README assume pnpm is installed.

---

## 🧑‍💻 Usage
1. At the entry point, users scan the provided QR code using the application.
2. The app presents a short health quiz.
3. Users answer the quiz questions.
4. Based on the answers, the app determines if the user is eligible to enter.

---

## 🏗️ Building for Production
To build the project for production:
```bash
pnpm run build
```
The build artifacts will be stored in the `dist/` directory.

---

## 🧪 Running Tests
- Unit tests: `pnpm run test`
- End-to-end tests: `pnpm run e2e` (requires additional setup)

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License
This project is licensed under the MIT License.
