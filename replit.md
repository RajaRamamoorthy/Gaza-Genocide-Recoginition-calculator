# The Genocide Recognition Calculator - Interactive Humanitarian Crisis Experience

## Overview

The "Genocide Recognition Calculator" is a single-page interactive web experience that uses reverse psychology and dark satire to confront denial about humanitarian crises. The application guides users through an emotional journey from satirical engagement to somber reflection, ultimately challenging their thresholds for recognizing humanitarian catastrophe.

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
- Client-side API integration with Tech For Palestine APIs v2
- Real-time humanitarian data fetching from `/api/v2/summary.json`
- CORS proxy implementation using `api.allorigins.win` to bypass browser restrictions
- Smart caching system with 5-minute cache duration to minimize API calls
- Automatic retry logic with exponential backoff for failed requests
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
- **Tech For Palestine APIs v2**: Public humanitarian data APIs
  - Endpoint: `https://data.techforpalestine.org/api/v2/summary.json`
  - No authentication required
  - Client-side accessible via CORS proxy
  - Returns comprehensive casualty data including:
    - Total killed count
    - Children and women casualties
    - Medical personnel and press casualties
    - Last daily update timestamp
  - CORS Proxy: `https://api.allorigins.win/raw?url=` for cross-origin access

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
- **CORS proxy whitelisted** - api.allorigins.win added to connect-src
- **Nonce-based script execution** for Google Analytics
- **Privacy-enhanced analytics** - IP anonymization, no ad personalization
- **Dynamic style application** - replaced inline styles with data attributes + JavaScript
- No user data collection or storage
- No cookies or localStorage for personal information
- HTTPS-only deployment required
- No exposed API keys (using public APIs only)
- **Comprehensive crawler permissions** in robots.txt

## Changelog
- **July 12, 2025: Domain Update to Replit App**
  - Updated all URLs from howmanymore.xyz to gaza-genocide-threshold.replit.app
  - Changed canonical URL to Replit domain
  - Updated all Open Graph image URLs
  - Updated Twitter Card image URLs
  - Updated sitemap.xml with new domain
  - Updated robots.txt sitemap location
  - Updated og-image.svg to show correct domain
  - Updated README.md with correct live site URL
  - Updated all JSON-LD schema URLs
- **July 12, 2025: Gaza-Specific SEO Optimization**
  - Added crucial Gaza and Palestine keywords throughout all meta tags
  - Updated title to "Gaza Genocide Recognition Calculator - Real-time Palestinian Crisis Data"
  - Revised meta description to explicitly mention Gaza genocide and Palestinian casualties
  - Added comprehensive Gaza-specific keywords: gaza genocide, palestine humanitarian crisis, palestinian children killed, gaza death toll, gaza war crimes, tech for palestine
  - Updated all Open Graph tags to mention Gaza and Palestine explicitly
  - Enhanced Twitter Card with actual casualty numbers (57,000+ killed, 18,000+ children)
  - Updated JSON-LD schema to reference Gaza genocide and Palestinian crisis
  - Revised social media images (og-image.svg, twitter-card.svg) to include Gaza-specific content and casualty statistics
  - Updated README.md to focus on Gaza genocide context
  - Fixed broken classification meta tag
- **July 12, 2025: Major SEO & Metadata Overhaul**
  - Removed redundant "How Many More" mentions across all meta tags
  - Updated all SEO meta tags with focused keywords and better descriptions
  - Added canonical URL tag for proper SEO indexing
  - Fixed missing closing tag on Permissions-Policy meta
  - Added proper Open Graph and Twitter Card image URLs
  - Updated JSON-LD schema with URL property and better structure
  - Updated sitemap.xml with current date (2025-07-12)
  - Added preload for critical CSS resources
  - Enhanced robots.txt with clearer crawler permissions
  - Updated manifest.json to match new branding
  - Updated README.md to reflect new SEO structure
  - Added additional security headers (X-Frame-Options, X-Content-Type-Options)
  - Optimized meta descriptions for ideal length (150-160 characters)
  - Updated Google Analytics page title to match new branding
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