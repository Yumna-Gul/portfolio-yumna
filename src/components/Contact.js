import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGithub, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactContainer = styled.div`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactCard = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ContactIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ContactDetails = styled.div`
  flex: 1;
`;

const ContactLabel = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 5px;
`;

const ContactValue = styled.a`
  font-size: 1rem;
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FormContainer = styled(motion.div)`
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.dark};
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 62, 126, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 62, 126, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 15px 30px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(220, 38, 127, 0.3);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled(motion.div)`
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
`;

const SuccessMessage = styled(Message)`
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
`;

const ErrorMessage = styled(Message)`
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.light};
  color: ${props => props.theme.colors.primary};
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.3rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate form submission (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
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

  return (
    <ContactContainer ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Get In Touch
      </SectionTitle>

      <ContactGrid
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <ContactInfo>
          <ContactCard variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            <ContactDetails>
              <ContactLabel>Email</ContactLabel>
              <ContactValue href="mailto:yumnagul.bscsf23@iba-suk.edu.pk">
                yumnagul.bscsf23@iba-suk.edu.pk
              </ContactValue>
            </ContactDetails>
          </ContactCard>

          <ContactCard variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            <ContactDetails>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue href="tel:+923110677922">
                +92 311 0677922
              </ContactValue>
            </ContactDetails>
          </ContactCard>

          <ContactCard variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <ContactIcon>
              <FaGithub />
            </ContactIcon>
            <ContactDetails>
              <ContactLabel>GitHub</ContactLabel>
              <ContactValue 
                href="https://github.com/Yumna-Gul?tab=repositories" 
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/yumnagul
              </ContactValue>
            </ContactDetails>
          </ContactCard>

          <ContactCard variants={itemVariants} whileHover={{ scale: 1.02 }}>
            <ContactIcon>
              <FaMapMarkerAlt />
            </ContactIcon>
            <ContactDetails>
              <ContactLabel>Location</ContactLabel>
              <ContactValue>
                Sukkur, Pakistan
              </ContactValue>
            </ContactDetails>
          </ContactCard>
        </ContactInfo>

        <FormContainer variants={itemVariants}>
          <FormTitle>Send Me a Message</FormTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Your Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Your Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="john@example.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="I'd love to hear from you..."
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </SubmitButton>
          </Form>

          {submitStatus === 'success' && (
            <SuccessMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Thank you for your message! I'll get back to you soon.
            </SuccessMessage>
          )}

          {submitStatus === 'error' && (
            <ErrorMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              Oops! Something went wrong. Please try again.
            </ErrorMessage>
          )}
        </FormContainer>
      </ContactGrid>

      <SocialLinks variants={itemVariants}>
        <SocialLink
          href="https://github.com/Yumna-Gul?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
        >
          <FaGithub />
        </SocialLink>
        <SocialLink
          href="mailto:yumnagul.bscsf23@iba-suk.edu.pk"
          whileHover={{ scale: 1.1 }}
        >
          <FaEnvelope />
        </SocialLink>
      </SocialLinks>
    </ContactContainer>
  );
};

export default Contact;
