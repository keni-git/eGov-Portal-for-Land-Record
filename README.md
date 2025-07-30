# Fayda-Integrated eGov Portal for Land Record Digitization

A modern web application for digitizing land record management in Ethiopia, integrated with Fayda Digital ID for secure authentication and streamlined government services.

## Features

- **Secure Authentication**: Login with Fayda Digital ID (FIN/FAN) and OTP verification
- **Digital Forms**: Submit land ownership, transfer, and inheritance applications online
- **Real-time Tracking**: Monitor application status and receive updates
- **Document Management**: Upload and manage supporting documents
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Government Integration**: Built for integration with Ethiopian government offices

## Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router
- **React 18**: Modern React with Server Components
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: High-quality UI components
- **Lucide React**: Beautiful icons

### Backend

- **Next.js API Routes**: Serverless API endpoints
- **Node.js**: JavaScript runtime
- **TypeScript**: Type-safe development

### Authentication & Integration

- **Fayda OIDC**: Digital ID authentication
- **JWT**: Secure token management
- **OTP Verification**: Two-factor authentication

### Deployment

- **Docker**: Containerized deployment
- **Docker Compose**: Multi-service orchestration
- **Vercel**: Cloud deployment platform

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** or **pnpm**
- **Docker** (for containerized deployment)
- **Docker Compose** (for multi-service setup)

## Installation and Deployment

