//Imports
const { Schema, Types } = require("mongoose");

//NOTE: This schema does not get a model but rather remains a schema exclusively.
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

function formatDate (date) {
    return date.toDateString();
}

module.exports = reactionSchema;