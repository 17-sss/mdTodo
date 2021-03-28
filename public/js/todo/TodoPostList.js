import { fetchData } from '../dataUtil.js';
import TodoPostListItem from './TodoPostListItem.js';

class TodoPostList {
    constructor(postListWrapper, postListItemOptions) {
        this.postListWrapper = postListWrapper;
        this.postListItemOptions = postListItemOptions;
    }

    init = () => {
        this.setPostListItems(this.postListWrapper, this.postListItemOptions);
    };

    setPostListItems = async (postListWrapper, postListItemOptions) => {
        const todoData = await this.getUserTodoData();
        const userDisplayId = todoData.userDisplayId;

        todoData.data.forEach((dataTmp, idx) => {
            const data = { ...dataTmp, idx, userDisplayId };
            new TodoPostListItem(postListWrapper).init(postListItemOptions, data);
        });
    };

    // [POST 요청] 유저의 TodoData 가져오기 (서버에서 세션 user id 기준으로 가져옴)
    getUserTodoData = async () => {
        const url = '/todo/getUserTodoData';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        return await fetchData(url, options);
    };
}

export default TodoPostList;
