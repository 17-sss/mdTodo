import Editor from '@toast-ui/editor';

class TodoEditor {
    constructor(editorWrapper, editorOptions) {
        this.editorWrapper = editorWrapper;

        const { height, initialEditType, previewStyle, content } = editorOptions;

        this.editor = new Editor({
            el: this.editorWrapper,
            height,
            initialEditType,
            previewStyle,
        });

        content && this.editor.setHtml(content);
    }

    getHtml = () => this.editor.getHtml();
};

export default TodoEditor;
