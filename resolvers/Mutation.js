const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {AuthenticationError,ForbiddenError} = require('apollo-server-express');
const gravatar = require('../util/gravatar');

const Mutation = {
    newNote: async (parent, args) => {
        const newNote = await models.Note.create({
            content: args.content,
            author: 'Adam Scott'
        });
        return newNote;
    },
    deleteNote : async (parent,{id})=>{
        try {
            await models.Note.findByIdAndDelete(id);
            return true;
        } catch (error) {
            return false;
        }
    },
    updateNote:async(parent,{id,content})=>{
        try {
            const updatedNote = await models.Note.findByIdAndUpdate(id,{$set:{content}},{new:true});
            return updatedNote;
        } catch (error) {
            throw new Error('Error updating Note');
        }
    },
    signUp:async(parent,{username,email,password})=>{
        email = email.trim().toLowerCase();
        const avatar = gravatar(email);
        try {
            const hashedPassword = await bcrypt.hash(password,10);
            const newUser = await models.User.create({
                username,
                email,
                password:hashedPassword,
                avatar
            });
            return jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY);
        } catch (error) {
            console.log(error);
            throw new Error('error creating account');
        }
    },
    signIn: async(parent,{username,email,password})=>{
        if(email){
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({$or:[{email},{username}]});
        if(!user) {
            throw new AuthenticationError('error signing in');
        }
        const valid = await bcrypt.compare(password,user.password);
        if(!valid) {
            throw new AuthenticationError('error signing in');
        }
        return jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
    }

}

module.exports = Mutation;