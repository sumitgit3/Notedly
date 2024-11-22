const models = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const gravatar = require('../util/gravatar');
const mongoose = require('mongoose');

const Mutation = {
    newNote: async (parent, args, { user }) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }
        const newNote = await models.Note.create({
            content: args.content,
            author: new mongoose.Types.ObjectId(user.id)
        });
        return newNote;
    },
    deleteNote: async (parent, { id },{user}) => {
        // if not a user, throw an Authentication Error
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a note');
        }
        try {
            const note = await models.Note.findById(id);
            if(note && String(note.author) !== user.id ){
                throw new ForbiddenError("You don't have permissions to delete the note");
            }
            await note.deleteOne();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    updateNote: async (parent, { id, content },{user}) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to update a note');
        }
        try {
            const note = await models.Note.findById(id);
            if(note && String(note.author) !== user.id ){
                throw new ForbiddenError("You don't have permissions to update the note");
            }
            const updatedNote = await models.Note.findByIdAndUpdate(id, { $set: { content } }, { new: true });
            return updatedNote;
        } catch (error) {
            throw new Error('Error updating Note');
        }
    },
    signUp: async (parent, { username, email, password }) => {
        email = email.trim().toLowerCase();
        const avatar = gravatar(email);
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await models.User.create({
                username,
                email,
                password: hashedPassword,
                avatar
            });
            return jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
        } catch (error) {
            console.log(error);
            throw new Error('error creating account');
        }
    },
    signIn: async (parent, { username, email, password }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            throw new AuthenticationError('error signing in');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError('error signing in');
        }
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    }

}

module.exports = Mutation;