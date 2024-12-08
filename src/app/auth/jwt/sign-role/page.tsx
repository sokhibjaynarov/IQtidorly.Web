import { CONFIG } from 'src/config-global';

import { JwtSignRoleView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = { title: `Sign role | Jwt - ${CONFIG.site.name}` };

export default function Page() {
  return <JwtSignRoleView />;
}
