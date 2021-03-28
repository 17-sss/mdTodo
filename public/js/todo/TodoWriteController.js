import _ from '../util.js';
import TodoEditor from './toast/TodoEditor.js';

class TodoWriteController {
    constructor(todoWriteReference, pathname) {
        this.writeType = pathname.indexOf('write') > -1 ? 'write' : 'update';

        const {
            formWrapper,
            formItems: { subject, content, cancelBtn },
            editorWrapper,
            editorOptions,
        } = todoWriteReference;

        this.formWrapper = _.$(formWrapper);
        this.formItems = {
            subject: _.$(subject, this.formWrapper),
            content: _.$(content, this.formWrapper),
            cancelBtn: _.$(cancelBtn, this.formWrapper),
        };
        this.editorWrapper = _.$(editorWrapper);
        this.editorOptions = {
            ...editorOptions,
            content: this.formItems.content.value || '',
        };
    }

    init = () => {
        const { content, cancelBtn } = this.formItems;
        this.setWriteFormActionAttribute(this.writeType);
        this.setEditor(this.editorWrapper, this.editorOptions);
        this.setWriteFormSubmitEvent(this.formWrapper, content);
        this.setWriteFormCancelClickEvent(cancelBtn);
    };

    // wrireType에 따른 form의 action 속성 설정
    setWriteFormActionAttribute = (writeType) => {
        writeType === 'write' 
            ? _.setAttr(this.formWrapper, 'action', "/todo/write")
            : _.setAttr(this.formWrapper, 'action', "/todo/update")
    };

    // Toast Editor 설정
    setEditor = (editorWrapper, editorOptions) =>
        (this.editor = new TodoEditor(editorWrapper, editorOptions));

    // 글 서버로 전송 (작성 or 수정)
    setWriteFormSubmitEvent = (formWrapper, content) =>
        _.addEvent(formWrapper, 'submit', () => this.writeFormSubmitEventHandler(content));

    // 글 작성 or 수정
    writeFormSubmitEventHandler = (content) => (content.value = this.editor.getHtml().trimEnd());

    // 작성 취소
    setWriteFormCancelClickEvent = (cancelBtn) => {
        _.addEvent(cancelBtn, 'click', () =>
            this.writeFormCancelClickEventHandler(),
        );
    };

    writeFormCancelClickEventHandler = () => (location.href = '/todo');
}

export default TodoWriteController;
