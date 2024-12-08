'use client';

import { Box, Card, Typography } from '@mui/material';

const AboutSection = () => (
  <Card>
    <Box sx={{ flex: 1, zIndex: 1, ml: 4, mt: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 4 }}>
        Olimpiada haqida
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1">Farzandingiz olimpiadada qatnashishi osonlashadi</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1">Olimpiada shaffof o’tishi to’liq kafolatlanadi</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1">
          When you use our services, you’re trusting us with your information. We understand this is
          a big responsibility and work hard to protect your information and put you in control.
          This Privacy Policy is meant to help you understand what information we collect, why we
          collect it, and how you can update, manage, export, and delete your information. Privacy
          Checkup Looking to change your privacy settings? Take the Privacy Checkup Effective March
          28, 2024 Archived versions Download PDF We build a range of services that help millions of
          people daily to explore and interact with the world in new ways. Our services include:
          Google apps, sites, and devices, like Search, YouTube, and Google Home Platforms like the
          Chrome browser and Android operating system Products that are integrated into third-party
          apps and sites, like ads, analytics, and embedded Google Maps You can use our services in
          a variety of ways to manage your privacy. For example, you can sign up for a Google
          Account if you want to create and manage content like emails and photos, or see more
          relevant search results. And you can use many Google services when you’re signed out or
          without creating an account at all, like searching on Google or watching YouTube videos.
          You can also choose to browse the web in a private mode, like Chrome Incognito mode, which
          helps keep your browsing private from other people who use your device. And across our
          services, you can adjust your privacy settings to control whether we collect some types of
          data and how we use it. To help explain things as clearly as possible, we’ve added
          examples, explanatory videos, and definitions forkey terms. And if you have any questions
          about this Privacy Policy, you can contact us.
        </Typography>
      </Box>
    </Box>
  </Card>
);

export default AboutSection;
