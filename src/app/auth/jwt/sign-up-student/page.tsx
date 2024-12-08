import { CONFIG } from 'src/config-global';

import { JwtSignUpStudentView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign up | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return <JwtSignUpStudentView />;
}
