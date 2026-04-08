import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaExternalLinkAlt } from 'react-icons/fa';

const GitHubContainer = styled.div`
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

const GitHubProfile = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 40px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
`;

const ProfileInfo = styled.div`
  text-align: left;
`;

const ProfileName = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 10px;
`;

const ProfileBio = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ProfileLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled(motion.div)`
  background: ${props => props.theme.colors.light};
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.dark};
  font-weight: 500;
`;

const RepositoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const RepoCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const RepoName = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RepoDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 15px;
  line-height: 1.5;
`;

const RepoStats = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
`;

const RepoStat = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.dark};
`;

const RepoLanguages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
`;

const LanguageTag = styled.span`
  padding: 4px 10px;
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.primary};
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const RepoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.dark};
  padding: 40px;
`;

const repositories = [
  {
    name: 'kitab-ghar',
    fullName: 'KitabGhar - Online Book Borrowing Platform',
    description: 'Full-stack web application for managing book borrowing with user authentication and admin dashboard.',
    stars: 15,
    forks: 3,
    watchers: 8,
    language: 'JavaScript',
    languages: ['JavaScript', 'HTML', 'CSS', 'React'],
    url: 'https://github.com/Yumna-Gul/Online-Library'
  },
  {
    name: 'stress-detection',
    fullName: 'Stress Detection from Social Media',
    description: 'Machine learning project that analyzes social media data to predict stress levels using Python. Live demo available on Hugging Face Spaces.',
    stars: 23,
    forks: 7,
    watchers: 12,
    language: 'Python',
    languages: ['Python', 'Streamlit', 'Machine Learning'],
    url: 'https://github.com/Yumna-Gul/Stress-Detection-app',
    liveUrl: 'https://huggingface.co/spaces/Yumna-Gul/Stress-Detection'
  },
  {
    name: 'portfolio-website',
    fullName: 'Personal Portfolio Website',
    description: 'Modern, responsive portfolio website built with React, featuring smooth animations and interactive components.',
    stars: 18,
    forks: 5,
    watchers: 10,
    language: 'JavaScript',
    languages: ['JavaScript', 'React', 'Styled Components', 'Framer Motion'],
    url: 'https://github.com/Yumna-Gul/portfolio-yumna'
  },
  {
    name: 'ui-design-projects',
    fullName: 'UI/UX Design Projects',
    description: 'Collection of UI/UX design projects including wireframes, prototypes, and design systems.',
    stars: 12,
    forks: 2,
    watchers: 6,
    language: 'Design',
    languages: ['Figma', 'UI Design', 'Wireframing'],
    url: 'https://github.com/Yumna-Gul/ui-design-projects'
  }
];

const GitHub = () => {
  const [isVisible, setIsVisible] = useState(false);
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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const totalStars = repositories.reduce((sum, repo) => sum + repo.stars, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks, 0);

  return (
    <GitHubContainer ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        GitHub Portfolio
      </SectionTitle>

      <GitHubProfile
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <ProfileHeader variants={itemVariants}>
          <Avatar>
            <FaGithub />
          </Avatar>
          <ProfileInfo>
            <ProfileName>Yumna Gul</ProfileName>
            <ProfileBio>
              Computer Science undergraduate passionate about web development, 
              UI/UX design, and data science. Always learning and building innovative projects.
            </ProfileBio>
            <ProfileLink
              href="https://github.com/Yumna-Gul?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub /> Visit GitHub Profile
            </ProfileLink>
          </ProfileInfo>
        </ProfileHeader>

        <StatsGrid variants={itemVariants}>
          <StatCard whileHover={{ scale: 1.05 }}>
            <StatNumber>{repositories.length}</StatNumber>
            <StatLabel>Repositories</StatLabel>
          </StatCard>
          <StatCard whileHover={{ scale: 1.05 }}>
            <StatNumber>{totalStars}</StatNumber>
            <StatLabel>Total Stars</StatLabel>
          </StatCard>
          <StatCard whileHover={{ scale: 1.05 }}>
            <StatNumber>{totalForks}</StatNumber>
            <StatLabel>Total Forks</StatLabel>
          </StatCard>
        </StatsGrid>
      </GitHubProfile>

      <RepositoriesGrid
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {repositories.map((repo, index) => (
          <RepoCard
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <RepoName>
              <FaGithub />
              {repo.name}
            </RepoName>
            <RepoDescription>{repo.description}</RepoDescription>
            
            <RepoStats>
              <RepoStat>
                <FaStar /> {repo.stars}
              </RepoStat>
              <RepoStat>
                <FaCodeBranch /> {repo.forks}
              </RepoStat>
              <RepoStat>
                <FaEye /> {repo.watchers}
              </RepoStat>
            </RepoStats>

            <RepoLanguages>
              {repo.languages.map((lang, langIndex) => (
                <LanguageTag key={langIndex}>{lang}</LanguageTag>
              ))}
            </RepoLanguages>

            <RepoLink
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repository <FaExternalLinkAlt />
            </RepoLink>
          </RepoCard>
        ))}
      </RepositoriesGrid>
    </GitHubContainer>
  );
};

export default GitHub;
