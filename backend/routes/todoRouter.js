const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todos = require('../models/todos');
const User = require('../models/User');
const verifyToken = require('../check-token');
const todoRouter = express.Router();
todoRouter.use(bodyParser.json());

todoRouter.route('/:id')
    .get(verifyToken, (req, res, next) => {
        User.findById(req.params.id)
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user.todos);
            }, err => next(err))
            .catch((err) => next(err));
    })
    .post(verifyToken, (req, res, next) => {
        User.findById(req.params.id)
            .then((user) => {
                if (user != null) {
                    user.todos.push(req.body);
                }
                user.save()
                    .then((user) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(user);
                    })
            }, err => next(err))
            .catch((err) => next(err));
    });
todoRouter.route('/:userId/:todoId')
.put(verifyToken, (req, res, next) => {
    console.log(req.body, req.params);
    User.findById(req.params.userId)
    .then((user) => {
        console.log(req.body, req.params);
        if (user != null && user.todos.id(req.params.todoId) != null) {
            console.log(req.body, req.params);
            user.todos.id(req.params.todoId).checked = req.body.checked;
            user.save()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response);                
            }, (err) => next(err));
        } else {
            err = new Error('Todo ' + req.params.todoId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
module.exports = todoRouter;