const CKEConfig = () => ({
    presets: {
        default: {
            editorConfig: {
                plugins: [
                    globalThis.SH_CKE.Alignment,
                    globalThis.SH_CKE.Autoformat,
                    globalThis.SH_CKE.AutoImage,
                    globalThis.SH_CKE.BlockQuote,
                    globalThis.SH_CKE.Bold,
                    globalThis.SH_CKE.Essentials,
                    globalThis.SH_CKE.GeneralHtmlSupport,
                    globalThis.SH_CKE.Heading,
                    globalThis.SH_CKE.Image,
                    globalThis.SH_CKE.ImageCaption,
                    globalThis.SH_CKE.ImageInsert,
                    globalThis.SH_CKE.ImageResize,
                    globalThis.SH_CKE.ImageStyle,
                    globalThis.SH_CKE.ImageToolbar,
                    globalThis.SH_CKE.ImageUpload,
                    globalThis.SH_CKE.Indent,
                    globalThis.SH_CKE.IndentBlock,
                    globalThis.SH_CKE.Italic,
                    globalThis.SH_CKE.List,
                    globalThis.SH_CKE.ListProperties,
                    globalThis.SH_CKE.Link,
                    globalThis.SH_CKE.LinkImage,
                    globalThis.SH_CKE.LinkImage,
                    globalThis.SH_CKE.MediaEmbed,
                    globalThis.SH_CKE.PageBreak,
                    globalThis.SH_CKE.Paragraph,
                    globalThis.SH_CKE.PasteFromOffice,
                    globalThis.SH_CKE.PictureEditing,
                    globalThis.SH_CKE.RemoveFormat,
                    globalThis.SH_CKE.SourceEditing,
                    globalThis.SH_CKE.SpecialCharacters,
                    globalThis.SH_CKE.SpecialCharactersArrows,
                    globalThis.SH_CKE.SpecialCharactersCurrency,
                    globalThis.SH_CKE.SpecialCharactersLatin,
                    globalThis.SH_CKE.SpecialCharactersMathematical,
                    globalThis.SH_CKE.SpecialCharactersText,
                    globalThis.SH_CKE.StrapiMediaLib,
                    globalThis.SH_CKE.StrapiUploadAdapter,
                    globalThis.SH_CKE.Strikethrough,
                    globalThis.SH_CKE.Style,
                    globalThis.SH_CKE.Subscript,
                    globalThis.SH_CKE.Superscript,
                    globalThis.SH_CKE.ShowBlocks,
                    globalThis.SH_CKE.Underline,
                    globalThis.SH_CKE.WordCount,
                ],
                toolbar: {
                    items: [
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
                    shouldNotGroupWhenFull: true
                },
            }
        }
    }
})