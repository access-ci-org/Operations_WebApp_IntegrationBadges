import {
    ClassicEditor, Underline, BlockQuote, Link, List, Heading, Bold, Essentials, Italic, Paragraph
} from 'ckeditor5';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import React, {useEffect, useState} from "react";
import parseHtmlToReact from 'html-react-parser';
import {htmlToText} from 'html-to-text';

export function BasicFormattedTextEditor({onChange, data}) {

    return <CKEditor
        editor={ClassicEditor}
        config={{
            licenseKey: 'GPL',
            plugins: [Heading, BlockQuote, Essentials, Bold, Italic, Paragraph, Underline, Link, List],
            toolbar: ['heading', '|', "underline", 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', '|',
                'blockQuote', 'undo', 'redo'],

        }}

        data={data}
        onReady={editor => {
            // console.log('Editor is ready to use!', editor);

            // Access the editor instance and set the height
            editor.editing.view.change(writer => {
                writer.setStyle('height', '200px', editor.editing.view.document.getRoot());
            });
        }}
        onChange={(event, editor) => {
            const data = editor.getData();

            // console.log("editor onChange", {event, editor, data});

            !!onChange && onChange(data);
        }}
    />
}

export function HtmlToReact({children}) {
    if (!children || typeof children !== "string") children = "";

    return parseHtmlToReact(children)
}

export function HtmlToText({children}) {
    if (!children || typeof children !== "string") children = "";

    return htmlToText(children);
}
