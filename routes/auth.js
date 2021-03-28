// 현재 비번 암호화 안되어있음. 할게 너무 많아서 일단 미룸.. (bcrypt)
// Passport 시도했다가 확실한 이해불가. 나중에 다시하기

const express = require('express');
const { isUserInSession } = require('./util.js');
const router = express.Router();
const { User } = require('../models');

// Login
// auth: [GET, /auth/login ]
router.get('/login', isUserInSession('/todo'), (req, res) => {
    res.render('login', { title: 'MD Todo list' });
});

// auth: [POST, /auth/login ]
router.post('/login', isUserInSession('/todo'), async (req, res) => {
    const { userid, userpwd } = req.body;
    
    try {
        const checkUser = await User.findOne({ where: { userid, userpwd } });
        if (!checkUser)
            return res.redirect('login');

        req.session.user = { id: checkUser.id, userid: checkUser.userid };
        return res.redirect('/todo');
    } catch (error) {
        console.error(error);
    }
    
});

// auth: [POST, /auth/userCheck ], 로그인 전 계정 확인.
router.post('/userCheck', async (req, res) => {
    const { userid, userpwd } = req.body;
    try {
        const isUser = await User.findOne({ where: { userid, userpwd } });        
        if (!isUser)
            return res.status(401).json({ result: false, message: '계정이 없거나, 정보를 잘못 입력하셨습니다.' });    

        return res.status(200).json({ result: true, message: 'OK' });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: '서버에 오류가 있습니다.',
        });
    }
});

// ----------------------------------------------------------
// Logout
// auth: [GET, /auth/logout ]
router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy((err) =>
            err ? console.error(err) : res.redirect('login'),
        );
    } else {
        res.redirect('login');
    }
})

// ----------------------------------------------------------

// Register
// auth: [GET, /auth/register ]
router.get('/register', isUserInSession('/todo'), (req, res) => {
    res.render('register', {  title: 'MD Todo list' });
});

// auth: [POST, /auth/register ]
router.post('/register', isUserInSession('/todo'), async (req, res) => {
    const { userid, userpwd } = req.body;

    try {
        const exUser = await User.findOne({ where: { userid } });
        if (exUser)
            return res.redirect('register');

        const createUser = await User.create({ userid, userpwd });
        if (!createUser)
            return res.redirect('register');
        
        req.session.user = { id: createUser.id, userid: createUser.userid };
        return res.redirect('/todo');
    } catch (error) {
        console.error(error);
    }

});

// auth: [POST, /auth/isDuplicateID ], 아이디 중복확인
router.post('/isDuplicateID', async (req, res) => {
    const { userid } = req.body;
    try {
        const exUser = await User.findOne({ where: { userid } });        
        if (exUser)
            return res.status(409).json({ result: true, message: '이미 가입된 아이디입니다.' });    

        return res.status(200).json({ result: false, message: 'OK' });
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            result: false,
            message: '서버에 오류가 있습니다.',
        });
    }
});



module.exports = router;
