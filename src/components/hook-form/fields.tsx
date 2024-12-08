import { RHFSelect } from './rhf-select';
import { RHFEditor } from './rhf-editor';
import { RHFTextField, RHFLatexField } from './rhf-text-field';
import { RHFUpload, RHFUploadBox, RHFUploadAvatar } from './rhf-upload';
import { RHFDatePicker, RHFMobileTimePicker, RHFMobileDateTimePicker } from './rhf-date-picker';

// ----------------------------------------------------------------------

export const Field = {
  Editor: RHFEditor,
  UploadAvatar: RHFUploadAvatar,
  Text: RHFTextField,
  Select: RHFSelect,
  Latex: RHFLatexField,
  Upload: RHFUpload,
  UplodBox: RHFUploadBox,
  DatePicker: RHFDatePicker,
  MobileDateTimePicker: RHFMobileDateTimePicker,
  MobileTimePicker: RHFMobileTimePicker,
};
