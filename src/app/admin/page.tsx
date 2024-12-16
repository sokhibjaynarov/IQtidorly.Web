import { CONFIG } from 'src/config-global';

import { QuestionsView } from 'src/sections/questions/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Admin - ${CONFIG.site.name}` };

export default function Page() {
  return <QuestionsView />;
}
