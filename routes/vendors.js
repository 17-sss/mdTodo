const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/bootstrap', express.static(path.join(__dirname,"../node_modules/bootstrap/dist")));
router.use('/jquery', express.static(path.join(__dirname,"../node_modules/jquery/dist")));
router.use('/editor', express.static(path.join(__dirname,"../node_modules/@toast-ui/editor/dist")));
router.use('/codemirror', express.static(path.join(__dirname,"../lib/codemirror")));
router.use('/fontawesome', express.static(path.join(__dirname,"../node_modules/@fortawesome/fontawesome-free")));

module.exports = router;