# Authentication App Frontend

A modern, scalable authentication frontend built with React, TypeScript, and Vite. This application integrates seamlessly with the Spring Boot backend authentication API.

## Features

✅ **Complete Authentication Flows**
- User registration with email verification
- Login with JWT token authentication
- Password reset via email
- Automatic token refresh
- Logout (single and all sessions)

✅ **Modern Architecture**
- Feature-based folder structure
- SOLID principles implementation
- Separation of concerns
- Type-safe with TypeScript
- Centralized error handling

✅ **User Management**
- View and edit user profile
- Account deletion
- Role-based access control ready

✅ **Developer Experience**
- Hot module replacement (HMR)
- ESLint configured
- TypeScript for type safety
- Modular and maintainable codebase

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Zustand** - State management
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **Radix UI** - UI components
- **Framer Motion** - Animations
- **React Hot Toast** - Notifications

## Project Structure

```
src/
├── features/              # Feature modules (auth, user)
│   ├── auth/
│   │   ├── api/          # API service layer
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Auth pages
│   │   └── store/        # State management
│   └── user/
│       ├── api/
│       ├── hooks/
│       └── store/
├── components/           # Shared components
│   ├── guards/          # Route protection
│   └── ui/              # UI components
├── lib/                 # Core libraries
│   ├── http/           # HTTP client & interceptors
│   └── utils/          # Utility functions
├── constants/          # App constants
├── types/             # TypeScript types
└── pages/             # Page components
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Spring Boot backend running (default: `http://localhost:8081`)

### Installation

1. **Clone the repository**
   ```bash
   cd Auth-App-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Copy `.env.example` to `.env` and configure:
   ```env
   VITE_API_BASE_URL=http://localhost:8081/api/v1
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## API Integration

This frontend integrates with the following Spring Boot backend endpoints:

### Authentication (`/api/v1/auth`)
- `POST /login` - User login
- `POST /register` - User registration
- `POST /logout` - Single session logout
- `POST /logout-all` - All sessions logout
- `POST /refresh` - Token refresh
- `GET /email-verify` - Verify email
- `POST /email-verify/resend` - Resend verification
- `POST /forgot-password` - Request password reset
- `POST /password-reset/confirm` - Confirm password reset
- `POST /introspect` - Token introspection

### User Management (`/api/v1/users`)
- `GET /me` - Get current user
- `PUT /me` - Update current user
- `DELETE /me` - Delete account

### Admin (`/api/v1/admin`) - Future implementation
- User management
- Role management
- Rate limit control

## Authentication Flow

### Registration
1. User fills registration form
2. Form validated (client-side)
3. POST to `/api/v1/auth/register`
4. User receives verification email
5. User clicks link → GET `/api/v1/auth/email-verify?token=xxx`
6. Account activated → can login

### Login
1. User enters credentials
2. POST to `/api/v1/auth/login`
3. Receives `access token` (stored in localStorage)
4. `refresh token` (httpOnly cookie from backend)
5. Redirected to dashboard

### Token Refresh
- Automatic via Axios interceptor
- When access token expires (401 response)
- Uses refresh token from cookie
- Queues failed requests and retries after refresh

### Logout
- Clears local storage
- Calls backend logout endpoint
- Revokes refresh token

## State Management

### Auth Store (`features/auth/store/auth.store.ts`)
- Manages authentication state
- Persists user data
- Token management

### User Store (`features/user/store/user.store.ts`)
- Manages user profile data
- Loading/error states

## Custom Hooks

### `useAuth`
Main authentication hook providing login, logout, register

### `useLogin`
Form state and submission for login

### `useRegister`
Form state and submission for registration

### `usePasswordReset`
Handles forgot password and reset flows

### `useUser`
User profile management (fetch, update, delete)

## Route Protection

### Protected Routes
Require authentication, redirect to login if not authenticated:
- `/dashboard/*`

### Guest Routes
Only accessible when NOT authenticated, redirect to dashboard if authenticated:
- `/login`
- `/signup`

### Public Routes
Accessible to everyone:
- `/`
- `/verify-email`
- `/forgot-password`
- `/reset-password`

## Error Handling

Centralized error handling via:
- `lib/utils/error.utils.ts` - Error parsing
- `lib/http/interceptors/error.interceptor.ts` - HTTP errors
- Toast notifications for user feedback

## Development Guidelines

### Adding New Features

1. Create feature folder in `src/features/`
2. Add API service in `feature/api/`
3. Create state store if needed
4. Build custom hooks for logic
5. Create UI components/pages
6. Update routing in `main.tsx`

### Code Style

- Follow existing patterns
- Use TypeScript strictly
- Keep components focused (SRP)
- Extract reusable logic to hooks
- Use constants for magic values
- Add proper error handling

### Best Practices Implemented

✅ **SOLID Principles**
- Single Responsibility (modular files)
- Open/Closed (extensible architecture)
- Liskov Substitution (type safety)
- Interface Segregation (focused types)
- Dependency Inversion (abstractions)

✅ **DRY (Don't Repeat Yourself)**
- Reusable hooks
- Shared utilities
- Component composition

✅ **Other Principles**
- Separation of Concerns
- Feature-based architecture
- Type safety
- Error boundaries
- Consistent naming

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8081/api/v1` |

## Troubleshooting

### Cannot connect to backend
- Ensure Spring Boot backend is running
- Check `VITE_API_BASE_URL` in `.env`
- Verify CORS is properly configured in backend

### Token refresh issues
- Check backend refresh token cookie settings
- Ensure `withCredentials: true` in HTTP client
- Verify backend refresh endpoint works

### Build errors
- Clear `node_modules` and reinstall
- Check TypeScript version compatibility
- Run `npm run lint` to find issues

## License

This project is part of an authentication system demonstration.

## Support

For issues and questions, please contact the development team.
