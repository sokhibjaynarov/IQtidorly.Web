import { CONFIG } from 'src/config-global';

import { JwtOtpView } from 'src/sections/auth/jwt/jwt-otp-view';

// ----------------------------------------------------------------------

export const metadata = { title: `OTP | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return <JwtOtpView />;
}
