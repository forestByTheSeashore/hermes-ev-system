import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

import { SitemarkIcon } from './CustomIcons';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Seamless Access',
    description:
      'Effortlessly log in to your account with just a few clicks, setting you on the road to an enhanced driving experience.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Enhanced Security',
    description:
      'Rest easy knowing your personal information is protected by state-of-the-art security features designed for your peace of mind.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Intuitive Interface',
    description:
      'Navigate through your account with ease, thanks to a user-friendly design that makes managing your vehicle\'s details a breeze.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Innovative Features',
    description:
      'Stay connected with cutting-edge tools and personalized options that evolve with your needs, helping you get the most out of your vehicle.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        alignSelf: 'center',
        gap: 4,
        maxWidth: 450,
        width: '100%', // Ensure it takes full width on smaller screens
        padding: { xs: 2, md: 0 }, // Adjust padding on smaller screens
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SitemarkIcon />
      </Box>
      {items.map((item, index) => (
        <Stack
          key={index}
          direction={{ xs: 'column', sm: 'row' }} // Stack vertically on small screens, horizontally on larger ones
          sx={{ gap: 2, alignItems: 'flex-start' }}
        >
          {item.icon}
          <div>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 'medium',
                fontSize: { xs: 'h6.fontSize', sm: 'body1.fontSize' }, // Font size adjustment based on screen size
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', fontSize: { xs: 'body2.fontSize', sm: 'body1.fontSize' } }}
            >
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}