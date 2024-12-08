'use client';

// core (MUI)
import { frFR as frFRCore, viVN as viVNCore } from '@mui/material/locale';
// date pickers (MUI)
import { enUS as enUSDate, frFR as frFRDate, viVN as viVNDate } from '@mui/x-date-pickers/locales';
// data grid (MUI)
import {
  enUS as enUSDataGrid,
  frFR as frFRDataGrid,
  viVN as viVNDataGrid,
} from '@mui/x-data-grid/locales';

// ----------------------------------------------------------------------

export const allLangs = [
  {
    value: 'uz',
    label: "O'zbekcha",
    countryCode: 'UZ',
    adapterLocale: 'uz',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
  {
    value: 'qr',
    label: 'Qaraqalpaqsha',
    countryCode: 'QR',
    adapterLocale: 'qr',
    numberFormat: { code: 'qr-QR', currency: 'EUR' },
    systemValue: {
      components: { ...viVNCore.components, ...viVNDate.components, ...viVNDataGrid.components },
    },
  },

  {
    value: 'ru',
    label: 'Русский',
    countryCode: 'RU',
    adapterLocale: 'ru',
    numberFormat: { code: 'ru-Ru', currency: 'EUR' },
    systemValue: {
      components: { ...frFRCore.components, ...frFRDate.components, ...frFRDataGrid.components },
    },
  },
  {
    value: 'en',
    label: 'English',
    countryCode: 'GB',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSDate.components, ...enUSDataGrid.components },
    },
  },
];
