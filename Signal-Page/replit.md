# Signal Strategy - Lifecycle Email Marketing Platform

## Overview

Signal Strategy is a marketing landing page and contact management system for a lifecycle email strategy consultancy. The platform showcases the SIGNAL Framework (Segment, Interpret, Generate, Nurture, Automate, Learn) for SaaS and product-led companies looking to optimize their trial-to-paid conversion flows.

The application is a full-stack TypeScript project with a React frontend and Express backend, featuring a contact form that stores inquiries in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for scroll animations and entry effects
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **State Management**: TanStack React Query for server state and caching
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript compiled with tsx
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod schemas
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: shared/schema.ts using Drizzle's pgTable definitions
- **Migrations**: Drizzle Kit with migrations output to ./migrations directory

### Project Structure
- `client/` - React frontend application
  - `src/components/` - UI components including shadcn/ui primitives
  - `src/pages/` - Page components (Home, NotFound)
  - `src/hooks/` - Custom React hooks
  - `src/lib/` - Utility functions and query client setup
- `server/` - Express backend
  - `index.ts` - Server entry point with middleware setup
  - `routes.ts` - API route handlers
  - `storage.ts` - Database access layer
  - `db.ts` - Drizzle database connection
- `shared/` - Code shared between frontend and backend
  - `schema.ts` - Database schema and Zod validation schemas
  - `routes.ts` - API route definitions and types

### Design Patterns
- **Shared Type Safety**: Schema definitions in shared/ are used by both frontend and backend for consistent typing
- **Repository Pattern**: DatabaseStorage class in storage.ts abstracts database operations
- **API Contract**: Routes defined with Zod schemas for input validation and type inference

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via DATABASE_URL environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: Session storage in PostgreSQL

### UI Framework
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms, etc.)
- **shadcn/ui**: Pre-built component library using Radix primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development

### Fonts
- DM Sans (body text)
- Playfair Display (display/headings)
- Google Fonts CDN