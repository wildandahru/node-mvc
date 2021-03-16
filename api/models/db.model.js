const sql = require('./db.js');
const bcrypt = require('bcrypt');

const Model = function(entity) {

  }

Model.register = (username, password, nama, result) => {
    sql.query(`INSERT INTO users (username, password, nama) VALUES ('${username}', '${password}', '${nama}')`, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        console.log('Registering: ', res);
        result(null, res);
        return;
    });
};

Model.insert = (username, password, nama, result) => {
    sql.query(`INSERT INTO users (username, password, nama) VALUES ('${username}', '${password}', '${nama}')`, (err, res) => {
        if(err) {
            console.log('Error: ', err);
            result(err, null);
            return;
        }

        console.log('Inserting: ', res);
        result(null, res);
        return;
    });
};

Model.login = (username, password, result) => {
    sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
        if(err) {
            console.log('Error :', err);
            result(err, null);
            return;
        }

        if(res.length) {
            var checkPass = bcrypt.compareSync(password, res[0].password);
            if(!checkPass) {
                result({ kind: 'not_found'}, null);
                return;
            } else {
                console.log('Data: ', res);
                result(null, res);
                return;
            }
        }

        result({ kind: 'not_found'}, null);
    });
};

Model.update = (id, username, password, nama, result) => {
    sql.query(`UPDATE users SET username = '${username}', password = '${password}', nama = '${nama}' WHERE id_user = '${id}'`, (err, res) => {
        if(err) {
            console.log('Error :', err);
            result(err, null);
            return;
        }

        console.log('Updating :', res);
        result(null, res);
        return;
    });
};

Model.delete = (id, result) => {
    sql.query(`DELETE FROM users WHERE id_user = '${id}'`, (err, res) => {
        if(err) {
            console.log('Error :', err);
            result(err, null);
            return;
        }

        console.log('Deleting :', res);
        result(null, res);
        return;
    });
};

module.exports = Model;