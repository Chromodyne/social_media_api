const { Schema, model } = require("mongoose");

//This function will be used to validate the email address the user enters. May swap to method later.
function validateEmailAddress (email) {

    //Contains the regex to compare against. Chosen to comply to RFC2822 standards.
    const emailReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return emailReg.test(email);

}

//Create new schema with for users of the API.
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmailAddress, "Please enter a valid email address."],
            match: [
                    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    "That is not a valid email address."
                    ],
        },
        //TODO: Check this.
        thoughts: [ {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: this,
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

//Virtual that gets the length of user's friends array on query.
userSchema.virtual("friendCount").get(function() {
   return this.friends.length;
});

//Create a model from the schema created above.
const User = model("user", userSchema);

//Export the user model.
module.exports = User;