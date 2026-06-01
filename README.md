# 🌉 WeighBridge v2.0

A modern, full-stack application for weighbridge management and monitoring, built with **Java backend** and **JavaScript frontend** technologies.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building](#building)
- [Running](#running)
- [Development](#development)
- [Dependency Management](#dependency-management)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

WeighBridge v2.0 is a comprehensive solution for managing and monitoring weighbridge operations. This hybrid application combines the robustness of **Java** for backend operations with the flexibility of **JavaScript** for frontend interfaces, providing a seamless user experience for weighbridge management.

---

## ✨ Features

- 🔐 Secure user authentication and authorization
- 📊 Real-time weight monitoring and data visualization
- 📈 Comprehensive reporting and analytics
- 🔄 Seamless frontend-backend integration
- ⚡ High-performance data processing
- 🎨 Intuitive and responsive user interface
- 🛡️ Enterprise-grade security

---

## 🛠️ Tech Stack

**Backend:**
- Java with Maven
- Spring Framework (inferred from build configuration)

**Frontend:**
- JavaScript/Node.js (70.7% of codebase)
- React or similar framework

**Build Tools:**
- Maven for Java dependency management
- npm for JavaScript package management

**Languages Composition:**
- JavaScript: 70.7%
- Java: 27.7%
- Other: 1.6%

---

## 📁 Project Structure

```
weighbridge-v2.0/
├── src/                      # Source code
├── target/                   # Build output
├── pom.xml                   # Maven configuration
├── package.json              # npm configuration
├── README.md                 # This file
└── [other configuration files]
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)** - Version 8 or higher
- **Maven** - Version 3.6 or higher
- **Node.js** - Latest LTS version
- **npm** - Version 6 or higher

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Moleesh/weighbridge-v2.0.git
cd weighbridge-v2.0
```

### Step 2: Set Environment Variables

```bash
set NODE_SKIP_PLATFORM_CHECK=1
```

### Step 3: Install Dependencies

```bash
mvn clean
mvn install
```

---

## 🔨 Building

### Full Build

```bash
# Clean previous builds
mvn clean

# Set environment variable (Windows)
set NODE_SKIP_PLATFORM_CHECK=1

# Install all dependencies
mvn install

# Validate the build
mvn validate -DskipValidate=validate
```

---

## ▶️ Running

### Start the Application

```bash
java -jar target/WeighBridge.jar
```

The application will start and be accessible based on your configuration.

---

## 👨‍💻 Development

### Git Configuration

Configure git filters for managing environment-specific code:

```bash
git config filter.app_jsx.clean "sed 's/^const INITIAL_URL.*/const INITIAL_URL = \"\";/g'"
git config filter.app_jsx.smudge cat
```

### Development Workflow

1. Create a feature branch from `master`
2. Make your changes
3. Test thoroughly
4. Submit a pull request
5. Await code review and merge

---

## 📦 Dependency Management

### Update Maven Dependencies

Check for and apply the latest Maven dependency updates:

```bash
# Display available dependency updates
mvn versions:display-dependency-updates

# Use latest releases for all dependencies
mvn versions:use-latest-releases

# Update properties to latest versions
mvn versions:update-properties
```

### Update npm Packages

Keep your JavaScript dependencies current:

```bash
# Install npm-check-updates tool globally
npm install -g npm-check-updates

# Check for available updates
ncu

# Update all packages
ncu -u

# Install updates with increased memory allocation
npm update --max-old-space-size=8192
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is currently unlicensed. Please see the repository for licensing information.

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on the [GitHub Issues](https://github.com/Moleesh/weighbridge-v2.0/issues) page.

---

## 📊 Repository Information

- **Created:** February 10, 2019
- **Last Updated:** June 3, 2025
- **Main Language:** JavaScript (70.7%)
- **Repository Size:** ~27.8 MB
- **Open Issues:** 3

---

**Happy weighing! 🎯**
