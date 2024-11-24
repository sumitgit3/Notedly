const models = require('../models');

const Query = {
    notes: async () => {
        const notes = await models.Note.find({}).limit(100);
        return notes;
    },
    note: async (parent, args) => {
        const note = await models.Note.findById(args.id);
        return note;
    },
    // users query
    user: async (parent, { username }) => {
        return await models.User.findOne({ username });
    },
    users: async () => {
        return await models.User.find({}).limit(100);
    },
    me: async (parent, { }, { user }) => {
        return await models.User.findById(user.id);
    },

    noteFeed: async (parent, { cursor }) => {
            //hard code page limit
            const limit = 10;
            // set the default hasNextPage value to false
            let hasNextPage = false;
            //if cursor is not provided all notes will be fetched then sorted for new
            let cursorOptions = {}
            if (cursor) {
                //get all notes before cursor ,newer notes have greater _id
                cursorOptions = { _id: { $lt: cursor } };
            }
            //fetch all notes before cursor , sort newest first, then limit
            let notes = await models.Note.find(cursorOptions).sort({ _id: -1 }).limit(limit + 1);

            //fetch one note extra than limit to find hasNextPage
            if (notes.length > limit) {
                notes = notes.slice(0, -1); //remove extra note
                hasNextPage = true;
            }

            //no notes is fetched handling
            let newCursor =  "";
            if (notes.length > 0) {
                newCursor =  notes[notes.length-1]._id;
            }
            
            return {
                notes,
                cursor : newCursor,
                hasNextPage
            };
    }
};

module.exports = Query;