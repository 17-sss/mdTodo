const express = require('express');
const { isUserNotInSession } = require('./util.js');
const router = express.Router();
const { Todo } = require('../models');

// [1] Main (todo)
// todo: [GET, /todo/ ]
router.get('/', isUserNotInSession('/auth/login'), async (req, res) => {
    const { userid: userDisplayId } = req.session.user;
    res.render('todoPost', { title: 'MD Todo list', userDisplayId });
});

// [2] Write
// todo: [GET, /todo/write ]
router.get('/write', isUserNotInSession('/auth/login'), (req, res) => {
    const { subject } = req.query;
    const { userid: userDisplayId } = req.session.user;
    res.render('todoWrite', {
        title: 'MD Todo list',
        subject: subject || '',
        content: '',
        todoId: -1,
        userDisplayId,
    });
});

// todo: [POST, /todo/write ] (작성 글 전송)
router.post('/write', isUserNotInSession('/auth/login'), async (req, res) => {
    const { subject, content } = req.body;
    const { id: userId } = req.session.user;
    try {
        const createTodo = await Todo.create({ subject, content, userId });
        if (!createTodo) return res.redirect('/todo/write');

        return res.redirect('/todo');
    } catch (error) {
        console.error(error);
    }
});


// [3] Update
// todo: [GET, /todo/update ]
router.get('/update', isUserNotInSession('/auth/login'), async (req, res) => {
    const { id: userPrivateId, userid: userDisplayId } = req.session.user;
    const { userId: queryUserDisplayId, todoId: id } = req.query;
    
    if (queryUserDisplayId !== userDisplayId) return res.redirect('/todo');
    
    try {
        const todoOneData = await Todo.findOne({ 
            where: { id, userId: userPrivateId }
        });
        const { subject, content } = todoOneData;
        
        return res.render('todoWrite', {
            title: 'MD Todo list',
            subject: subject || '',
            content: content || '',
            todoId: id || -1,
            userDisplayId: queryUserDisplayId,
        });
    } catch (error) {
        console.error(error);
    }
});


// todo: [POST, /todo/update ] (수정 글 전송)
router.post('/update', isUserNotInSession('/auth/login'), async (req, res) => {
    const { subject, content, todoId } = req.body;
    const { id: userId } = req.session.user;
    try {
        await Todo.update(
            { subject, content },
            { where: { userId, id: todoId } }
        );

        return res.redirect('/todo');
    } catch (error) {
        console.error(error);
    }
});

// [-] Fetch, POST 요청용 ====================================================================
// todo: [POST, /todo/getUserTodoData ] (Todo 데이터 전부 가져옴) - 메인 (/todo)에 데이터 가져올 때 쓰임
router.post('/getUserTodoData', isUserNotInSession('/auth/login'), async(req, res) => {
    const { id: userId, userid: userDisplayId } = req.session.user;
    try {
        const todoData = await Todo.findAll({ 
            where: { userId },
            attributes: [ 'id', 'subject', 'content' ],
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        
        return res.status(200).json({
            result: true,
            data: todoData,
            userDisplayId,
            message: 'OK',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: '서버에 오류가 있습니다.',
        });
    }
});

// todo: [POST, /todo/startDelete ] (글 삭제 실행 후 성공여부 반환)
router.post('/startDelete', isUserNotInSession('/auth/login'), async (req, res) => {
    const { id: userId } = req.session.user;
    const { todoId } = req.body;

    try {
        await Todo.destroy( { where: {id: todoId, userId } });
        return res.status(200).json({
            result: true,
            message: 'OK',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: '서버에 오류가 있습니다.',
        });
    }
});

module.exports = router;
