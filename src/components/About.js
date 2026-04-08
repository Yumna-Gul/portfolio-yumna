import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDownload, FaGraduationCap, FaCode, FaPalette } from 'react-icons/fa';

const AboutContainer = styled.div`
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const AboutText = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Introduction = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 30px;
`;

const EducationCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const EducationTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const EducationDetails = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.dark};
  margin-bottom: 10px;
`;

const CGPA = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.secondary};
  margin-top: 10px;
`;

const SkillsSection = styled(motion.div)`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const SkillsTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 30px;
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
`;

const SkillCategory = styled.div`
  padding: 20px;
  background: ${props => props.theme.colors.light};
  border-radius: 10px;
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const CategoryTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SkillItem = styled.div`
  margin-bottom: 15px;
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SkillLabel = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
`;

const SkillLevel = styled.span`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;

const SkillBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.colors.gradient};
  border-radius: 4px;
  width: ${props => props.percentage}%;
`;

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  margin-top: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(220, 38, 127, 0.3);
  }
`;

const skills = [
  {
    category: 'Design & UI/UX',
    icon: <FaPalette />,
    items: [
      { name: 'Figma', level: 'Advanced', percentage: 90 },
      { name: 'Wireframing', level: 'Proficient', percentage: 85 },
      { name: 'Logical Design Thinking', level: 'Advanced', percentage: 88 }
    ]
  },
  {
    category: 'Frontend',
    icon: <FaCode />,
    items: [
      { name: 'HTML', level: 'Advanced', percentage: 90 },
      { name: 'CSS', level: 'Proficient', percentage: 85 },
      { name: 'JavaScript', level: 'Intermediate', percentage: 75 }
    ]
  },
  {
    category: 'Programming Languages',
    icon: <FaCode />,
    items: [
      { name: 'Java', level: 'Proficient', percentage: 80 },
      { name: 'Python', level: 'Proficient', percentage: 85 }
    ]
  },
  {
    category: 'Backend & Tools',
    icon: <FaCode />,
    items: [
      { name: 'Supabase', level: 'Intermediate', percentage: 75 },
      { name: 'Streamlit', level: 'Proficient', percentage: 80 },
      { name: 'GitHub', level: 'Advanced', percentage: 90 }
    ]
  }
];

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  const handleDownload = async (e) => {
    e && e.preventDefault();
    const timestamp = new Date().getTime();
    const url = `${process.env.PUBLIC_URL}/Yumna_Gul_CV.pdf?t=${timestamp}`;
    try {
      const res = await fetch(url, { cache: 'no-store' });
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('text/html')) {
        window.open(url, '_blank');
        alert('Server is returning HTML (index.html). This means your host is rewriting unknown paths to index.html — tell me where you host so I can advise.');
        return;
      }
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = 'Yumna_Gul_CV.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download error:', err);
      window.open(url, '_blank');
      alert('Could not download file directly — opened in new tab as fallback.');
    }
  };

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
    <AboutContainer ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        About Me
      </SectionTitle>

      <ContentGrid>
        <AboutText
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <Introduction variants={itemVariants}>
            I am a passionate Computer Science undergraduate in my 6th semester, 
            dedicated to creating innovative digital solutions. With a strong academic 
            record (CGPA: 3.84/4.00) and hands-on experience in web development, 
            UI/UX design, and data science, I strive to bridge the gap between 
            technical excellence and user-centered design.
          </Introduction>

          <EducationCard
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <EducationTitle>
              <FaGraduationCap /> Education
            </EducationTitle>
            <EducationDetails>
              <strong>Bachelor's in Computer Science</strong><br />
              6th Semester<br />
              Institute of Business Administration, Sukkur
            </EducationDetails>
            <CGPA>CGPA: 3.84 / 4.00</CGPA>
          </EducationCard>

          <DownloadButton
            variants={itemVariants}
            href={`${process.env.PUBLIC_URL}/Yumna_Gul_CV.pdf?t=${new Date().getTime()}`}
            onClick={handleDownload}
            download="Yumna_Gul_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload /> Download Full CV
          </DownloadButton>
        </AboutText>

        <SkillsSection
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <SkillsTitle variants={itemVariants}>Technical Skills</SkillsTitle>
          <SkillsGrid>
            {skills.map((category, index) => (
              <SkillCategory key={index} variants={itemVariants}>
                <CategoryTitle>
                  {category.icon} {category.category}
                </CategoryTitle>
                {category.items.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex}>
                    <SkillName>
                      <SkillLabel>{skill.name}</SkillLabel>
                      <SkillLevel>{skill.level}</SkillLevel>
                    </SkillName>
                    <SkillBar>
                      <SkillProgress
                        percentage={skill.percentage}
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${skill.percentage}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + skillIndex * 0.1 }}
                      />
                    </SkillBar>
                  </SkillItem>
                ))}
              </SkillCategory>
            ))}
          </SkillsGrid>
        </SkillsSection>
      </ContentGrid>
    </AboutContainer>
  );
};

export default About;
