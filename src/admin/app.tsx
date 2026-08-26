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
  MediaEmbed,
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
      MediaEmbed
    ],
    toolbar: [
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
          'mediaEmbed',
          '|',
          'undo',
          'redo'
        ],
        mediaEmbed: {
          previewsInData: true,
          extraProviders: [
            {
              // Adding the configuration so that CKEditor can work with links from vk
              name: 'vk',
              // We allow only links from VK, and only to videos
              url: /https?:\/\/(vk\.ru|vkvideo\.ru)\/video[^\s]+/,
              html: (match: RegExpMatchArray) => {
                let videoUrl = match[0];
                // Disabling autoplay video
                videoUrl = videoUrl.replace(/[?&]autoplay=1/, '');

                // In the iframe, using the sandbox and allow parameters, we give only the necessary access for the video to work, and prohibit everything else for additional security
                return `<iframe
                  src=${videoUrl}
                  frameborder="0"
                  allow="fullscreen *; encrypted-media; picture-in-picture; screen-wake-lock;"
                  sandbox="allow-scripts allow-same-origin"
                  allowFullScreen
                ></iframe>`;
              }
            }
          ]
        }
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

  bootstrap(app: any) {
  },
};
