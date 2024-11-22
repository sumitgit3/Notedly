const models = require('../models');

const Query  = {
    notes : async()=>{
        const notes = await models.Note.find({});
        return notes;
    },
    note:async(parent,args)=>{
        const note = await models.Note.findById(args.id);
        return note;
    },
    // users query
    user:async(parent,{username})=>{
            return await models.User.findOne({username});
    },
    users:async()=>{
        return await models.User.find({});
    },
    me:async(parent,{},{user})=>{
        return await models.User.findById(user.id);
    }
};

module.exports = Query;