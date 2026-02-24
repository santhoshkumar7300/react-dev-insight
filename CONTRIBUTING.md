# Contributing to React Dev Overlay

First off, thank you for considering contributing to `react-dev-insight`! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## Code of Conduct

By participating in this project, you are expected to uphold a welcoming, inclusive, and respectful environment for everyone.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm

### Local Development Setup

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/santhoshkumar7300/react-dev-insight.git
   cd react-dev-insight
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development watcher**:
   ```bash
   npm run dev
   ```
   This will use `tsup` in watch mode to continuously build the package into the `dist/` directory as you make changes to `src/`.

### Running the Example App

To test your changes, you can use the provided `example` application:

1. Open a new terminal tab and navigate to the `example` directory:
   ```bash
   cd example
   ```
2. Install the example app dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
4. The example app will be running at `http://localhost:5173/` and will automatically reflect changes you make to the core library!

## Pull Request Process

1. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/bug-name
   ```
2. **Make your changes**. Ensure your code is formatted properly and follows the existing style. Include JSDoc comments for any new exported APIs.
   - _Note: We prioritize zero production overhead. Ensure any new logic is safely gated behind `process.env.NODE_ENV !== "development"` if it impacts runtime performance._
3. If applicable, **update the documentation** (README.md, etc.) to reflect your changes.
4. **Commit your changes**. Use descriptive, conventional commit messages.
   ```bash
   git commit -m "feat: add amazing new feature"
   ```
5. **Push your branch** to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```
6. **Open a Pull Request** against the `main` branch of the `react-dev-insight` repository. Provide a clear description of the problem solved or the feature added.

## Reporting Bugs

If you find a bug, please create a GitHub issue containing:

- A clear and descriptive title.
- A detailed description of the problem.
- Steps to reproduce the issue.
- The version of React and `react-dev-insight` you are using.
- Any relevant logs, screenshots, or code snippets.

## Suggesting Enhancements

If you have an idea for a new feature or improvement, feel free to open an issue describing your suggestion. We appreciate all ideas!

## License

By contributing to `react-dev-insight`, you agree that your contributions will be licensed under its MIT License.
