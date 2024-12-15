import { CONFIG } from 'src/config-global';

import CreateAuthorView from 'src/sections/authors/content/create-author';



// ----------------------------------------------------------------------

export const metadata = { title: `Author | Teacher - ${CONFIG.site.name}` };

export default function Page() {
    return <CreateAuthorView />;
}
