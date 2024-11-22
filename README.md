# Angular File Explorer and Todo Application

A modern Angular application demonstrating file system exploration and todo list management, built with Angular 17 and utilizing standalone components.

## Features

- **Dynamic File Explorer**

  - Tree-like structure similar to Windows Explorer
  - Dynamic expansion/collapse of folders
  - Lazy loading of folder contents
  - Visual distinction between files and folders

- **Todo List Management**

  - Add/remove todo items
  - Mark todos as complete/incomplete
  - Automatic sorting (incomplete items first)
  - Clean, modern Material Design interface

- **Authentication**
  - Route protection with auth guard
  - Login/logout functionality
  - Secure routing

## Technical Stack

- Angular 17
- Angular Material
- Tailwind CSS
- Standalone Components Architecture
- RxJS for state management

## Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm (v8.x or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Navigate to project directory:

```bash
cd [project-name]
```

3. Install dependencies:

```bash
npm install
```

### Running the Application

```bash
npm run start
```

**Important**: Use `npm run start` instead of `ng serve` to ensure proper Tailwind CSS compilation.

The application will be available at `http://localhost:4200`

### Running Tests

```bash
ng test
```

## Login Credentials

For login credentials, use:

- Username: user
- Password: password

## Implementation Details

- Utilizes Angular 17's new control flow syntax (@if/@for)
- Implements lazy loading for efficient resource management
- Uses RxJS BehaviorSubjects for state management
- Implements Material Design components with custom styling
- Features responsive design with Tailwind CSS

## Testing

The application includes comprehensive unit tests for:

- Components
- Services
- Guards
- Dialogs
