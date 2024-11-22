const {gql} = require('apollo-server-express');
const {DateTime} = require('graphql-scalars')
// Construct a schema, using GraphQL's schema language
const typeDefs = gql`
    scalar DateTime

    type Note {
        id: ID!
        content : String!
        author : String!
        createdAt:DateTime!
        updatedAt:DateTime!
    }
    
    type User {
        id:ID!
        username:String!
        email:String!
        avatar:String
        notes:[Note!]!
    }
    
    type Query {
        notes : [Note!]!
        note(id:ID) : Note!
    }
    type Mutation {
        newNote(content:String!) : Note!
        updateNote(id:ID!,content:String!) :Note! 
        deleteNote(id:ID!):Boolean!
        signIn(username:String!,email:String!,password:String!):String!
        signUp(username:String!,email:String!,password:String!):String!
    }
`;

module.exports = typeDefs;