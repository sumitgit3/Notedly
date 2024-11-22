const models = require('../models');

const Query  = {
    notes : async()=>{
        const notes = await models.Note.find({});
        return notes;
    },
    note:async(parent,args)=>{
        const note = await models.Note.findById(args.id);
        return note;
    }
};

module.exports = Query;