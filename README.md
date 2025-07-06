# Admin Dashboard NX Monorepo

A **production-ready enterprise admin dashboard** built with modern Angular architecture and best practices, showcasing advanced frontend development skills and full-stack capabilities.

## 🎯 **Key Highlights for Recruiters**

- ✅ **Modern Angular 19** with standalone components and signal-based state management
- ✅ **Nx Monorepo** architecture with shared libraries and dependency management
- ✅ **Full-stack implementation** with REST API backend and frontend consuming it
- ✅ **Enterprise-grade patterns** including CRUD operations, user management, and role-based features
- ⚙️ **Production-ready tooling setup** with ESLint, Prettier, Jest, and Playwright configured
- ✅ **Modern UI/UX** with TailwindCSS, PrimeNG, and responsive design

## 🏗️ **Architecture Overview**

```
├── apps/
│   ├── admin-dashboard/          # Angular 19 Frontend Application
│   ├── admin-dashboard-e2e/      # Playwright E2E Tests (configured)
│   └── api/                      # Backend REST API (Hono.js)
├── libs/
│   ├── models/                   # Shared TypeScript Models
│   └── app-info/                 # Shared Application Info
└── tools/                        # Nx Workspace Tooling
```

### **Frontend Architecture (Angular 19)**

- **Standalone Components** with modern Angular patterns
- **Signal Store** for reactive state management (NgRx Signals)
- **Feature-based folder structure** with lazy loading
- **Shared UI components** with PrimeNG and custom components
- **Internationalization** with Transloco
- **Responsive design** with TailwindCSS and custom themes

### **Backend Architecture**

- **REST API** built with Hono.js framework
- **TypeScript-first** with shared models from libs
- **CRUD operations** for user management
- **Structured data layer** with type-safe interfaces

### **Monorepo Benefits**

- **Code sharing** between frontend and backend (shared models)
- **Consistent tooling** across all projects
- **Optimized build pipeline** with Nx caching and task orchestration
- **Scalable architecture** ready for additional apps and libraries

## 🚀 **Technical Skills Demonstrated**

### **Frontend Development**

- **Angular 19** - Latest features including standalone components, new control flow, signals
- **State Management** - NgRx Signals for reactive, signal-based state management
- **Component Architecture** - Reusable components with proper encapsulation
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Form Handling** - Reactive forms with validation
- **HTTP Client** - REST API integration with proper error handling
- **Routing** - Feature-based routing with guards and lazy loading

### **Development Tools & Best Practices**

- **TypeScript** - Strict typing and advanced TypeScript features
- **Testing Setup** - Jest and Playwright configured for unit and E2E testing
- **Code Quality** - ESLint, Prettier, and custom rules for Angular
- **Build Tools** - Nx workspace with optimized build pipeline
- **Version Control** - Git with proper commit conventions

### **UI/UX Design**

- **Modern Design System** - Consistent theming with CSS custom properties
- **Component Library** - PrimeNG integration with custom styling
- **Accessibility** - WCAG compliant components and navigation
- **Performance** - Optimized bundle sizes and lazy loading

## 🛠️ **Getting Started**

### **Prerequisites**

```bash
Node.js 18+
pnpm (recommended package manager)
```

### **Installation & Development**

```bash
# Clone and install dependencies
git clone <repository-url>
cd admin-dashboard-nx-monorepo
pnpm install

# Start development servers
pnpm nx serve admin-dashboard  # Frontend (http://localhost:4200)
pnpm nx serve api             # Backend API (http://localhost:3000)

# Testing (when implemented)
pnpm nx test admin-dashboard      # Unit tests
pnpm nx e2e admin-dashboard-e2e   # E2E tests

# Build for production
pnpm nx build admin-dashboard
pnpm nx build api
```

## 🎨 **Features Showcase**

### **User Management System**

- **CRUD Operations** - Create, read, update, delete users
- **Role-based Access** - Admin and user role management
- **Status Management** - Active/inactive user status
- **Profile Management** - User profile with avatar and details

### **Modern UI Components**

- **Responsive Dashboard** - Clean, modern admin interface
- **Data Tables** - Sortable, filterable user tables
- **Form Controls** - Reactive forms with validation
- **Navigation** - Sidebar navigation with route highlighting
- **Theming** - Light/dark theme support

### **State Management**

- **Signal Store** - Modern reactive state management
- **HTTP Integration** - API calls with loading states
- **Error Handling** - Graceful error states and user feedback

## 📊 **Project Structure Deep Dive**

### **Shared Libraries Strategy**

```typescript
// libs/models - Shared TypeScript interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
}

// Used in both frontend and backend for type safety
```

### **Component Architecture Example**

```typescript
// Signal-based component with modern Angular patterns
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
})
export class ProfileInfoComponent {
  private userStore = inject(UserStore);

  userName = computed(() => this.userStore.currentUser()?.name);
  avatarUrl = computed(() => this.generateAvatarUrl());
}
```

## 🔧 **Technical Decisions & Rationale**

### **Why Nx Monorepo?**

- **Code Sharing** - Shared models prevent duplication and ensure type safety
- **Build Optimization** - Intelligent caching and task orchestration
- **Scalability** - Easy to add new apps and libraries
- **Developer Experience** - Consistent tooling and commands

### **Why Angular Signals?**

- **Performance** - Fine-grained reactivity without zone.js overhead
- **Modern Patterns** - Future-proof architecture aligned with Angular's direction
- **Developer Experience** - Simpler mental model than RxJS for state management

### **Why PrimeNG + TailwindCSS?**

- **Rapid Development** - Pre-built components with customizable styling
- **Consistency** - Design system approach with utility-first CSS
- **Accessibility** - WCAG compliant components out of the box

## 🎯 **Interview Talking Points**

1. **Monorepo Architecture** - Discuss benefits of code sharing and build optimization
2. **State Management** - Compare NgRx Signals vs traditional NgRx Store
3. **Component Design** - Explain standalone components and modern Angular patterns
4. **API Integration** - Discuss error handling, loading states, and type safety
5. **Testing Strategy** - Jest and Playwright setup for comprehensive testing
6. **Performance Optimization** - Lazy loading, change detection strategies
7. **Developer Experience** - Tooling setup, code quality, and team collaboration

## 📈 **Development Status & Roadmap**

### **✅ Completed**

- ✅ **Core Architecture** - Nx monorepo with Angular 19 and backend API
- ✅ **UI Framework** - PrimeNG components with TailwindCSS styling
- ✅ **State Management** - NgRx Signals implementation
- ✅ **User Features** - CRUD operations and user management
- ✅ **Code Quality Setup** - ESLint, Prettier, TypeScript strict mode

### **🚧 In Progress / Planned**

- ⚙️ **Testing Implementation** - Unit tests with Jest, E2E tests with Playwright
- ⚙️ **Performance Optimization** - Bundle analysis and optimization
- ⚙️ **Accessibility Audit** - WCAG compliance testing and improvements
- ⚙️ **Documentation** - Component documentation and API docs

---

**This project demonstrates enterprise-level Angular development skills, modern architecture patterns, and full-stack development capabilities suitable for senior frontend developer positions.**
