'use strict'
var jwt = require('jsonwebtoken');
const config =  require('../config');
const Constant = require('../config/constant');
const db = require("../models");
const book_category = db.book_category;
const book = db.books;
const book_tag = db.book_tag;
const tag_relationship =  db.tag_relationship;
let books ={};

books.addBookCategory = async (req, res) => {
    try {

        let { name, name_en, description, description_en } = req.body;

        let blogData = {
            name: name,
            name_en: name_en,
            description: description,
            description_en: description_en
        }

        let result = await book_category.create(blogData);
        if (result) {
            let data = await book_category.findAll({})

            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: Constant.BOOK_CATEGORY_SAVE_SUCCESS,
                data: data
            })
        } else {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: result
            })
        }
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.editBookCategory = async (req, res) => {
    try {

        let { id, name, name_en, description, description_en } = req.body;

        let blogData = {
            name: name,
            name_en: name_en,
            description: description,
            description_en: description_en
        }

        book_category.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {
                result.update(blogData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BOOK_CATEGORY_UPDATED_SUCCESS,
                    data: result
                })

            } else {
                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.deleteBookCategory = async (req, res) => {
    try {

        let { id } = req.body;
        book_category.findOne({
            where: {
                id: id,
                status: 1
            }
        }).then(async (result) => {
            if (result) {
                let blogData = {
                    status: 0

                }
                result.update(blogData)

                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BOOK_CATEGORY_DELETED_SUCCESS,
                    data: result
                })

            } else {
                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
                })
            }

        }).catch(error => {
            return res.json({
                code: Constant.ERROR_CODE,
                massage: Constant.SOMETHING_WENT_WRONG,
                data: error
            })
        })

    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}



module.exports = books;
