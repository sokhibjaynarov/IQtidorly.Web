import { CONFIG } from 'src/config-global';

import BookTable from 'src/sections/books/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Books Page | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
    return <BookTable />
}
