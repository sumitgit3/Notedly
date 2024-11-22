const express = require('express')
require('dotenv').config();
const {connectToDB} = require('./db');
const {ApolloServer} = require('apollo-server-express');
const resolvers = require('./resolvers');
const typeDefs = require('./schema')
const getUser = require('./util/getUser')


const port = process.env.PORT || 3000;
const app = express();
connectToDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const token = req.headers.authorization;
        const user = getUser(token);
        return {user};
    }
});

app.get('/',(req,res)=>{
    res.send('Hello World');
})

server.start().then(()=>{
    server.applyMiddleware({ app, path: '/api' });
    app.listen(port,()=>{
        console.log(`server is listening at http://localhost:${port}${server.graphqlPath}`);
    })
})

