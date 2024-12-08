import { CONFIG } from 'src/config-global';

import Fqa from 'src/sections/landing/fqa';
// ----------------------------------------------------------------------

export const metadata = { title: `Landing - ${CONFIG.site.name}` };

export default function Page() {
  return <Fqa />;
}
