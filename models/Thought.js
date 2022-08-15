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
            get: formatDate,
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

//Getter method to format the date.
function formatDate(date) {
    return date.toDateString();
}

const Thought = model("thought", thoughtSchema);

module.exports = Thought;