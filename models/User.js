const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        vitruals: true
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

// create user model using user schema
const User = model('User', UserSchema);

module.exports = User;