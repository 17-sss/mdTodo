const express = require('express');

const router = express.Router();

// index: [GET, / ] 
    // (auth/login 페이지로 이동. 로그인되어 있다면 todo로 이동)
router.get('/', (req, res) => {
    res.redirect('/auth/login');
});

module.exports = router;