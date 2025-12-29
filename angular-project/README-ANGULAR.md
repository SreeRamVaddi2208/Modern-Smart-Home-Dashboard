# Smart Home IoT Data Explorer - Angular Version

## 📋 Project Summary

**A modern Angular 16+ application for exploring and preparing smart home IoT sensor data, featuring component-based architecture, reactive programming, and comprehensive testing.**

---

## 🎯 Angular-Specific Features

### Architecture
- ✅ **Standalone Components** - Modern Angular architecture without NgModules
- ✅ **Dependency Injection** - Services injected throughout the application
- ✅ **Reactive Programming** - RxJS for asynchronous operations
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **Component-Based** - Reusable, maintainable components

### Key Technologies
- **Angular 16+** - Latest Angular framework
- **TypeScript 5.1** - Type-safe development
- **RxJS** - Reactive programming
- **Chart.js** - Data visualization
- **Bootstrap 5** - UI framework
- **Jasmine/Karma** - Unit testing
- **Protractor** - E2E testing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Angular CLI 16.x

### Installation

1. **Install Angular CLI globally:**
```bash
npm install -g @angular/cli@16
```

2. **Navigate to Angular project:**
```bash
cd angular-project
```

3. **Install dependencies:**
```bash
npm install
```

4. **Start development server:**
```bash
npm start
# or
ng serve
```

5. **Open browser:**
Navigate to `http://localhost:4200`

---

## 📁 Project Structure

```
angular-project/
├── src/
│   ├── app/
│   │   ├── core/                    # Core services and utilities
│   │   │   └── services/
│   │   │       ├── data-generation.service.ts
│   │   │       └── data-processing.service.ts
│   │   ├── features/                # Feature modules
│   │   │   ├── home/
│   │   │   ├── exploration/
│   │   │   └── dashboard/
│   │   ├── shared/                  # Shared components
│   │   │   └── components/
│   │   │       └── stat-card/
│   │   ├── models/                  # TypeScript interfaces
│   │   │   └── sensor-data.model.ts
│   │   ├── app.component.ts         # Root component
│   │   ├── app.routes.ts            # Routing configuration
│   │   └── app.config.ts            # App configuration
│   ├── environments/                # Environment configs
│   ├── assets/                      # Static assets
│   ├── styles.scss                  # Global styles
│   ├── index.html                   # Entry HTML
│   └── main.ts                      # Bootstrap file
├── e2e/                             # E2E tests
├── .github/workflows/               # CI/CD pipeline
├── angular.json                     # Angular CLI config
├── package.json                     # Dependencies
└── tsconfig.json                    # TypeScript config
```

---

## 🧩 Key Components

### Services

#### DataGenerationService
- Generates simulated smart home sensor data
- Implements realistic data patterns
- Introduces data quality issues (missing values, duplicates)

#### DataProcessingService
- Handles data exploration operations
- Performs data preparation (cleaning, feature extraction)
- Generates insights and chart data

### Components

#### HomeComponent
- Project overview and introduction
- Navigation to other features

#### ExplorationComponent
- Displays raw sensor data
- Shows data quality metrics
- Displays summary statistics

#### DashboardComponent
- Visualizes cleaned data
- Interactive charts using Chart.js
- Displays insights and patterns

---

## 🧪 Testing

### Unit Tests
```bash
npm run test
# or
ng test
```

### E2E Tests
```bash
npm run e2e
# or
ng e2e
```

### Code Coverage
```bash
ng test --code-coverage
```

---

## 🏗️ Build & Deployment

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

### Build Output
The build artifacts will be stored in the `dist/` directory.

---

## 🔧 Development

### Generate Component
```bash
ng generate component components/my-component
```

### Generate Service
```bash
ng generate service services/my-service
```

### Run Linter
```bash
npm run lint
```

---

## 📊 Features Implemented

### ✅ Angular Best Practices
- Standalone components (no NgModules)
- Dependency injection
- TypeScript strict mode
- Reactive forms ready
- Route guards ready

### ✅ Code Organization
- Feature-based structure
- Shared component library
- Core services separation
- Type-safe models

### ✅ Testing
- Unit tests for services
- Component test structure
- E2E test configuration
- Code coverage setup

### ✅ Build & Deployment
- Production optimizations
- Environment configurations
- CI/CD pipeline (GitHub Actions)

---

## 🎓 Learning Outcomes

This Angular implementation demonstrates:

1. **Component Architecture** - Reusable, maintainable components
2. **Dependency Injection** - Service-based architecture
3. **TypeScript** - Type-safe development
4. **Reactive Programming** - RxJS patterns
5. **Testing** - Unit and E2E testing
6. **Build Optimization** - Production-ready builds

---

## 📝 Comparison: Flask vs Angular

| Aspect | Flask (Original) | Angular (New) |
|--------|------------------|---------------|
| **Architecture** | Server-side rendering | Client-side SPA |
| **Language** | Python | TypeScript |
| **Components** | Templates | Standalone components |
| **State Management** | Server state | Client state |
| **Testing** | Manual | Automated (Jasmine/Karma) |
| **Performance** | Server-dependent | Client-optimized |

---

## 🚀 Advantages of Angular Version

1. **Better Code Organization** - Clear separation of concerns
2. **Type Safety** - TypeScript prevents runtime errors
3. **Component Reusability** - Shared components across features
4. **Performance** - Client-side rendering, lazy loading
5. **Testing** - Comprehensive test coverage
6. **Developer Experience** - Angular CLI, hot reload, debugging tools
7. **Maintainability** - Clear structure, easy to extend

---

## 📚 Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)
- [Chart.js Documentation](https://www.chartjs.org/)

---

## 🤝 Contributing

1. Follow Angular style guide
2. Write tests for new features
3. Ensure TypeScript strict mode compliance
4. Update documentation

---

**Built with Angular 16+ and TypeScript** 🚀

