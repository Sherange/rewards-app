# RewardsApp

A modern React Native rewards application built with TypeScript, Redux Toolkit, and React Navigation. This app allows users to browse and claim various rewards/bounties with a clean, responsive interface.

## 🏗️ App Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppButton.tsx   # Custom button component
│   └── AppImage.tsx    # Optimized image component
├── config/             # Configuration files
│   └── api.ts         # API configuration
├── hooks/             # Custom React hooks
│   └── useBounties.ts # Bounties data management hook
├── navigation/        # Navigation configuration
│   ├── TabNavigation.tsx
│   ├── HomeStack.tsx
│   └── types.ts
├── screens/           # Screen components
│   ├── HomeScreen.tsx
│   ├── BountiesScreen.tsx
│   └── BountyScreen.tsx
├── store/            # Redux store configuration
│   ├── index.ts
│   └── bountiesSlice.ts
├── types/            # TypeScript type definitions
│   └── bounty.ts
├── utils/            # Utility functions
│   └── apiClient.ts
└── __tests__/        # Test files
```

### Architecture Patterns

- **Redux Toolkit**: State management with RTK Query for API calls
- **React Navigation**: Tab-based navigation with stack navigators
- **Custom Hooks**: Encapsulated business logic and state management
- **TypeScript**: Full type safety throughout the application
- **Component Composition**: Reusable, testable components
- **Separation of Concerns**: Clear separation between UI, business logic, and data

## 📦 Key Packages

### Core Dependencies

- **React Native 0.82.0**: Cross-platform mobile development
- **React 19.1.1**: Latest React with concurrent features
- **TypeScript 5.8.3**: Type safety and better developer experience

### Navigation & UI

- **@react-navigation/native**: Navigation library
- **@react-navigation/bottom-tabs**: Tab navigation
- **@react-navigation/native-stack**: Stack navigation
- **react-native-safe-area-context**: Safe area handling
- **react-native-screens**: Native screen optimization
- **@react-native-vector-icons/material-icons**: Material Design icons

### State Management & API

- **@reduxjs/toolkit**: Modern Redux with less boilerplate
- **react-redux**: React bindings for Redux
- **axios**: HTTP client for API requests

### Performance & Optimization

- **react-native-fast-image**: Optimized image loading and caching

### Development & Testing

- **Jest**: Testing framework
- **@testing-library/react-native**: React Native testing utilities
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 🎯 Coding Best Practices

### TypeScript Usage

- **Strict Type Safety**: All components, functions, and API responses are fully typed
- **Interface Definitions**: Clear type definitions for all data structures
- **Generic Types**: Proper use of generics for reusable components

### Component Architecture

- **Functional Components**: All components use React hooks
- **Props Interface**: Every component has a well-defined props interface
- **Accessibility**: Proper accessibility props and roles
- **Test IDs**: Components include testID for testing

### State Management

- **Redux Toolkit**: Modern Redux with createSlice and createAsyncThunk
- **Async Actions**: Proper error handling and loading states
- **Normalized State**: Efficient state structure for API data
- **Custom Hooks**: Encapsulated state logic in custom hooks

### API Integration

- **Axios Interceptors**: Centralized request/response handling
- **Error Handling**: Comprehensive error handling with user feedback
- **Loading States**: Proper loading indicators and states
- **Pagination**: Infinite scroll with proper pagination handling

### Code Organization

- **Barrel Exports**: Clean import/export structure
- **Separation of Concerns**: Clear separation between UI, business logic, and data
- **Custom Hooks**: Business logic encapsulated in reusable hooks
- **Utility Functions**: Reusable utility functions in dedicated files

### Testing Strategy

- **Component Testing**: Unit tests for components
- **Mocking**: Proper mocking of external dependencies
- **Test Coverage**: Comprehensive test coverage for critical paths

## 🚀 Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Prerequisites

- Node.js >= 20
- React Native development environment
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd RewardsApp
   ```

2. **Install dependencies**

   ```bash
   # Using npm
   npm install

   # OR using Yarn
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   # Install CocoaPods dependencies
   bundle install
   bundle exec pod install
   ```

### Development

#### Start Metro Bundler

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

#### Run on Device/Simulator

**Android:**

```bash
npm run android
# OR
yarn android
```

**iOS:**

```bash
npm run ios
# OR
yarn ios
```

### Testing

```bash
# Run tests
npm test
# OR
yarn test

# Run linting
npm run lint
# OR
yarn lint
```

## 🔧 Configuration

### API Configuration

Update the API base URL in `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-api-url.com/api/v1/',
} as const;
```

### Environment Variables

The app uses a staging API by default. Update the configuration for production use.

## 📱 Features

- **Rewards Display**: Grid layout with infinite scroll
- **Image Optimization**: Fast image loading with caching
- **Responsive Design**: Adaptive layout for different screen sizes
- **Error Handling**: User-friendly error messages
- **Loading States**: Smooth loading indicators
- **Navigation**: Tab-based navigation with stack navigators
- **State Management**: Centralized state with Redux Toolkit

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component and utility function tests
- **Integration Tests**: Navigation and state management tests
- **Mocking**: Proper mocking of external dependencies
- **Test Coverage**: Aim for high test coverage on critical paths

## 📚 Learn More

### React Native Resources

- [React Native Website](https://reactnative.dev)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/)

### State Management

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## 🐛 Troubleshooting

If you're having issues:

1. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`
2. **iOS build issues**: Clean and rebuild with `cd ios && xcodebuild clean`
3. **Android build issues**: Clean gradle with `cd android && ./gradlew clean`
4. **Dependency issues**: Delete `node_modules` and reinstall

For more troubleshooting, see the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).
