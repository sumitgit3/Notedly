const models = require('../models')
const Note = {
    author: async (Note) => {
        const user = await models.User.findById(Note.author);
        return user;
    },
    favoritedBy: async (Note) => {
        return await models.User.find({ _id: { $in: Note.favoritedBy } });
    }
}
module.exports = Note;