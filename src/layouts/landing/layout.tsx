'use client';

import type { SettingsState } from 'src/components/settings';
import type { NavSectionProps } from 'src/components/nav-section';
import type { Theme, SxProps, CSSObject, Breakpoint } from '@mui/material/styles';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { iconButtonClasses } from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { allLangs } from 'src/locales';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { bulletColor } from 'src/components/nav-section';
import { useSettingsContext } from 'src/components/settings';

import Footer from 'src/sections/landing/landing-footer/landing-footer-view';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';
import { NavMobileLanding } from './nav-mobile-landing';
import { NavHorizontal } from '../dashboard/nav-horizontal';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  data?: {
    nav?: NavSectionProps['data'];
  };
};

export function LandingLayout({ sx, children, data }: DashboardLayoutProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const mobileNavOpen = useBoolean();

  const settings = useSettingsContext();

  const navColorVars = useNavColorVars(theme, settings);

  const layoutQuery: Breakpoint = 'md';

  const isNavMini = settings.navLayout === 'mini';

  return (
    <>
      <NavMobileLanding
        data={[
          {
            items: [
              { title: t('quizess'), path: '/' },
              { title: t('reting'), path: '/' },
              { title: t('source'), path: '/' },
              { title: t('shop'), path: '/landing/books' },
              { title: t('edu'), path: '/' },
              { title: t('help'), path: '/' },
            ],
          },
        ]}
        open={mobileNavOpen.value}
        onClose={mobileNavOpen.onFalse}
        cssVars={navColorVars.section}
      />

      <LayoutSection
        /** **************************************
         * Header
         *************************************** */
        headerSection={
          <HeaderBase
            layoutQuery={layoutQuery}
            onOpenNav={mobileNavOpen.onTrue}
            data={{
              nav: [
                {
                  items: [
                    { title: t('quizess'), path: '/' },
                    { title: t('reting'), path: '/' },
                    { title: t('source'), path: '/' },
                    { title: t('shop'), path: '/landing/books' },
                    { title: t('edu'), path: '/' },
                    { title: t('help'), path: '/' },
                  ],
                },
              ],
              langs: allLangs,
            }}
            slotsDisplay={{
              signOut: true,
              signIn: true,
              purchase: false,
              helpLink: false,
            }}
            slots={{
              topArea: (
                <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                  This is an info Alert.
                </Alert>
              ),
              centerArea: (
                <NavHorizontal
                  data={[
                    {
                      items: [
                        { title: t('quizess'), path: '/' },
                        { title: t('reting'), path: '/' },
                        { title: t('source'), path: '/' },
                        { title: t('shop'), path: '/landing/books' },
                        { title: t('edu'), path: '/' },
                        { title: t('help'), path: '/' },
                      ],
                    },
                  ]}
                  layoutQuery={layoutQuery}
                  cssVars={navColorVars.section}
                />
              ),
            }}
            slotProps={{
              toolbar: {
                sx: {
                  [`& [data-area="right"]`]: {
                    gap: { xs: 0, sm: 0.75 },
                  },
                  ...{
                    bgcolor: 'var(--layout-nav-bg)',
                    [`& .${iconButtonClasses.root}`]: {
                      color: 'var(--layout-nav-text-secondary-color)',
                    },
                    [theme.breakpoints.up(layoutQuery)]: {
                      height: 'var(--layout-nav-horizontal-height)',
                    },
                    [`& [data-slot="workspaces"]`]: {
                      color: 'var(--layout-nav-text-primary-color)',
                    },
                    [`& [data-slot="logo"]`]: {
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
                    },
                    [`& [data-slot="signUp"]`]: {
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
                    },
                    [`& [data-slot="divider"]`]: {
                      [theme.breakpoints.up(layoutQuery)]: {
                        display: 'flex',
                      },
                    },
                  },
                },
              },
              container: {
                maxWidth: false,
              },
            }}
          />
        }
        /** **************************************
         * Sidebar
         *************************************** */

        /** **************************************
         * Footer
         *************************************** */
        footerSection={<Footer />}
        /** **************************************
         * Style
         *************************************** */
        cssVars={{
          ...navColorVars.layout,
          '--layout-transition-easing': 'linear',
          '--layout-transition-duration': '120ms',
          '--layout-nav-mini-width': '88px',
          '--layout-nav-vertical-width': '300px',
          '--layout-nav-horizontal-height': '96px',
          '--layout-dashboard-content-pt': theme.spacing(1),
          '--layout-dashboard-content-pb': theme.spacing(8),
          '--layout-dashboard-content-px': theme.spacing(5),
        }}
        sx={{
          [`& .${layoutClasses.hasSidebar}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
              pl: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
            },
          },
          ...sx,
        }}
      >
        <Main isNavHorizontal>{children}</Main>
      </LayoutSection>
    </>
  );
}

// ----------------------------------------------------------------------

function useNavColorVars(
  theme: Theme,
  settings: SettingsState
): Record<'layout' | 'section', CSSObject> {
  const {
    vars: { palette },
  } = theme;

  return useMemo(() => {
    switch (settings.navColor) {
      case 'integrate':
        return {
          layout: {
            '--layout-nav-bg': palette.background.default,
            '--layout-nav-horizontal-bg': varAlpha(palette.background.defaultChannel, 0.8),
            '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.12),
            '--layout-nav-text-primary-color': palette.text.primary,
            '--layout-nav-text-secondary-color': palette.text.secondary,
            '--layout-nav-text-disabled-color': palette.text.disabled,
            [stylesMode.dark]: {
              '--layout-nav-border-color': varAlpha(palette.grey['500Channel'], 0.08),
              '--layout-nav-horizontal-bg': varAlpha(palette.background.defaultChannel, 0.96),
            },
          },
          section: {},
        };
      case 'apparent':
        return {
          layout: {
            '--layout-nav-bg': palette.grey[900],
            '--layout-nav-horizontal-bg': varAlpha(palette.grey['900Channel'], 0.96),
            '--layout-nav-border-color': 'transparent',
            '--layout-nav-text-primary-color': palette.common.white,
            '--layout-nav-text-secondary-color': palette.grey[500],
            '--layout-nav-text-disabled-color': palette.grey[600],
            [stylesMode.dark]: {
              '--layout-nav-bg': palette.grey[800],
              '--layout-nav-horizontal-bg': varAlpha(palette.grey['800Channel'], 0.8),
            },
          },
          section: {
            // caption
            '--nav-item-caption-color': palette.grey[600],
            // subheader
            '--nav-subheader-color': palette.grey[600],
            '--nav-subheader-hover-color': palette.common.white,
            // item
            '--nav-item-color': palette.grey[500],
            '--nav-item-root-active-color': palette.primary.light,
            '--nav-item-root-open-color': palette.common.white,
            // bullet
            '--nav-bullet-light-color': bulletColor.dark,
            // sub
            ...(settings.navLayout === 'vertical' && {
              '--nav-item-sub-active-color': palette.common.white,
              '--nav-item-sub-open-color': palette.common.white,
            }),
          },
        };
      default:
        throw new Error(`Invalid color: ${settings.navColor}`);
    }
  }, [
    palette.background.default,
    palette.background.defaultChannel,
    palette.common.white,
    palette.grey,
    palette.primary.light,
    palette.text.disabled,
    palette.text.primary,
    palette.text.secondary,
    settings.navColor,
    settings.navLayout,
  ]);
}
