const {gql} = require('apollo-server-express');
const {DateTime} = require('graphql-scalars')
// Construct a schema, using GraphQL's schema language
// if data is not in database,need to write resolver for it,
//if i am returning note,it has favoritedBy but it have only object id in database of user, 
//to return user according to schema ,need to write resolver
//if i am returning NoteFeed it should have structure same as schema

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
    
    type NoteFeed {
        notes :[Note]!
        cursor :String!
        hasNextPage:Boolean!
    }
    
    type Query {
        notes : [Note!]!
        note(id:ID) : Note!

        user(username:String!):User!
        users:[User!]! 
        me:User!

        noteFeed(cursor:String):NoteFeed
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