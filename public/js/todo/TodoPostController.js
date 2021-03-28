import _ from '../util.js';
import TodoPostList from "./TodoPostList.js";

class TodoPostController {
    constructor(todoPostReference) {
        const {
            postingWrapper,
            postingItems: { subject, addBtn },
            postListWrapper,
            postListItemOptions,
        } = todoPostReference;

        this.postingWrapper = _.$(postingWrapper);
        this.postingItems = {
            subject: _.$(subject, this.postingWrapper),
            addBtn: _.$(addBtn, this.postingWrapper)
        };

        // TodoPostList에서 쓰임
        this.postListWrapper = _.$(postListWrapper);
        this.postListItemOptions = postListItemOptions;
        // -----        
    }

    init = () => {
        const { subject, addBtn } = this.postingItems;
        this.setPostingAddBtnClickEvent(subject, addBtn);  
        this.setTodoPostList(this.postListWrapper, this.postListItemOptions);
    };

    // [Posting] Add 버튼 클릭 이벤트
    setPostingAddBtnClickEvent = (subject, addBtn) => {
        _.addEvent(addBtn, 'click', () =>
            this.postingAddBtnClickEventHandler(subject),
        );
    };

    postingAddBtnClickEventHandler = (subject) => {
        // form의 POST 요청으로 할까했지만 굳이..
        const movePath = '/todo/write';
        location.href = subject.value
            ? `${movePath}?subject=${subject.value}`
            : movePath;
    };

    // [Postlist] TodoPostList (+TodoPostListItem) 세팅 
    setTodoPostList = (postListWrapper, postListItemOptions) => {        
        new TodoPostList(postListWrapper, postListItemOptions).init();
    }; 
        

}

export default TodoPostController;
