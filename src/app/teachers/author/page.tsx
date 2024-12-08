import { CONFIG } from 'src/config-global';

import AuthorTable from 'src/sections/authors/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Author Page | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return <AuthorTable />
}