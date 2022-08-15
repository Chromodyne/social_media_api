const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            //TODO: Getter method to format timestamp on query.
        },
        username: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);