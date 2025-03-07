import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Essentials,
  Heading,
  Link,
  List,
  ListProperties,
  Paragraph,
  ShowBlocks,
  Indent,
  IndentBlock,
} from 'ckeditor5';

import {
  type PluginConfig,
  type Preset,
  setPluginConfig,
  defaultHtmlPreset,
} from '@_sh/strapi-plugin-ckeditor';

const withoutImagesPreset: Preset = {
  name: 'withoutImagesPreset',
  description: 'withoutImagesPreset',
  editorConfig: {
    licenseKey: 'GPL',
    plugins: [
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Essentials,
      Heading,
      Link,
      List,
      ListProperties,
      Paragraph,
      ShowBlocks,
      Indent,
      IndentBlock,
    ],
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      'link',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'showBlocks',
      'outdent',
      'indent',
      '|',
      'undo',
      'redo',
    ],
  },
};

const CKEConfig = (): PluginConfig => ({
  presets: [
    {
      ...defaultHtmlPreset,

      /**
       * If you use default preset and haven't updated your schemas to replace
       * the `default` preset with `defaultHtml`, you can change `name`
       * in defaultHtmlPreset to 'default' to avoid missing preset error.
       */
      // name: 'default',

      editorConfig: {
        ...defaultHtmlPreset.editorConfig,
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'strikethrough',
          'underline',
          'link',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'uploadImage',
          'strapiMediaLib',
          'showBlocks',
          '-',
          '|',
          'outdent',
          'indent',
          '|',
          'undo',
          'redo'
        ],
      },
    },
    withoutImagesPreset,
  ],
  // theme: {},
});

export default {
  config: {
    locales: [
      'ru',
    ],
  },
  register() {
    const myConfig = CKEConfig();
    setPluginConfig(myConfig);
  },

  bootstrap(app: any) {},
};
