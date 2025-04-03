# Task Manager App

A modern, animated task management application built with React Native and Expo. This app helps you organize your tasks with a beautiful, intuitive interface and smooth animations.

## Features

- ✨ Create, complete, and delete tasks with smooth animations
- 🎨 Modern, clean UI with custom animations
- 🔍 Filter tasks by status (All, Active, Completed)
- 📱 Responsive design that works on both iOS and Android
- 🎯 Interactive task items with spring animations
- 💫 Smooth transitions and visual feedback

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (iOS or Android)

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run the app:
   - Install the Expo Go app on your mobile device from the App Store (iOS) or Play Store (Android)
   - Open the Expo Go app on your device
   - Scan the QR code that appears in your terminal with:
     - iOS: Use your device's camera
     - Android: Use the Expo Go app's QR scanner
   - The app will load on your device

If the project doesn't start on the app, you can also launch it on the web using the link from the terminal output 

## Usage

- **Adding Tasks**: Use the input field at the top of the screen to add new tasks
- **Completing Tasks**: Tap on a task to mark it as complete/incomplete
- **Deleting Tasks**: Tap the × button on any task to delete it
- **Filtering Tasks**: Use the filter buttons to view All, Active, or Completed tasks

## Third-Party Libraries

This project uses several third-party libraries to enhance functionality:

- **expo-router**: For file-based routing and navigation
- **react-native-reanimated**: For smooth, native-driven animations
- **react-native-gesture-handler**: For handling touch interactions and gestures
- **expo-haptics**: For providing haptic feedback on interactions
- **@expo/vector-icons**: For beautiful, consistent icons


## Development

The project structure is organized as follows:
- `/app`: Main application screens and routing
- `/components`: Reusable UI components
- `/hooks`: Custom React hooks for state management
- `/constants`: App-wide constants and configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
