import Editor from '@toast-ui/editor';

class TodoPostViewer {
    constructor(viewerWrapper, viewerOptions) {
        this.viewerWrapper = viewerWrapper;
        this.viewerOptions = viewerOptions;
        
        const { height, content: initialValue } = viewerOptions;
        this.editor = new Editor.factory({
            el: this.viewerWrapper,
            viewer: true,
            height,
            initialValue,
        });
    }    
};

export default TodoPostViewer;
