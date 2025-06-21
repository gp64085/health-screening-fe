# Health Screening App

A QR-based health screening application designed to check the health of users at the entry of any public place. Users scan a QR code and answer a simple quiz to determine their health status before entry.

## Features
- QR code scanning for quick user identification
- Simple health quiz for screening
- Real-time health status evaluation
- User-friendly interface for public entry points
- Built with Angular for fast and responsive performance

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Angular CLI](https://angular.io/cli)
- [pnpm](https://pnpm.io/) (used as the package manager for this project)

#### pnpm Installation
If you do not have pnpm installed, you can install it globally using npm:
```bash
npm install -g pnpm
```

This project uses pnpm for faster, more efficient dependency management. All commands in this README assume pnpm is installed.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd health-screening-fe
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Application
Start the development server:
```bash
pnpm run start
```
Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any source files.

## Usage
1. At the entry point, users scan the provided QR code using the application.
2. The app presents a short health quiz.
3. Users answer the quiz questions.
4. Based on the answers, the app determines if the user is eligible to enter.

## Building for Production
To build the project for production:
```bash
pnpm run build
```
The build artifacts will be stored in the `dist/` directory.

## Running Tests
- Unit tests: `pnpm run test`
- End-to-end tests: `pnpm run e2e` (requires additional setup)

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.
