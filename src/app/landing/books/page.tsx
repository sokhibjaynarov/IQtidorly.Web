import { CONFIG } from 'src/config-global';

import { BooksShopView } from 'src/sections/books-shop/books-landing';

// ----------------------------------------------------------------------

export const metadata = { title: `Landing - ${CONFIG.site.name}` };

export default function Page() {
  return <BooksShopView />;
}
