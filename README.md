# Vocab Vault Application

A comprehensive vocabulary learning application that helps users build and maintain their vocabulary through an interactive and engaging interface.

## 🎨 User Interface & Experience

### Design Philosophy
- **Modern & Clean**: Minimalist design with focus on content
- **Responsive**: Seamless experience across all devices
- **Accessible**: WCAG 2.1 compliant design
- **Intuitive**: User-friendly navigation and interactions

### Key Interface Components

#### 1. Dashboard
- **Learning Progress Overview**
  - Daily streak counter
  - Words learned statistics
  - Recent activity feed
  - Quick access to collections

- **Smart Recommendations**
  - Personalized word suggestions
  - Review reminders
  - Learning path suggestions

#### 2. Vocabulary Management
- **Collection View**
  - Grid/List view toggle
  - Advanced filtering options
  - Quick search functionality
  - Drag-and-drop organization

- **Word Cards**
  - Interactive flip cards
  - Audio pronunciation
  - Example sentences
  - Related words
  - Custom notes

#### 3. Learning Interface
- **Study Modes**
  - Flashcard mode
  - Quiz mode
  - Writing practice
  - Listening exercises

- **Progress Tracking**
  - Visual progress bars
  - Achievement badges
  - Learning statistics
  - Performance analytics

#### 4. User Profile
- **Personalization**
  - Custom themes
  - Learning preferences
  - Notification settings
  - Language preferences

- **Social Features**
  - Friend connections
  - Learning groups
  - Progress sharing
  - Competition leaderboards

### UI Components & Libraries
- **Component Library**: Ant Design (antd)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Charts**: Recharts
- **Notifications**: Ant Design Notifications

### Color Scheme
```css
Primary: #4F46E5    /* Indigo */
Secondary: #10B981  /* Emerald */
Accent: #F59E0B     /* Amber */
Background: #F9FAFB /* Gray-50 */
Text: #1F2937      /* Gray-800 */
```

### Typography
```css
Heading: Inter
Body: Roboto
Code: Fira Code
```

## Technical Stack

### Frontend (vocab_vault_fe)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with Redux Persist
- **UI Components**: Ant Design (antd)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Date Handling**: date-fns
- **Code Quality**:
  - ESLint
  - Prettier
  - TypeScript
  - PostCSS

### Backend (vocab_vault_be)
- **Framework**: Spring Boot 3.4.1
- **Language**: Java 17
- **Database**: MySQL
- **Security**: Spring Security with OAuth2
- **Key Features**:
  - Spring Data JPA for data persistence
  - Spring Mail for email functionality
  - Spring WebFlux for reactive programming
  - ModelMapper for object mapping
  - Cloudinary integration for media storage
  - Lombok for reducing boilerplate code

## Project Structure

### Frontend Structure
```
vocab_vault_fe/
├── src/
│   ├── apis/         # API integration
│   ├── assets/       # Static assets
│   ├── collections/  # Data collections
│   ├── components/   # Reusable components
│   ├── hooks/        # Custom React hooks
│   ├── pages/        # Page components
│   ├── redux/        # State management
│   ├── routes/       # Route configurations
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
```

### Backend Structure
```
vocab_vault_be/
├── src/main/java/com/example/vocab_vault_be/
│   ├── config/       # Application configuration
│   ├── controller/   # REST controllers
│   ├── dto/          # Data Transfer Objects
│   ├── entity/       # Database entities
│   ├── exception/    # Custom exceptions
│   ├── repository/   # Data access layer
│   ├── security/     # Security configurations
│   ├── service/      # Business logic
│   └── utils/        # Utility classes
```

## Features

### User Management
- User registration and authentication
- OAuth2 integration for social login
- Profile management
- Email verification

### Vocabulary Management
- Create and manage vocabulary collections
- Add, edit, and delete vocabulary items
- Categorize words by topics or difficulty levels
- Search and filter vocabulary items

### Learning Features
- Interactive learning sessions
- Progress tracking
- Spaced repetition system
- Quiz and testing functionality

### Additional Features
- Cloud storage for media files
- Responsive design for all devices
- Real-time updates
- Data persistence and synchronization

## Getting Started

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd vocab_vault_fe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd vocab_vault_be
   ```
2. Build the project:
   ```bash
   ./mvnw clean install
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

## Development

- Frontend runs on `http://localhost:5173` by default
- Backend runs on `http://localhost:8080` by default
- Ensure MySQL is running and properly configured
- Set up necessary environment variables for OAuth2 and Cloudinary

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 