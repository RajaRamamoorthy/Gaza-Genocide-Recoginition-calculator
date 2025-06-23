# How Many More? - Interactive Humanitarian Crisis Experience

## Overview

"How Many More?" is a single-page interactive web experience that uses reverse psychology and dark satire to confront denial about humanitarian crises. The application guides users through an emotional journey from satirical engagement to somber reflection, ultimately challenging their thresholds for recognizing humanitarian catastrophe.

The project is designed as a static website using pure HTML, CSS, and JavaScript without any frameworks or build tools, making it simple to deploy and maintain while ensuring fast loading times.

## System Architecture

### Frontend Architecture
- **Single HTML file structure** with embedded CSS and JavaScript
- **Vanilla JavaScript implementation** - no frameworks or libraries
- **Progressive enhancement** approach for accessibility
- **Responsive design** supporting both mobile and desktop experiences
- **Phase-based UI transitions** that evolve as users progress through the experience

### Content Delivery
- **Static file hosting** using Python's built-in HTTP server for development
- **No build process required** - direct file serving
- **Client-side only** - no backend dependencies

## Key Components

### 1. Interactive Calculator Interface
- Satirical "Genocide Recognition Calculator" with threshold-setting sliders
- Dynamic comparative statistics display
- Progressive revelation of absurdity in the questions

### 2. Data Integration Layer
- Client-side API integration with Tech For Palestine APIs
- Real-time humanitarian data fetching
- No API key management required (public APIs)

### 3. Narrative Flow Engine
- Four distinct phases with different visual and emotional tones:
  - Phase 1: Satirical Calculator (Dark Comedy)
  - Phase 2: Reality Check (Transition)
  - Phase 3: Timeline (Somber Reality)
  - Phase 4: Memorial (Hope & Action)

### 4. Visual Design System
- CSS custom properties for theme management
- Color progression system that evolves with user journey
- Responsive layout system for cross-device compatibility

## Data Flow

1. **Initial Load**: Static HTML/CSS/JS served to browser
2. **User Interaction**: Threshold setting through interactive sliders
3. **API Integration**: Client-side fetch to Tech For Palestine APIs for real data
4. **Data Processing**: Comparison of user thresholds with actual statistics
5. **Progressive Revelation**: Phased disclosure of information with visual transitions
6. **Call to Action**: Final phase presenting constructive engagement options

## External Dependencies

### APIs
- **Tech For Palestine APIs**: Public humanitarian data APIs
  - No authentication required
  - Client-side accessible
  - Real-time casualty and infrastructure data

### Hosting Requirements
- **Static file hosting** capability
- **HTTPS support** for security
- **Content Security Policy** support for enhanced security

## Deployment Strategy

### Development Environment
- **Python HTTP Server**: Simple local development server on port 5000
- **Replit Configuration**: Uses Python 3.11 and Node.js 20 modules
- **No build step**: Direct file serving from repository root

### Production Deployment
- **Static hosting platforms** (GitHub Pages, Netlify, Vercel)
- **Single file deployment** - just serve index.html
- **CDN recommended** for global performance
- **Security headers** implementation for Content Security Policy

### Security Considerations
- No user data collection or storage
- No cookies or localStorage for personal information
- HTTPS-only deployment required
- Content Security Policy headers for XSS protection
- No exposed API keys (using public APIs only)

## Changelog
- June 23, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.