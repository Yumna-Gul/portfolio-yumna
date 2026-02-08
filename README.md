# Yumna Gul - Portfolio Website

A modern, professional portfolio website built with React, featuring smooth animations, interactive components, and a responsive design.

## 🚀 Features

- **Modern Design**: Clean, professional layout with gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: Hover effects, smooth scrolling, and micro-interactions
- **Component-Based**: Modular React components with clean code structure
- **Performance Optimized**: Lazy loading and optimized animations

## 📁 Project Structure

```
yumna-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── About.js          # About section with skills
│   │   ├── Contact.js        # Contact form and info
│   │   ├── GitHub.js         # GitHub portfolio section
│   │   ├── Header.js         # Hero section
│   │   ├── Navigation.js     # Navigation menu
│   │   └── Projects.js       # Projects showcase
│   ├── App.js                # Main app component
│   └── index.js              # Entry point
├── package.json
├── vercel.json              # Vercel deployment config
└── README.md
```

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Styled Components**: CSS-in-JS styling
- **Framer Motion**: Smooth animations and transitions
- **React Icons**: Icon library
- **React Router**: Navigation (if needed)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd yumna-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

The `vercel.json` file is already configured for optimal deployment.

### Netlify

1. Run `npm run build` to create the production build
2. Upload the `build` folder to Netlify
3. Configure redirects for SPA routing

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `build` folder to any static hosting service.

## 📝 Sections

### 1. Header/Hero Section
- Prominent name display
- Subtitle with education and CGPA
- CV download and GitHub links
- Smooth scroll animations
- Floating background shapes

### 2. About Me Section
- Personal introduction
- Education details
- Interactive skills visualization with progress bars
- CV download button

### 3. Projects Section
- Interactive project cards with hover effects
- Project details, technologies, and links
- Smooth animations and transitions

### 4. GitHub Section
- GitHub profile showcase
- Repository statistics
- Language tags and project links
- Responsive grid layout

### 5. Contact Section
- Contact information cards
- Interactive contact form
- Social media links
- Form validation and feedback

## 🎨 Customization

### Colors
Edit the theme colors in `src/App.js`:
```javascript
const theme = {
  colors: {
    primary: '#003E7E',
    secondary: '#DC267F',
    accent: '#56B4E9',
    // ... other colors
  }
};
```

### Content
Update the following files to customize content:
- `src/components/Header.js` - Hero section content
- `src/components/About.js` - About section and skills
- `src/components/Projects.js` - Projects data
- `src/components/GitHub.js` - GitHub repositories
- `src/components/Contact.js` - Contact information

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for environment-specific variables:
```
REACT_APP_EMAIL_SERVICE_ID=your_service_id
REACT_APP_EMAIL_TEMPLATE_ID=your_template_id
REACT_APP_EMAIL_USER_ID=your_user_id
```

### Email Service (Optional)
To enable the contact form functionality:
1. Sign up for EmailJS service
2. Create email template
3. Update environment variables with your credentials

## 📱 Responsive Design

The portfolio is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Performance

- Lazy loading for images
- Optimized animations with Framer Motion
- Efficient re-renders with React hooks
- Minimal bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Yumna Gul**
- Computer Science Undergraduate
- 6th Semester | CGPA: 3.84/4.00
- Email: yumnagul.bscsf23@iba-suk.edu.pk
- GitHub: github.com/yumnagul

---

For any questions or collaboration opportunities, feel free to reach out!
