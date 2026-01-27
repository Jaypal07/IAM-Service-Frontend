# Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Spring Boot backend running on `http://localhost:8081`

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   
   The `.env` file is already created. Verify it contains:
   ```env
   VITE_API_BASE_URL=http://localhost:8081/api/v1
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will run on `http://localhost:5173`

## Test the Application

### 1. Registration Flow
- Navigate to `http://localhost:5173/signup`
- Fill in the form (name, email, password)
- Submit → You'll see a success message about email verification
- Check your backend logs for the verification link

### 2. Login Flow
- Go to `http://localhost:5173/login`
- Enter your credentials
- You'll be redirected to `/dashboard`

### 3. Password Reset
- Click "Forgot password?" on login page
- Enter your email
- Check backend for reset link

### 4. Protected Routes
- Try accessing `/dashboard` without logging in
- You'll be redirected to `/login`

### 5. User Profile
- After logging in, click your name in the navbar
- Edit your profile information
- Save changes

## Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── features/          # Feature modules
│   ├── auth/         # Authentication (login, register, password reset)
│   └── user/         # User management
├── components/       # Shared components
│   ├── guards/      # Route protection
│   └── ui/          # UI components
├── lib/             # Core infrastructure
│   ├── http/       # HTTP client with interceptors
│   └── utils/      # Utility functions
├── constants/      # Application constants
├── types/         # TypeScript types
└── pages/         # Page components
```

## Key Features

✅ **Authentication**
- Login with JWT
- Registration with email verification
- Password reset flow
- Automatic token refresh
- Protected routes

✅ **State Management**
- Zustand stores (auth, user)
- Persistent authentication
- Optimistic updates

✅ **Type Safety**
- Full TypeScript coverage
- Type-safe API calls
- Strict mode enabled

✅ **Developer Experience**
- Hot Module Replacement (HMR)
- Fast refresh
- ESLint configured
- Feature-based architecture

## Troubleshooting

**Can't connect to backend?**
- Ensure Spring Boot is running on port 8081
- Check `.env` file has correct `VITE_API_BASE_URL`
- Verify backend CORS settings allow `http://localhost:5173`

**Token refresh not working?**
- Backend must set httpOnly refresh token cookie
- Ensure `withCredentials: true` in HTTP client
- Check browser developer tools → Application → Cookies

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall if needed
- Check that TypeScript version is compatible

## Next Steps

1. Start the backend server
2. Run `npm run dev`
3. Open `http://localhost:5173`
4. Test all authentication flows
5. Check console for any errors

For detailed documentation, see [README.md](./README.md) and the walkthrough artifact.
