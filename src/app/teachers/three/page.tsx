import { CONFIG } from 'src/config-global';

import { QuizessView } from 'src/sections/quizess/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Quizess | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <QuizessView />;
}
