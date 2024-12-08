import { paths } from 'src/routes/paths';

import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  isStaticExport: boolean;
  site: {
    name: string;
    serverUrl: string;
    assetURL: string;
    basePath: string;
    version: string;
  };
  authTeacher: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
  };
  authStudent: {
    method: 'jwt';
    skip: boolean;
    redirectPath: string;
  };

  supabase: { url: string; key: string };
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  site: {
    name: 'Iqtidorly',
    serverUrl: process.env.NEXT_PUBLIC_SERVER_URL ?? '',
    assetURL: process.env.NEXT_PUBLIC_ASSET_URL ?? '',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
    version: packageJson.version,
  },
  isStaticExport: JSON.parse(`${process.env.BUILD_STATIC_EXPORT}`),
  /**
   * Auth
   * @method jwt
   */
  authTeacher: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.dashboard.one,
  },
  authStudent: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.students.root,
  },
  /**
   * Mapbox
   */

  /**
   * Firebase
   */

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  },
};
