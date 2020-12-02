const express = require("express");
const router = express.Router();
const userService = require("../services/userService");

exports.findAll = async function (req, res, next) {
    try {
        res.status(200).json(await userService.findAll());
    } catch (err) {
        next(err);
    }
};

exports.findById = async (req, res, next) => {
    try {
        res.status(200).json(await userService.findById(req.params.id));
    } catch (err) {
        next(err);
    }
};

exports.create = async (req, res, next) => {
    try {
        res.status(201).json(await userService.create(req.body));
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req,res,next) => {
    try {
        res.status(200).json(await userService.delete(req.params.id));
    } catch (err) {
        next(err);
    }
};

exports.put = async (req, res, next) => {
    try {
        res.status(200).json(await userService.put(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
};
