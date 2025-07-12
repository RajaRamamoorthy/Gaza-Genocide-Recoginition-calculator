# How Many More? - Interactive Humanitarian Crisis Experience

## Overview

"How Many More?" is a single-page interactive web experience that uses reverse psychology and dark satire to confront denial about humanitarian crises. The application guides users through an emotional journey from satirical engagement to somber reflection, ultimately challenging their thresholds for recognizing humanitarian catastrophe.

The project is designed as a static website using pure HTML, CSS, and JavaScript without any frameworks or build tools, making it simple to deploy and maintain while ensuring fast loading times.

## System Architecture

### Frontend Architecture
- **Separated file structure** - HTML, CSS, and JavaScript in separate files for maintainability
- **Vanilla JavaScript implementation** - no frameworks or libraries
- **Progressive enhancement** approach for accessibility
- **Responsive design** supporting both mobile and desktop experiences
- **Phase-based UI transitions** that evolve as users progress through the experience
- **Security-hardened** with proper Content Security Policy implementation

### Content Delivery
- **Static file hosting** using Python's built-in HTTP server for development
- **Optimized file structure** - separate CSS and JS files for better caching
- **Client-side only** - no backend dependencies
- **Enhanced error handling** with retry logic and offline fallbacks

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
- **Enhanced Content Security Policy** - removed unsafe-inline and unsafe-eval
- **Nonce-based script execution** for Google Analytics
- **Privacy-enhanced analytics** - IP anonymization, no ad personalization
- No user data collection or storage
- No cookies or localStorage for personal information
- HTTPS-only deployment required
- No exposed API keys (using public APIs only)
- **Comprehensive crawler permissions** in robots.txt

## Changelog
- **July 12, 2025: Complete API Debugging & CORS Fix**
  - Fixed CORS policy blocking by implementing api.allorigins.win proxy
  - Updated Content Security Policy to allow proxy domain connections
  - Migrated to Tech For Palestine v2 API endpoints (/api/v2/summary.json)
  - Simplified API calls to only load summary data (most reliable endpoint)
  - Fixed all inline style CSP violations by using data attributes + JavaScript
  - Added date-range-message CSS class for styling compliance
  - Removed console.log debugging statements for production readiness
  - API now successfully returns: 57,823 total killed, 18,000 children, 12,400 women (July 11, 2025 data)
- **July 12, 2025: API Data Flow & Modal Fixes**
  - Fixed API data handling to correctly display casualty statistics
  - Resolved "0 men" display issue by removing men's count (API doesn't provide this field)
  - Fixed content warning modal closure by using event listeners instead of onclick
  - Resolved Content Security Policy conflicts preventing inline styles
  - Updated date display to show current API data (July 11, 2025)
  - Improved error handling and removed debugging code after fixes
- January 12, 2025: **Major Architecture & Security Improvements**
  - Separated HTML, CSS, and JavaScript into individual files
  - Enhanced Content Security Policy (removed unsafe-inline/unsafe-eval)
  - Improved error handling with retry logic and timeouts
  - Updated sitemap.xml with mobile-optimized URLs and current date
  - Enhanced robots.txt for comprehensive search engine access
  - Added privacy-enhanced Google Analytics configuration
  - Implemented browser feature detection and graceful degradation
  - Added performance optimizations (preconnect, dns-prefetch)
- June 23, 2025: Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.