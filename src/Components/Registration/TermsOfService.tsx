import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from './Button';

interface TermsOfServiceProps {
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

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ open, onClose }) => {
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
          Terms of Service
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      
      <StyledDialogContent>
        <UpdateDate>Last updated: {new Date().toLocaleDateString()}</UpdateDate>

        <Section>
          <SectionTitle>1. Agreement to Terms</SectionTitle>
          <SectionContent>
            By accessing and using PasswordManager ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>2. Use License</SectionTitle>
          <SectionContent>
            Permission is granted to temporarily access the materials on PasswordManager for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>3. User Accounts</SectionTitle>
          <SectionContent>
            You are responsible for maintaining the security of your account and password. You agree to provide accurate, current, and complete information during the registration process.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>4. Prohibited Uses</SectionTitle>
          <SectionContent>
            You may not use the Service for any unlawful purpose or to solicit others to perform unlawful acts. You agree not to violate any local, state, national, or international law or regulation.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>5. Disclaimer</SectionTitle>
          <SectionContent>
            The materials on PasswordManager are provided on an 'as is' basis. PasswordManager makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>6. Limitations</SectionTitle>
          <SectionContent>
            In no event shall PasswordManager or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PasswordManager.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>7. Revisions and Errata</SectionTitle>
          <SectionContent>
            The materials appearing on PasswordManager could include technical, typographical, or photographic errors. PasswordManager does not warrant that any of the materials on its website are accurate, complete, or current.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>8. Contact Information</SectionTitle>
          <SectionContent>
            If you have any questions about these Terms of Service, please contact us at support@passwordmanager.com
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

