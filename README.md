# AnonGuard - Anonymous Reporting Platform

[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

AnonGuard is a secure, anonymous crime reporting platform that empowers citizens to report incidents while protecting their identity. Built with modern technologies and AI-powered analysis.

## 🚀 Features

- 🔒 **Anonymous Reporting**: Submit reports without revealing identity
- 🤖 **AI Analysis**: Automatic incident analysis using Google Gemini API
- 📍 **Location Tracking**: Optional geolocation support
- 🚨 **Emergency Categories**: Distinguish between emergency and non-emergency reports
- 📊 **Admin Dashboard**: Secure interface for authorities
- 🔍 **Report Tracking**: Monitor report status

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL (Neon)
- Google Gemini API
- NextAuth.js
- Framer Motion
- Tailwind CSS

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/Arjunhg/Anonymous-Guard

# Install dependencies
npm install

# Set up environment variables
.env
    DATABASE_URL=your_postgresql_url
    GEMINI_API_KEY=your_gemini_api_key
    NEXTAUTH_SECRET=your_secret
    NEXTAUTH_URL=http://localhost:3000

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

# 📱 Usage
Visit http://localhost:3000

Choose report type (Emergency/Non-Emergency)

Upload incident image (optional)

Fill report details

Submit and receive tracking ID

# 👮 Admin Access
Login at /auth/signin

Access dashboard at /dashboard

View and manage reports