
# The Genocide Recognition Calculator

An interactive web application that challenges users to confront their thresholds for recognizing humanitarian catastrophe through a provocative calculator interface that reveals the stark reality of ongoing crises.

## 🎯 Project Overview

The Genocide Recognition Calculator is a powerful educational tool designed to challenge our collective desensitization to humanitarian crises. Through a unique four-phase narrative journey, users are guided from satirical engagement to sobering reality, ultimately leading to constructive action.

### Key Features

- **Interactive Threshold Calculator**: Users set their own "recognition thresholds" for humanitarian concern
- **Real-time Data Integration**: Live data from Tech For Palestine APIs
- **Progressive Narrative Revelation**: Four distinct phases with evolving visual and emotional tones
- **Responsive Design**: Optimized for all devices and screen sizes
- **Accessibility First**: WCAG 2.1 AA compliant with screen reader support
- **Performance Optimized**: Single-file deployment with minimal dependencies

## 🚀 Live Demo

Visit the live experience: [Genocide Recognition Calculator](https://howmanymore.xyz)

## 📱 Screenshots

The experience adapts its visual design and messaging across four distinct phases:

1. **Phase 1**: Satirical Calculator (Light, accessible design)
2. **Phase 2**: Reality Check (Transition to darker themes)
3. **Phase 3**: Timeline (Somber, memorial-style presentation)
4. **Phase 4**: Memorial & Action (Hope and constructive engagement)

## 🛠 Technical Architecture

### Built With

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **APIs**: Tech For Palestine humanitarian data APIs
- **Analytics**: Google Analytics 4
- **Hosting**: Static file hosting (Replit, GitHub Pages, Netlify compatible)

### Design System

- **Typography**: Modern system font stack for optimal performance
- **Color Progression**: CSS custom properties enabling seamless theme transitions
- **Layout**: CSS Grid and Flexbox for responsive design
- **Animations**: CSS transitions and keyframes for smooth interactions

## 🎨 Design Philosophy

The UI/UX deliberately evolves throughout the user journey:

- **Satirical Opening**: Light, almost playful design to draw users in
- **Reality Transition**: Progressive darkening as real data is revealed
- **Memorial Phase**: Somber, respectful presentation honoring victims
- **Action Phase**: Hopeful, constructive design encouraging engagement

## 📊 Data Sources

- **Primary**: [Tech For Palestine APIs v2](https://data.techforpalestine.org/)
- **API Endpoint**: `https://data.techforpalestine.org/api/v2/summary.json`
- **Real-time Updates**: Casualty figures including total killed, children, women, and more
- **CORS Proxy**: Uses `api.allorigins.win` to bypass cross-origin restrictions
- **No Authentication Required**: Public APIs accessible client-side
- **Last Updated**: July 11, 2025 (57,823 total killed, 18,000 children, 12,400 women)

## 🚀 Getting Started

### Prerequisites

- Any modern web browser
- Python 3.x (for local development server)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/how-many-more.git
   cd how-many-more
   ```

2. **Start local server**
   ```bash
   python3 -m http.server 5000
   ```

3. **Open in browser**
   ```
   http://0.0.0.0:5000
   ```

### Deployment

This is a static single-file application that can be deployed anywhere:

#### Replit (Recommended)
- Fork this Repl
- Click "Run" to start the development server
- Use Replit's deployment features for production

#### Other Platforms
- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Connect repository and deploy
- **Vercel**: Import project and deploy

## 📈 Analytics & Tracking

The experience includes comprehensive analytics to understand user engagement:

- **User Flow Tracking**: Journey through each phase
- **Threshold Analytics**: Distribution of user-set recognition thresholds
- **Engagement Metrics**: Time on page, scroll depth, interaction patterns
- **Conversion Tracking**: Click-through rates to humanitarian organizations

## 🔧 Troubleshooting

### Common Issues and Solutions

#### API Data Not Loading
- **Issue**: "Unable to Load Current Data" error message
- **Cause**: CORS restrictions or API connectivity issues
- **Solution**: The app uses a CORS proxy (api.allorigins.win) to bypass browser restrictions. If the proxy is down, data may not load.

#### Content Security Policy Errors
- **Issue**: Console errors about CSP violations
- **Solution**: All necessary domains are whitelisted in the CSP header, including the CORS proxy

#### Slow Loading Times
- **Issue**: API requests taking too long
- **Solution**: The app implements a 5-minute cache and retry logic with exponential backoff

### Technical Details
- **API Version**: Tech For Palestine v2 API
- **Primary Endpoint**: `/api/v2/summary.json`
- **CORS Proxy**: `https://api.allorigins.win/`
- **Cache Duration**: 5 minutes
- **Retry Attempts**: 3 with exponential backoff

## 🏗️ Implementation Details

### API Integration
```javascript
// CORS proxy implementation
const corsProxy = 'https://api.allorigins.win/raw?url=';
const proxiedUrl = corsProxy + encodeURIComponent(apiUrl);

// Data structure returned by API
{
  "killedInGazaListCount": 55202,
  "massacres": 12000,
  "killed": {
    "total": 57823,
    "children": 18000,
    "women": 12400,
    "civilDefence": 115,
    "press": 228,
    "medical": 1584
  },
  "injured": {
    "total": 137887
  },
  "lastDailyUpdate": "2025-07-11"
}
```

### Security Headers
- Content Security Policy includes all necessary domains
- No inline styles or scripts (CSP compliant)
- All external resources properly whitelisted

## 🔒 Privacy & Security

- **No Personal Data Collection**: No cookies or localStorage for personal information
- **HTTPS Only**: Secure connections required
- **Content Security Policy**: XSS protection headers
- **Public APIs Only**: No exposed API keys or authentication

## 🌍 Impact & Purpose

This project aims to:

- **Challenge Apathy**: Break through desensitization to humanitarian crises
- **Provide Context**: Help users understand the scale of ongoing situations
- **Drive Action**: Convert awareness into concrete humanitarian support
- **Foster Empathy**: Humanize statistics through interactive experience

## 🤝 Contributing

We welcome contributions that enhance the impact and accessibility of this experience:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/enhancement`)
3. **Commit changes** (`git commit -am 'Add meaningful enhancement'`)
4. **Push to branch** (`git push origin feature/enhancement`)
5. **Open a Pull Request**

### Contribution Guidelines

- Maintain the serious purpose while preserving satirical elements
- Ensure accessibility compliance (WCAG 2.1 AA)
- Test across multiple devices and browsers
- Respect the emotional weight of the subject matter

## 📞 Support Resources

If you need emotional support after experiencing this content:

- **Crisis Text Line**: Text HOME to 741741
- **988 Suicide & Crisis Lifeline**: Call or text 988
- **International Association for Suicide Prevention**: https://www.iasp.info/resources/Crisis_Centres/

## 🏛 Humanitarian Organizations

Support the organizations featured in this experience:

- [UNRWA](https://www.unrwa.org/donate) - United Nations Relief and Works Agency
- [PCRF](https://pcrf.net/) - Palestine Children's Relief Fund
- [Medical Aid for Palestinians](https://www.map.org.uk/)
- [Islamic Help Palestine Appeal](https://islamichelp.org.uk/appeals/palestine-appeal/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tech For Palestine** for providing accessible humanitarian data APIs
- **Contributors** who help maintain and improve this experience
- **Humanitarian Organizations** working tirelessly in crisis zones
- **Users** who engage thoughtfully with difficult but necessary content

## 📞 Contact

For questions, suggestions, or collaboration opportunities:

- **Website**: [howmanymore.xyz](https://howmanymore.xyz)
- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Email**: Contact through the website

---

*"Every life matters. Every child matters. Every family matters."*

*This project stands in solidarity with all people affected by humanitarian crises, everywhere.*
