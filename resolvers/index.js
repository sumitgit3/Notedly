const Query = require('./Query');
const Mutation = require('./Mutation');
const Note = require('./Note')
const User = require('./User')

const resolvers = {
    Query,
    Mutation,
    Note,
    User
}

module.exports = resolvers;