import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.dark};
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
  padding: 80px 40px 40px;
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  display: block;
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileSocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const menuVariants = {
    hidden: {
      x: '100%',
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <Nav style={{ padding: scrolled ? '15px 40px' : '20px 40px' }}>
        <NavContainer>
          <Logo
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
          >
            YG
          </Logo>

          <NavLinks>
            <NavLink onClick={() => scrollToSection('home')}>Home</NavLink>
            <NavLink onClick={() => scrollToSection('about')}>About</NavLink>
            <NavLink onClick={() => scrollToSection('projects')}>Projects</NavLink>
            <NavLink onClick={() => scrollToSection('github')}>GitHub</NavLink>
            <NavLink onClick={() => scrollToSection('contact')}>Contact</NavLink>
          </NavLinks>

          <SocialLinks>
            <SocialLink
              href="https://github.com/Yumna-Gul?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <FaGithub />
            </SocialLink>
            <SocialLink
              href="mailto:yumnagul.bscsf23@iba-suk.edu.pk"
              whileHover={{ scale: 1.2 }}
            >
              <FaEnvelope />
            </SocialLink>
          </SocialLinks>

          <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavContainer>
      </Nav>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <MobileNavLink onClick={() => scrollToSection('home')}>Home</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('about')}>About</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('projects')}>Projects</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('github')}>GitHub</MobileNavLink>
            <MobileNavLink onClick={() => scrollToSection('contact')}>Contact</MobileNavLink>

            <MobileSocialLinks>
              <SocialLink
                href="https://github.com/Yumna-Gul?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </SocialLink>
              <SocialLink
                href="mailto:yumnagul.bscsf23@iba-suk.edu.pk"
              >
                <FaEnvelope />
              </SocialLink>
            </MobileSocialLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
