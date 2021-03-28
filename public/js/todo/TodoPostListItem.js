import _ from '../util.js';
import { fetchData } from '../dataUtil.js';
import TodoViewer from './toast/TodoViewer.js';

class TodoPostListItem {
    constructor(parentWrapper) {
        this.parentWrapper = parentWrapper;
        this.html = '';
        this.viewerAllWrapperId = '';
        this.viewer = null;        
    }

    set setviewerAllWrapperId(viewerAllWrapperId) {
        this.viewerAllWrapperId = viewerAllWrapperId;
    }

    set setHtml(html) {
        this.html = html;
    }

    set setViewer(viewer) {
        this.viewer = viewer;
    }

    init = (options, data, parentWrapper = this.parentWrapper) => {
        const { id, idx } = data;
        const { viewerAllWrapperId } = options;
        this.setviewerAllWrapperId = (viewerAllWrapperId + idx);

        this.setHtml = this.createHtml(this.viewerAllWrapperId, options, data);
        this.insertIntoParentWrapper(parentWrapper, this.html);

        const deleteBtn = _.$(`#${this.viewerAllWrapperId} #todoDelete`);
        this.setPostListItemDelBtnClickEvent(deleteBtn, id);

        this.setViewer = this.createViewer(options, data);
    };

    createHtml = (viewerAllWrapperId, options, data) => {
        const { viewerWrapperId } = options;
        const { id, idx, subject, userDisplayId } = data;

        const html = `
        <div class="card my-2" id="${viewerAllWrapperId}">
            <div class="mb-0 d-flex align-items-center">
                <button
                    class="btn btn-link text-left collapsed"
                    data-toggle="collapse"
                    data-target="#collapse${idx}"
                >
                    ${subject}
                </button>
                <div class="ml-auto mr-3 ft--15">
                    <a href="/todo/update?userId=${userDisplayId}&todoId=${id}" class="text-secondary text-decoration-none">
                        <i class="far fa-edit"></i>
                    </a>
                    <button class="todo__postlist__delete--btn text-secondary" id="todoDelete">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div
                id="collapse${idx}"
                class="collapse border-top"
                data-parent="#accordion"
            >
                <div class="px-3 py-2" id="${viewerWrapperId}"></div>
            </div>
        </div>
        `;
        return html;
    };

    createViewer = (options, data) => {
        const { content } = data;
        const { viewerWrapperId, viewerOptions: viewerTmp } = options;

        const viewerWrapper = _.$(`#${this.viewerAllWrapperId} #${viewerWrapperId}`);
        const viewerOptions = {
            ...viewerTmp,
            content,
        };

        return new TodoViewer(viewerWrapper, viewerOptions);
    };

    insertIntoParentWrapper = (parentWrapper, itemHtml, position = 'beforeend') =>
        parentWrapper.insertAdjacentHTML(position, itemHtml);

    // todo 삭제 버튼 클릭 이벤트
    setPostListItemDelBtnClickEvent = (deleteBtn, todoId) => {
        _.addEvent(deleteBtn, 'click', () =>
            this.postListItemDelBtnClickEventHandler(todoId),
        );
    };

    postListItemDelBtnClickEventHandler = async (todoId) => {
        if (!confirm('해당 글을 삭제하시겠습니까?')) return;

        try {
            const todoDelete = await this.getTodoDeleteResult(todoId);
            const { status } = todoDelete;
            if (status !== 200) 
                return alert('삭제 할 수 없습니다.');

            return location.href = '/todo';
        } catch (error) {            
            console.error(error);            
        }
    };

    getTodoDeleteResult  = async (todoId) => {
        const url = '/todo/startDelete';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ todoId }),
        };
        return await fetchData(url, options);
    };

}

export default TodoPostListItem;
