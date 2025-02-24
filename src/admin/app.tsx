
import {
  type PluginConfig,
  setPluginConfig,
  defaultHtmlPreset
} from '@_sh/strapi-plugin-ckeditor';

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

  bootstrap(app: any) {
    console.log(app);
  },
};
