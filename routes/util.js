exports.isUserNotInSession = (noUserRedirectUrl) => (req, res, next) =>
    req.session.user ? next() : res.redirect(noUserRedirectUrl);

exports.isUserInSession = (userRedirectUrl) => (req, res, next) =>
    req.session.user ? res.redirect(userRedirectUrl) : next();

