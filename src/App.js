import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import Navigation from './components/Navigation';

// Global styles and theme
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: #333;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const theme = {
  colors: {
    primary: '#003E7E',
    secondary: '#DC267F',
    accent: '#56B4E9',
    dark: '#404040',
    light: '#F5F5F5',
    white: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #003E7E 0%, #DC267F 100%)'
  },
  fonts: {
    main: "'Inter', sans-serif"
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px'
  }
};

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  position: relative;
  
  &:nth-child(even) {
    background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  }
`;

const App = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Navigation />
        
        {/* Header/Hero Section */}
        <Section id="home">
          <Header scrollY={scrollY} />
        </Section>

        {/* About Me/CV Section */}
        <Section id="about">
          <About />
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <Projects />
        </Section>

        {/* GitHub/Portfolio Section */}
        <Section id="github">
          <GitHub />
        </Section>

        {/* Contact Section */}
        <Section id="contact">
          <Contact />
        </Section>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
