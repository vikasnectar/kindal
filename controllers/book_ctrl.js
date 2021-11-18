'use strict'
var jwt = require('jsonwebtoken');
const config =  require('../config');
const Constant = require('../config/constant');
const db = require("../models");
const utility = require('../helpers/utility');
const book_category = db.book_category;
const { Op,sequelize } = require("sequelize");
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
            let data = await book_category.findAll({
                where:{
                    status:true
                }
            })

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


books.getAllCategory = async (req, res) => {
    try {

            let data = await book_category.findAll({
                where:{
                    status: true
                }
            })
            let massage =  (data.length>0)?Constant.BOOK_CATEGORY_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: data
            })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.getAllTags = async (req, res) => {
    try {

            let data = await book_tag.findAll({})
            let massage =  (data.length>0)?Constant.BOOK_TAGS_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: data
            })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

books.add = async (req,res)=>{

        try {
            let {tag} = req.body;
            book.create(req.body).then( async result =>{

                if(tag){
                    let data = await utility.checkTagAndCreate(tag,result.id,book_tag,tag_relationship);
                }
                return res.json({
                    code: Constant.SUCCESS_CODE,
                    massage: Constant.BOOK_CATEGORY_SAVE_SUCCESS,
                    data: result
                })
            }).catch(error=>{

                return res.json({
                    code: Constant.ERROR_CODE,
                    massage: Constant.SOMETHING_WENT_WRONG,
                    data: result
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


books.edit = async (req, res) => {
    try {

        let { id,tag } = req.body;
        book.findOne({
            where: {
                id: id
            }
        }).then(async (result) => {
            if (result) {

                if(tag){
                    let data = await utility.checkTagAndCreate(tag,result.id,book_tag,tag_relationship);
                }

                result.update(req.body)

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


books.delete = async (req, res) => {
    try {

        let { id } = req.body;
        book.findOne({
            where: {
                id: id,
                status: 1
            }
        }).then(async (result) => {
            if (result) {
                let bookData = {
                    status: 0

                }
                result.update(bookData)

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


books.getBooks = async (req, res) => {
    try {

            let data = await book.findAll({
                where:{
                    status: true
                },
                include: [{
                    model:book_category,
                    where:{
                        status:true
                    }
                }]
            })
            let massage =  (data.length>0)?Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: data
            })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}


books.getBooksByFilter = async (req, res) => {
    try {
            let {max_price,min_price,author,category_id} = req.body;
            let condition = {};
            if(max_price){
                condition = {
                    status: true,
                    price :{
                        [Op.and]:{
                            [Op.lte]:max_price,
                            [Op.gte]:min_price,
                        }
                    }
                   
                }

            }   
            
            if(author){
                author =  author.split(',');
                condition.author = {[Op.in]:author}
            }

            if(category_id){
                condition.category_id = category_id
            }

            let data = await book.findAll({
                where:condition,
                include: [{
                    model:book_category
                }]
            })
            let massage =  (data.length>0)?Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: data
            })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

books.getBooksByCategory = async (req, res) => {
    try {
                let {name} = req.body;
            let data = await book_category.findOne({
                where:{
                    status: true,
                    [Op.or]: [
                        {
                            name: name
                        },
                        {
                            name_en: name
                        }
                    ]

                },
                include: [{
                    model:book,
                    where:{
                        status:true
                    }
                }]
            })
            let massage =  (data)?Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: data
            })
    } catch (error) {
        return res.json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: error
        })
    }

}

books.getBooksBytag = async (req, res) => {
    try {
                let {slug} = req.body;
            let data = await book_tag.findOne({
                where:{
                    name: slug
                },
                include: [{
                    model:book,
                    where:{
                        status:true
                    }
                }]
            })
            let massage =  (data)?Constant.BOOK_RETRIEVE_SUCCESS : Constant.NO_DATA_FOUND
            return res.json({
                code: Constant.SUCCESS_CODE,
                massage: massage,
                data: data
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
