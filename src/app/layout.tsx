import 'src/global.css';

// ----------------------------------------------------------------------

import type { Viewport } from 'next';

import Script from 'next/script';
import { QueryClientProvider } from '@tanstack/react-query';

import { CONFIG } from 'src/config-global';
import { primary } from 'src/theme/core/palette';
import { queryClient } from 'src/service/react-query';
import { ThemeProvider } from 'src/theme/theme-provider';
import { I18nProvider, LocalizationProvider } from 'src/locales';
import { getInitColorSchemeScript } from 'src/theme/color-scheme-script';

import { Snackbar } from 'src/components/snackbar';
import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { UserAuthProvider } from 'src/components/user-auth/user-auth-provider';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {getInitColorSchemeScript}

        <I18nProvider>
          <LocalizationProvider>
            <QueryClientProvider client={queryClient}>
              <UserAuthProvider>
                <AuthProvider>
                  <SettingsProvider
                    settings={defaultSettings}
                    caches={CONFIG.isStaticExport ? 'localStorage' : 'cookie'}
                  >
                    <ThemeProvider>
                      <MotionLazy>
                        <Snackbar />
                        <ProgressBar />
                        <SettingsDrawer />
                        {children}
                      </MotionLazy>
                    </ThemeProvider>
                  </SettingsProvider>
                </AuthProvider>
              </UserAuthProvider>
            </QueryClientProvider>
          </LocalizationProvider>
        </I18nProvider>
        <Script
          id="disable-right-click"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
              });
            `,
          }}
        />
        <Script
          id="disable-copy"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('copy', function(e) {
                e.preventDefault();
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
