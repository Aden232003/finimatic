# Finimatic Website

A modern, full-stack fintech website built with cutting-edge design patterns inspired by industry leaders. This project showcases sophisticated animations, responsive design, and robust backend functionality.

## 🚀 Features

### Frontend
- **Modern Design Patterns**: Inspired by Schbang's sophisticated animation system
- **Custom Cursor Effects**: Interactive cursor with magnetic elements
- **Scroll-Triggered Animations**: Smooth reveal animations and parallax effects
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance Optimized**: Efficient animations with reduced motion support
- **Dark Theme**: Professional fintech aesthetic with high contrast
- **Character-by-Character Text Reveals**: Dramatic typography animations
- **Floating Elements**: Subtle micro-interactions for enhanced UX

### Backend
- **Express.js Server**: Fast, secure Node.js backend
- **Rate Limiting**: Protection against abuse and spam
- **Security Headers**: Helmet.js for enhanced security
- **CORS Support**: Cross-origin resource sharing
- **Compression**: Gzip compression for faster loading
- **API Endpoints**: RESTful API for dynamic content
- **Form Handling**: Secure contact form processing
- **Error Handling**: Comprehensive error management

## 🛠 Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with custom properties and animations
- **Vanilla JavaScript**: ES6+ with class-based architecture
- **Intersection Observer API**: Efficient scroll-triggered animations
- **CSS Grid & Flexbox**: Modern layout systems

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Express Rate Limit**: Rate limiting middleware
- **Compression**: Response compression

### Development Tools
- **Nodemon**: Auto-restart development server
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing with Autoprefixer
- **Terser**: JavaScript minification
- **Jest**: Testing framework

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- npm (v8+)

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/finimatic/website.git
   cd finimatic-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Visit the application**
   ```
   http://localhost:3000
   ```

## 🎯 Design Patterns Implemented

Based on the Schbang analysis, we've implemented these key patterns:

### Animation & Motion
- **Character-by-character text reveals** for dramatic effect
- **Scroll-triggered animations** using Intersection Observer
- **3D transforms** for depth and modern feel
- **Staggered element reveals** for visual hierarchy
- **Floating animations** for subtle micro-interactions

### Layout & Structure
- **Full-viewport hero** with animated content
- **Section-based architecture** for clear content organization
- **Flex-based responsive grid** system
- **Component-based styling** for maintainability

### Interaction Design
- **Custom cursor effects** with magnetic elements
- **Hover state animations** for enhanced feedback
- **Smooth scroll navigation** for seamless UX
- **Form input animations** for modern feel

### Performance & Accessibility
- **Reduced motion** support for accessibility
- **Lazy loading** for images and heavy content
- **Optimized animations** with hardware acceleration
- **Semantic HTML** for screen readers

## 🎨 Design Philosophy

### Motion as Design Element
- Animations serve functional purposes, not just decoration
- Smooth, natural motion that guides user attention
- Performance-conscious implementation with 60fps targets

### Content-First Approach
- Design enhances content without overwhelming it
- Clear information hierarchy with strategic animations
- Professional yet engaging aesthetic

### Technical Excellence
- Modern web standards and best practices
- Security-conscious development
- Scalable architecture for growth

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

### Adaptive Features
- **Flexible typography** scaling
- **Progressive enhancement** for touch devices
- **Optimized animations** for different screen sizes
- **Touch-friendly** interactive elements

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/health` - Server health check
- `GET /api/stats` - Company statistics
- `GET /api/services` - Service offerings
- `GET /api/case-studies` - Client case studies
- `GET /api/news` - Latest news and blog posts

### Form Endpoints
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter subscription

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🚀 Production Deployment

### Build for Production
```bash
# Create optimized build
npm run build

# Start production server
npm start
```

### Environment Variables
Ensure all required environment variables are set:
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (production/development)
- Database and email configuration
- API keys for external services

### Security Considerations
- **Rate limiting** implemented for all endpoints
- **Helmet.js** for security headers
- **Input validation** and sanitization
- **CORS** properly configured
- **Content Security Policy** headers

## 📊 Performance Metrics

### Target Metrics
- **Lighthouse Score**: 95+ for all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### Optimization Features
- **Gzip compression** for all responses
- **Efficient animations** with transform3d
- **Image optimization** recommendations
- **Code splitting** for large applications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Maintain design pattern consistency
- Document API changes
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Schbang Design Patterns**: Inspiration for modern web design
- **Intersection Observer API**: For efficient scroll animations
- **Express.js Community**: Robust backend framework
- **Modern CSS Features**: For advanced styling capabilities

## 📞 Support

For support and questions:
- **Email**: support@finimatic.com
- **Documentation**: [docs.finimatic.com](https://docs.finimatic.com)
- **Issues**: [GitHub Issues](https://github.com/finimatic/website/issues)

---

Built with ❤️ by the Finimatic Team 