### Local Development Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/keni-git/eGov-Portal-for-Land-Record.git
   cd eGov-Portal-for-Land-Record
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Edit \`.env.local\` and add your configuration:
   \`\`\`env
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   FAYDA_OIDC_CLIENT_ID=your-fayda-client-id
   FAYDA_OIDC_CLIENT_SECRET=your-fayda-client-secret
   FAYDA_OIDC_ISSUER=https://fayda.gov.et/auth
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev

   # or

   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Production Deployment with Docker

#### Option 1: Using Docker directly

1. **Build the Docker image**
   \`\`\`bash
   docker build -t fayda-egov-portal .
   \`\`\`

2. **Run the container**
   \`\`\`bash
   docker run -p 3000:3000 \
    -e NODE_ENV=production \
    -e NEXTAUTH_SECRET=your-secret-key \
    -e FAYDA_OIDC_CLIENT_ID=your-client-id \
    fayda-egov-portal
   \`\`\`

#### Option 2: Using Docker Compose (Recommended)

1. **Create environment file**
   \`\`\`bash
   cp .env.example .env.production
   \`\`\`

   Edit \`.env.production\` with your production values.

2. **Start the services**
   \`\`\`bash
   docker-compose up -d
   \`\`\`

3. **Check service status**
   \`\`\`bash
   docker-compose ps
   \`\`\`

4. **View logs**
   \`\`\`bash
   docker-compose logs -f fayda-egov-portal
   \`\`\`

5. **Stop the services**
   \`\`\`bash
   docker-compose down
   \`\`\`

### Deployment to Vercel

1. **Install Vercel CLI**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Login to Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

4. **Set environment variables in Vercel dashboard**
   - Go to your project settings
   - Add the required environment variables
   - Redeploy if necessary

## Configuration

### Environment Variables

| Variable                     | Description                  | Required | Default               |
| ---------------------------- | ---------------------------- | -------- | --------------------- |
| \`NEXTAUTH_SECRET\`          | Secret for NextAuth.js       | Yes      | -                     |
| \`NEXTAUTH_URL\`             | Base URL of your application | Yes      | http://localhost:3000 |
| \`FAYDA_OIDC_CLIENT_ID\`     | Fayda OIDC Client ID         | Yes      | -                     |
| \`FAYDA_OIDC_CLIENT_SECRET\` | Fayda OIDC Client Secret     | Yes      | -                     |
| \`FAYDA_OIDC_ISSUER\`        | Fayda OIDC Issuer URL        | Yes      | -                     |
| \`DATABASE_URL\`             | Database connection string   | No       | -                     |
| \`UPLOAD_MAX_SIZE\`          | Maximum file upload size     | No       | 10MB                  |

### Fayda OIDC Integration

To integrate with the actual Fayda OIDC service:

1. **Register your application** with Fayda Digital ID
2. **Obtain client credentials** (Client ID and Secret)
3. **Configure redirect URIs** in your Fayda application settings
4. **Update environment variables** with your credentials

Example Fayda OIDC configuration:
\`\`\`javascript
{
"issuer": "https://fayda.gov.et/auth",
"authorization_endpoint": "https://fayda.gov.et/auth/authorize",
"token_endpoint": "https://fayda.gov.et/auth/token",
"userinfo_endpoint": "https://fayda.gov.et/auth/userinfo",
"scopes_supported": ["openid", "profile", "email", "fayda_id"]
}
\`\`\`

## Testing

### Running Tests

\`\`\`bash

# Run unit tests

npm run test

# Run tests in watch mode

npm run test:watch

# Run tests with coverage

npm run test:coverage

# Run end-to-end tests

npm run test:e2e
\`\`\`

### Test Credentials

For development and testing, use these mock credentials:

- **Fayda ID**: Any ID with 10+ characters (e.g., "1234567890")
- **OTP**: 123456

## Project Structure

\`\`\`
fayda-egov-portal/
├── app/ # Next.js App Router
│ ├── api/ # API routes
│ │ ├── auth/ # Authentication endpoints
│ │ └── health/ # Health check endpoint
│ ├── auth/ # Authentication pages
│ │ ├── login/ # Login page
│ │ └── register/ # Registration page
│ ├── dashboard/ # User dashboard
│ ├── applications/ # Application management
│ │ └── new/ # New application form
│ ├── about/ # About page
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Home page
│ └── globals.css # Global styles
├── components/ # Reusable components
│ └── ui/ # UI components (Shadcn)
├── lib/ # Utility functions
├── public/ # Static assets
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile # Docker configuration
├── next.config.mjs # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── package.json # Dependencies and scripts
└── README.md # This file
\`\`\`

## Security Considerations

### Authentication Security

- **Fayda Digital ID**: Primary authentication mechanism
- **OTP Verification**: Two-factor authentication
- **JWT Tokens**: Secure session management
- **HTTPS Only**: All production traffic encrypted

### Data Protection

- **Input Validation**: All user inputs validated
- **File Upload Security**: Restricted file types and sizes
- **XSS Protection**: Content Security Policy headers
- **CSRF Protection**: Built-in Next.js protection

### Infrastructure Security

- **Docker Security**: Non-root user in containers
- **Environment Variables**: Sensitive data in env vars
- **Security Headers**: X-Frame-Options, X-Content-Type-Options
- **Rate Limiting**: API endpoint protection

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   \`\`\`bash

   # Kill process using port 3000

   lsof -ti:3000 | xargs kill -9
   \`\`\`

2. **Docker build fails**
   \`\`\`bash

   # Clear Docker cache

   docker system prune -a
   \`\`\`

3. **Environment variables not loading**

   - Ensure \`.env.local\` exists and has correct format
   - Restart the development server
   - Check for typos in variable names

4. **Fayda OIDC connection issues**
   - Verify client credentials
   - Check network connectivity
   - Validate redirect URIs

### Getting Help

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Check the official Next.js and Fayda documentation
- **Community**: Join the Ethiopian developer community forums

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: \`git checkout -b feature/amazing-feature\`
3. **Commit your changes**: \`git commit -m 'Add amazing feature'\`
4. **Push to the branch**: \`git push origin feature/amazing-feature\`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure Docker builds successfully

## Contributors

- **keneni Abebe** - Initial development and hackathon submission -**samuel mandefro**

### Completed Checklist Items

1. Project Structure\*\*: Complete Next.js application with all necessary files
2. Working Main Branch\*\*: Fully functional codebase ready for testing
3. Authentication\*\*: Fayda OIDC integration with OTP verification
4. Docker Deployment\*\*: Dockerfile and docker-compose.yml included
5. README Documentation\*\*: Comprehensive installation and deployment guide

### Project Goals Achieved

- **Digital Land Records**: Complete system for land record management
- **Fayda Integration**: Secure authentication using Fayda Digital ID
- **User-Friendly Interface**: Responsive design with modern UI/UX
- **Government Ready**: Built for integration with Ethiopian government offices
- **Production Ready**: Docker deployment and security best practices

### Demo Flow

1. **Visit**: [http://localhost:3000](http://localhost:3000)
2. **Register**: Create account with Fayda ID
3. **Login**: Use Fayda ID + OTP (123456 for demo)
4. **Dashboard**: View profile and application status
5. **Apply**: Submit new land record application
6. **Track**: Monitor application progress
