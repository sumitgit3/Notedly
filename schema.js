const {gql} = require('apollo-server-express');
const {DateTime} = require('graphql-scalars')
// Construct a schema, using GraphQL's schema language
const typeDefs = gql`
    scalar DateTime

    type Note {
        id: ID!
        content : String!
        author : User!
        createdAt:DateTime!
        updatedAt:DateTime!
        favoriteCount: Int!
        favoritedBy: [User!]
    }
    
    type User {
        id:ID!
        username:String!
        email:String!
        avatar:String
        notes:[Note!]!
        favorites: [Note!]!
    }
    
    type Query {
        notes : [Note!]!
        note(id:ID) : Note!

        user(username:String!):User!
        users:[User!]! 
        me:User!
    }
    type Mutation {
        newNote(content:String!) : Note!
        updateNote(id:ID!,content:String!) :Note! 
        deleteNote(id:ID!):Boolean!
        signIn(username:String!,email:String!,password:String!):String!
        signUp(username:String!,email:String!,password:String!):String!
        toggleFavorite(id: ID!): Note!
    }
`;

module.exports = typeDefs;