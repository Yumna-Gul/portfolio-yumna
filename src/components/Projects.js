import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaDatabase, FaPalette, FaServer } from 'react-icons/fa';

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 60px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: ${props => props.theme.colors.gradient};
    border-radius: 2px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const ProjectCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: ${props => props.theme.colors.gradient};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 30px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const ProjectSubtitle = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.secondary};
  font-style: italic;
  margin-bottom: 20px;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 20px;
`;

const ProjectFeatures = styled.ul`
  list-style: none;
  margin-bottom: 20px;
`;

const FeatureItem = styled.li`
  padding: 8px 0;
  color: ${props => props.theme.colors.dark};
  position: relative;
  padding-left: 25px;

  &::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const TechTag = styled.span`
  padding: 6px 12px;
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.primary};
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid ${props => props.theme.colors.primary};
`;

const ProjectIcons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.dark};
  font-size: 0.9rem;
`;

const projects = [
  {
    title: 'KitabGhar',
    subtitle: 'Online Book Borrowing Platform',
    description: 'A comprehensive full-stack web application for managing book borrowing with user and admin dashboards.',
    features: [
      'User authentication and role-based access',
      'Admin dashboard for book management',
      'Borrow request tracking system',
      'Fine calculation and payment processing',
      'Responsive design for all devices'
    ],
    technologies: ['Supabase', 'Vercel', 'HTML', 'CSS', 'JavaScript', 'React'],
    githubUrl: 'https://github.com/yumnagul',
    liveUrl: 'https://kitab-ghar-silk.vercel.app/',
    icon: <FaDatabase />,
    color: '#003E7E'
  },
  {
    title: 'Stress Detection',
    subtitle: 'Social Media Data Analysis',
    description: 'Machine learning project that analyzes social media data to predict stress levels with interactive web interface.',
    features: [
      'Data preprocessing and analysis',
      'Machine learning model implementation',
      'Interactive Hugging Face Space interface',
      'Real-time stress prediction',
      'Comprehensive data visualization'
    ],
    technologies: ['Python', 'Streamlit', 'Machine Learning', 'Data Analysis', 'Pandas'],
    githubUrl: 'https://github.com/yumnagul',
    liveUrl: 'https://huggingface.co/spaces/Yumna-Gul/Stress-Detection',
    icon: <FaCode />,
    color: '#DC267F'
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
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

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <ProjectsContainer ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Featured Projects
      </SectionTitle>

      <ProjectsGrid
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            variants={cardVariants}
            whileHover={{ y: -10 }}
            onHoverStart={() => setHoveredProject(index)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <ProjectImage style={{ background: project.color }}>
              {project.icon}
              
              <ProjectOverlay
                variants={overlayVariants}
                initial="hidden"
                animate={hoveredProject === index ? "visible" : "hidden"}
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <ProjectLinks>
                  <ProjectLink
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub />
                  </ProjectLink>
                  <ProjectLink
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt />
                  </ProjectLink>
                </ProjectLinks>
              </ProjectOverlay>
            </ProjectImage>

            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              
              <ProjectFeatures>
                {project.features.map((feature, featureIndex) => (
                  <FeatureItem key={featureIndex}>
                    {feature}
                  </FeatureItem>
                ))}
              </ProjectFeatures>

              <TechStack>
                {project.technologies.map((tech, techIndex) => (
                  <TechTag key={techIndex}>{tech}</TechTag>
                ))}
              </TechStack>

              <ProjectIcons>
                <IconWrapper>
                  <FaGithub />
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    GitHub
                  </a>
                </IconWrapper>
                <IconWrapper>
                  <FaExternalLinkAlt />
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    Live Demo
                  </a>
                </IconWrapper>
              </ProjectIcons>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects;
