# E-Shop App

A modern e-commerce application built with React, TypeScript, and Vite. Features include product listing, cart management, search functionality, and advanced filtering options.

🚀 **[Live Demo](https://e-shop-e-commerce-app.vercel.app/)**

## Features

- 🛍️ Product listing with dynamic filtering
- 🔍 Real-time search functionality
- 🛒 Shopping cart management
- ⭐ Rating-based filtering
- 💰 Price-based sorting
- 🌓 Dark theme
- 📱 Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js)

## Getting Started

### Cloning and Running the App

1. Clone the repository:
```bash
git clone https://github.com/yourusername/e-shop-app.git
```

2. Navigate to the project directory:
```bash
cd e-shop-app
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and visit:
```
http://localhost:5173
```

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
e-shop-app/
├── src/
│   ├── components/     # Reusable components
│   ├── features/       # Feature-specific components and logic
│   ├── pages/          # Page components
│   ├── redux/          # Redux store configuration
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- Vite
- Tailwind CSS
- React Router DOM
- React Icons
- React Toastify
- Axios

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url_here
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - The development server will automatically try the next available port
   - Default port is 5173

2. **Node Modules Issues**
   - Delete the `node_modules` folder and `package-lock.json`
   - Run `npm install` again

3. **Build Errors**
   - Clear the `dist` folder
   - Run `npm run build` again

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
