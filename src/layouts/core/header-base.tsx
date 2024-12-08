import type { NavSectionProps } from 'src/components/nav-section';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';

import { HeaderSection } from './header-section';
import { Searchbar } from '../components/searchbar';
import { MenuButton } from '../components/menu-button';
import { SignInButton } from '../components/sign-in-button';
import { SignUpButton } from '../components/sign-up-button';
import { AccountDrawer } from '../components/account-drawer';
import { SettingsButton } from '../components/settings-button';
import { LanguagePopover } from '../components/language-popover';
import { ContactsPopover } from '../components/contacts-popover';
import { WorkspacesPopover } from '../components/workspaces-popover';
import { NotificationsDrawer } from '../components/notifications-drawer';

import type { HeaderSectionProps } from './header-section';
import type { AccountDrawerProps } from '../components/account-drawer';
import type { ContactsPopoverProps } from '../components/contacts-popover';
import type { LanguagePopoverProps } from '../components/language-popover';
import type { WorkspacesPopoverProps } from '../components/workspaces-popover';
import type { NotificationsDrawerProps } from '../components/notifications-drawer';

// ----------------------------------------------------------------------

export type HeaderBaseProps = HeaderSectionProps & {
  onOpenNav: () => void;
  data?: {
    nav?: NavSectionProps['data'];
    account?: AccountDrawerProps['data'];
    langs?: LanguagePopoverProps['data'];
    contacts?: ContactsPopoverProps['data'];
    workspaces?: WorkspacesPopoverProps['data'];
    notifications?: NotificationsDrawerProps['data'];
  };
  slots?: {
    navMobile?: {
      topArea?: React.ReactNode;
      bottomArea?: React.ReactNode;
    };
  };
  slotsDisplay?: {
    signIn?: boolean;
    signOut?: boolean;
    account?: boolean;
    helpLink?: boolean;
    settings?: boolean;
    purchase?: boolean;
    contacts?: boolean;
    searchbar?: boolean;
    workspaces?: boolean;
    menuButton?: boolean;
    localization?: boolean;
    notifications?: boolean;
  };
};

export function HeaderBase({
  sx,
  data,
  slots,
  slotProps,
  onOpenNav,
  layoutQuery,
  slotsDisplay: {
    signIn = true,
    signOut = false,
    account = false,
    helpLink = false,
    settings = false,
    purchase = true,
    contacts = false,
    searchbar = false,
    workspaces = false,
    menuButton = true,
    localization = true,
    notifications = false,
  } = {},
  ...other
}: HeaderBaseProps) {
  const theme = useTheme();

  return (
    <HeaderSection
      sx={sx}
      layoutQuery={layoutQuery}
      slots={{
        ...slots,
        leftAreaStart: slots?.leftAreaStart,
        leftArea: (
          <>
            {slots?.leftAreaStart}

            {/* -- Menu button -- */}
            {menuButton && (
              <MenuButton
                data-slot="menu-button"
                onClick={onOpenNav}
                sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
              />
            )}

            {/* -- Logo -- */}
            <Logo data-slot="logo" height={24} width={108} href="/landing" />

            {/* -- Workspace popover -- */}
            {workspaces && <WorkspacesPopover data-slot="workspaces" data={data?.workspaces} />}

            {slots?.leftAreaEnd}
          </>
        ),
        rightArea: (
          <Box>
            {slots?.rightAreaStart}

            <Box
              data-area="right"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 2, sm: 3 },
              }}
            >
              {/* -- Help link -- */}
              {helpLink && (
                <Link
                  data-slot="help-link"
                  href={paths.faqs}
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  Need help?
                </Link>
              )}

              {/* -- Searchbar -- */}
              {searchbar && <Searchbar data-slot="searchbar" data={data?.nav} />}

              {/* -- Notifications popover -- */}

              {/* -- Contacts popover -- */}
              {contacts && <ContactsPopover data-slot="contacts" data={data?.contacts} />}

              {/* -- Settings button -- */}
              {settings && <SettingsButton data-slot="settings" />}
              {localization && <LanguagePopover data-slot="localization" data={data?.langs} />}
              {notifications && (
                <NotificationsDrawer data-slot="notifications" data={data?.notifications} />
              )}
              {/* -- Account drawer -- */}
              {account && <AccountDrawer data-slot="account" data={data?.account} />}

              {/* -- Sign in button -- */}

              {signOut && (
                <SignUpButton
                  data-slot="signUp"
                  sx={{ width: { lg: 150, xl: 150 }, height: 48, borderRadius: 2 }}
                />
              )}
              {signIn && (
                <SignInButton
                  data-slot="signIn"
                  sx={{ width: { lg: 150, xl: 150 }, height: 48, borderRadius: 2 }}
                />
              )}
              {/* -- Language popover -- */}

              {/* -- Purchase button -- */}
              {purchase && (
                <Button
                  data-slot="purchase"
                  variant="contained"
                  rel="noopener"
                  target="_blank"
                  href={paths.minimalStore}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
                  }}
                >
                  Purchase
                </Button>
              )}
            </Box>

            {slots?.rightAreaEnd}
          </Box>
        ),
      }}
      slotProps={slotProps}
      {...other}
    />
  );
}
