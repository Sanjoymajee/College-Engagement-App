const mongoose = require('mongoose');
const { BlockList } = require('net');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
    },
    name:{
        type: String
    },
    posts:{
        type: String
    },
    admin:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('user',userSchema);