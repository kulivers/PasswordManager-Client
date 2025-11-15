import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from './Button';

interface PrivacyPolicyProps {
  open: boolean;
  onClose: () => void;
}

const StyledDialogTitle = styled(DialogTitle)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '16px',
  borderBottom: '1px solid #e2e8f0',
});

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  maxHeight: '70vh',
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const SectionTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#0f172a',
  marginBottom: '12px',
});

const SectionContent = styled(Typography)({
  fontSize: '1rem',
  color: '#334155',
  lineHeight: 1.6,
});

const UpdateDate = styled(Typography)({
  fontSize: '0.875rem',
  color: '#64748b',
  marginBottom: '24px',
});

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          maxHeight: '90vh',
        },
      }}
    >
      <StyledDialogTitle>
        <Typography variant="h5" fontWeight={700} color="#0f172a">
          Privacy Policy
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      
      <StyledDialogContent>
        <UpdateDate>Last updated: {new Date().toLocaleDateString()}</UpdateDate>

        <Section>
          <SectionTitle>1. Information We Collect</SectionTitle>
          <SectionContent>
            We collect information that you provide directly to us, including your name, email address, and any other information you choose to provide when registering for an account with PasswordManager.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>2. How We Use Your Information</SectionTitle>
          <SectionContent>
            We use the information we collect to provide, maintain, and improve our services, process your registration, send you technical notices and support messages, and for any other purpose for which the information was collected.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>3. Information Sharing</SectionTitle>
          <SectionContent>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>4. Data Security</SectionTitle>
          <SectionContent>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>5. Your Rights</SectionTitle>
          <SectionContent>
            You have the right to access, correct, or delete your personal information at any time. You may also opt out of receiving marketing communications from us by following the unsubscribe instructions in such messages.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>6. Cookies and Tracking</SectionTitle>
          <SectionContent>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>7. Third-Party Links</SectionTitle>
          <SectionContent>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>8. Changes to This Policy</SectionTitle>
          <SectionContent>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>9. Contact Us</SectionTitle>
          <SectionContent>
            If you have any questions about this Privacy Policy, please contact us at privacy@passwordmanager.com
          </SectionContent>
        </Section>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} variant="primary">
            Close
          </Button>
        </Box>
      </StyledDialogContent>
    </Dialog>
  );
};

