'use client';

import Image from 'next/image';

import { Card, Grid, Typography } from '@mui/material';

const steps = [
  {
    number: '01',
    text: "Ishtirok etish uchun sizga internetga ulangan kompyuter yoki planshet kerak bo'ladi.",
  },
  {
    number: '02',
    text: "Ota-onalar yoki o'qituvchi o'quvchilarni saytda ro'yxatdan o'tkazadi",
  },
  {
    number: '03',
    text: "O'quvchilar web-saytga kirib, olimpiadada qatnashadilar",
  },
];

const HowToApplySection = () => (
  <>
    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'left' }}>
      Qanday qilip olimpiadada qatnashish mumkin?
    </Typography>
    <Typography variant="subtitle1" sx={{ mb: 4, textAlign: 'left', color: 'text.secondary' }}>
      5-11 sinf oʻquvchilari uchun fan olimpiadalari uchun Oʻzbekistondagi eng
      <br /> birinchi platforma
    </Typography>
    <Grid container spacing={10} justifyContent="center" sx={{ position: 'relative' }}>
      {steps.map((step, index) => (
        <Grid item xs={12} md={4} key={index} sx={{ zIndex: 10 }}>
          <Card
            sx={{
              height: 255,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#FFFFFF',
              position: 'relative',
              textAlign: 'center',
              p: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: 72,
                fontWeight: 'bold',
                position: 'absolute',
                top: 16,
                left: 16,
                color: '#E0E0E0',
              }}
            >
              {step.number}
            </Typography>
            <Typography variant="body1" sx={{ mt: 8, zIndex: 1 }}>
              {step.text}
            </Typography>
          </Card>
        </Grid>
      ))}
      <Image
        src="/assets/background/brain.svg"
        width={200}
        height={240}
        alt="brain"
        style={{ position: 'absolute', right: 0, top: -90 }}
      />
      <Image
        src="/assets/background/light.svg"
        width={200}
        height={240}
        alt="brain"
        style={{ position: 'absolute', left: 80, bottom: -135 }}
      />
    </Grid>
  </>
);

export default HowToApplySection;
