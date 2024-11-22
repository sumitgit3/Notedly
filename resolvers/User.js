const models = require('../models')

const User = {
    notes :async(user,{})=>{
       return await models.Note.find({author:user._id});
    },
    favorites :async(user,{})=>{
        return await models.Note.find({favoritedBy:{$in:[user._id]}});
    }

}

module.exports = User;