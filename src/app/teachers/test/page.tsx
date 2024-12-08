import { CONFIG } from 'src/config-global';

import { QuestionsView } from 'src/sections/questions/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Test | Teacher - ${CONFIG.site.name}` };

export default function Page() {
  return <QuestionsView />;
}
