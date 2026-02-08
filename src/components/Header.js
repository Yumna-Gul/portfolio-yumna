import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaDownload, FaChevronDown } from 'react-icons/fa';

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 20px;
  background: ${props => props.theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  color: ${props => props.theme.colors.dark};
  margin-bottom: 40px;
  font-weight: 500;
  line-height: 1.4;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 60px;
`;

const Button = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: ${props => props.primary ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.primary ? 'white' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: ${props => props.primary ? props.theme.colors.secondary : props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 62, 126, 0.3);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  color: ${props => props.theme.colors.primary};
  font-size: 1.5rem;
`;

const FloatingShapes = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(0, 62, 126, 0.1) 0%, rgba(220, 38, 127, 0.1) 100%);
  filter: blur(40px);
`;

const Header = ({ scrollY }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <HeaderContainer>
      {/* Floating background shapes */}
      <FloatingShapes>
        <Shape
          style={{
            width: '300px',
            height: '300px',
            top: '10%',
            left: '10%',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <Shape
          style={{
            width: '200px',
            height: '200px',
            top: '60%',
            right: '10%',
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <Shape
          style={{
            width: '250px',
            height: '250px',
            bottom: '10%',
            left: '30%',
          }}
          animate={{
            x: [0, 25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </FloatingShapes>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Name
          variants={itemVariants}
          style={{
            transform: `translateY(${scrollY * 0.3}px)`
          }}
        >
          Yumna Gul
        </Name>

        <Subtitle
          variants={itemVariants}
          style={{
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        >
          Computer Science Undergraduate | 6th Semester | CGPA 3.84 / 4.00
        </Subtitle>

        <ButtonContainer variants={itemVariants}>
          <Button
            primary
            href={`${process.env.PUBLIC_URL}/Yumna_Gul_CV.pdf`}
            download="Yumna_Gul_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> Download CV
          </Button>
          <Button
            href="https://github.com/yumnagul"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub /> GitHub Profile
          </Button>
        </ButtonContainer>
      </motion.div>

      <ScrollIndicator
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => scrollToSection('about')}
      >
        <FaChevronDown />
      </ScrollIndicator>
    </HeaderContainer>
  );
};

export default Header;
