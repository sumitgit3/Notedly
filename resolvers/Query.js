const models = require('../models');

const Query  = {
    notes : async(parent,args,{user})=>{
        const notes = await models.Note.find({});
        return notes;
    },
    note:async(parent,args)=>{
        const note = await models.Note.findById(args.id);
        return note;
    }
};

module.exports = Query;