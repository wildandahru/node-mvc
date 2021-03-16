module.exports = app => {
    const contr = require('../controllers/user.controller.js');
    const authenticateToken = require("../services/auth.middleware.js");

    app.post('/api/insert', authenticateToken, contr.insertData);
    app.put('/api/update', authenticateToken, contr.updateData);
    app.post('/api/delete', authenticateToken, contr.deleteData);
    app.post('/api/register', contr.RegisterData);
    app.post('/api/login', contr.login);
};