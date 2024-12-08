import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Box, Container, Typography } from '@mui/material';

const Fqa = () => (
  <Box
    sx={{
      bgcolor: '#f4f6f8',
      width: '100%',
      minHeight: '100vh',
    }}
  >
    <Container>
      <Box
        sx={{
          mt: 10,
          width: 48,
          height: 48,
          borderRadius: 50,
          bgcolor: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href="/landing">
          <Image src="/assets/bacl.png" width={7} height={14} alt="image" />
        </Link>
      </Box>

      <Box
        sx={{
          p: '32px',
          bgcolor: '#fff',
          mt: 5,
          mb: 10,
          borderRadius: '16px',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            fontSize: '40px',
            lineHeight: '56px',
            mb: 5,
            display: 'block',
          }}
        >
          Foydalanuvchi shartlari va ommaviy offerta
        </Typography>
        <Typography variant="body1">
          When you use our services, you re trusting us with your information. We understand this is
          a big responsibility and work hard to protect your information and put you in control.{' '}
          <br /> This Privacy Policy is meant to help you understand what information we collect,
          why we collect it, and how you can update, manage, export, and delete your information.
          <br /> Privacy Checkup
          <br /> Looking to change your privacy settings?
          <br /> Take the Privacy Checkup <br /> Effective March 28, 2024 Archived versions Download
          PDF <br /> We build a range of services that help millions of people daily to explore and
          interact with the world in new ways. Our services include:
          <br />
          <Typography variant="body1">
            Google apps, sites, and devices, like Search, YouTube, and Google Home
          </Typography>
          Platforms like the Chrome browser and Android operating system Products that are
          integrated into third-party apps and sites, like ads, analytics, and embedded Google Maps
          You can use our services in a variety of ways to manage your privacy. For example, you can
          sign up for a Google Account if you want to create and manage content like emails and
          photos, or see more relevant search results. And you can use many Google services when
          you&apos;re signed out or without creating an account at all, like searching on Google or
          watching YouTube videos. You can also choose to browse the web in a private mode, like
          Chrome Incognito mode, which helps keep your browsing private from other people who use
          your device. And across our services, you can adjust your privacy settings to control
          whether we collect some types of data and how we use it. To help explain things as clearly
          as possible, we&apos;ve added examples, explanatory videos, and definitions for key terms.
          And if you have any questions about this Privacy Policy, you can contact us.
        </Typography>
        <Typography variant="body1">
          When you use our services, you re trusting us with your information. We understand this is
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
          relevant search results. And you can use many Google services when you re signed out or
          without creating an account at all, like searching on Google or watching YouTube videos.
          You can also choose to browse the web in a private mode, like Chrome Incognito mode, which
          helps keep your browsing private from other people who use your device. And across our
          services, you can adjust your privacy settings to control whether we collect some types of
          data and how we use it. To help explain things as clearly as possible, we ve added
          examples, explanatory videos, and definitions for key terms. And if you have any questions
          about this Privacy Policy, you can contact us.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default Fqa;
