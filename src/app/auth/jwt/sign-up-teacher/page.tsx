import { CONFIG } from 'src/config-global';

import { JwtSignUpTeacherView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return <JwtSignUpTeacherView />;
}
