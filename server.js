const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "https://player.vimeo.com"],
      frameSrc: ["'self'", "https://player.vimeo.com"],
      imgSrc: ["'self'", "data:", "https:", "https://i.vimeocdn.com"],
      connectSrc: ["'self'", "https://player.vimeo.com"]
    }
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact form submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});

app.use(limiter);
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname)));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Validation
    if (!name || !email || !company || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Sanitize input
    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 100),
      company: company.trim().substring(0, 100),
      message: message.trim().substring(0, 1000)
    };

    // Here you would typically:
    // 1. Save to database
    // 2. Send notification email
    // 3. Send auto-reply email

    console.log('Contact form submission:', sanitizedData);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful response
    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// Analytics endpoint
app.get('/api/stats', (req, res) => {
  // Mock analytics data
  const stats = {
    transactionsProcessed: 2500000000,
    globalClients: 200,
    uptime: 99.9,
    yearsExperience: 5,
    projectsDelivered: 500,
    dailyTransactions: 125000
  };

  res.json(stats);
});

// Newsletter signup
app.post('/api/newsletter', limiter, (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Here you would typically add email to newsletter list
  console.log('Newsletter signup:', email);

  res.json({
    success: true,
    message: 'Successfully subscribed to newsletter!'
  });
});

// Services endpoint
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: 'Payment Solutions',
      description: 'Secure, scalable payment processing with real-time analytics and fraud detection.',
      features: ['API Integration', 'Real-time Processing', 'Fraud Detection'],
      icon: 'payment'
    },
    {
      id: 2,
      title: 'Financial Analytics',
      description: 'Advanced data analytics and machine learning for financial insights and predictions.',
      features: ['ML Models', 'Predictive Analytics', 'Custom Dashboards'],
      icon: 'analytics'
    },
    {
      id: 3,
      title: 'Digital Banking',
      description: 'Complete digital banking platforms with mobile apps and web interfaces.',
      features: ['Mobile Apps', 'Web Platform', 'API Banking'],
      icon: 'banking'
    },
    {
      id: 4,
      title: 'Compliance & Security',
      description: 'Regulatory compliance solutions with advanced security and risk management.',
      features: ['KYC/AML', 'Risk Management', 'Audit Trails'],
      icon: 'security'
    }
  ];

  res.json(services);
});

// Case studies endpoint
app.get('/api/case-studies', (req, res) => {
  const caseStudies = [
    {
      id: 1,
      title: 'Digital Transformation for Major Bank',
      client: 'Global Bank Corp',
      industry: 'Banking',
      challenge: 'Legacy system modernization',
      solution: 'Cloud-native banking platform',
      results: ['50% faster transactions', '99.9% uptime', '40% cost reduction'],
      image: '/assets/case-study-1.jpg'
    },
    {
      id: 2,
      title: 'Fintech Startup Payment Platform',
      client: 'PayFlow Inc',
      industry: 'Fintech',
      challenge: 'Scalable payment processing',
      solution: 'Microservices architecture',
      results: ['10M+ transactions/day', '99.99% reliability', '3x growth'],
      image: '/assets/case-study-2.jpg'
    }
  ];

  res.json(caseStudies);
});

// Blog/News endpoint
app.get('/api/news', (req, res) => {
  const news = [
    {
      id: 1,
      title: 'The Future of Digital Banking',
      excerpt: 'Exploring trends in digital banking and financial technology...',
      date: '2024-01-15',
      author: 'Finimatic Team',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Securing Financial Transactions',
      excerpt: 'Best practices for maintaining security in financial systems...',
      date: '2024-01-10',
      author: 'Security Team',
      category: 'Security'
    }
  ];

  res.json(news);
});

// Serve main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Finimatic Server Started!
📊 Port: ${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
🕒 Time: ${new Date().toISOString()}
  `);
});

module.exports = app; 