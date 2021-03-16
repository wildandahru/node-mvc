require('dotenv').config();

const User_model = require('../models/db.model.js');
const bcrypt = require('bcrypt');
const saltRounds = 8;
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

function generateAccessToken(user) {
  return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1200s' })
}

exports.RegisterData = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let nama = req.body.nama;

    var passHash = bcrypt.hashSync(password, saltRounds);

    User_model.insert(username, passHash, nama, (err, data_register) => {
        if(err) {
            return res.status(401).send({
                message: 'gagal',
                code: '401'
            });
        } else
        return res.status(200).send({
            message: 'OK',
            code: '200'
        });
    });
};

exports.insertData = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let nama = req.body.nama;

    var passHash = bcrypt.hashSync(password, saltRounds);

    User_model.insert(username, passHash, nama, (err, data_insert) => {
        if(err) {
            return res.status(401).send({
                message: 'gagal',
                code: '401'
            });
        } else
        return res.status(200).send({
            message: 'OK',
            code: '200'
        });
    });
};

exports.login = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User_model.login(username, password, (err, login) => {
        if(err) {
            return res.status(401).send({
                message: 'gagal',
                code: '401'
            });
        } else
        var token = generateAccessToken(username);
        return res.status(200).send({
            message: 'OK',
            code: '200',
            token: 'Bearer '+ token
        });
    });
};

exports.updateData = (req, res) => {
    let id = req.body.id_user;
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, saltRounds);
    let nama = req.body.nama;

    if(username == ''){
        return res.status(401).send({
            message: 'Username Tidak Boleh Kosong',
            code: '401'
        });
    }

    if(req.body.password == ''){
        return res.status(401).send({
            message: 'Password Tidak Boleh Kosong',
            code: '401'
        });
    }

    if(nama == ''){
        return res.status(401).send({
            message: 'Nama Tidak Boleh Kosong',
            code: '401'
        });
    }

    User_model.update(id, username, password, nama, (err, update) => {
        if(err) {
            return res.status(401).send({
                message: 'gagal',
                code: '401'
            });
        } else
        return res.status(200).send({
            message: 'OK',
            code: '200'
        });
    });
};

exports.deleteData = (req, res) => {
    let id = req.body.id_user;

    User_model.delete(id, (err, delete_data) => {
        if(err) {
            return res.status(401).send({
                message: 'gagal',
                code: '401'
            });
        } else
        return res.status(200).send({
            message: 'OK',
            code: '200'
        });
    });
};