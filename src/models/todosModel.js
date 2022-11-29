const express = require('express');

const todosSchema = {

    id : {
        type: String,
        require: true
    },

    text: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        require: true
    },

    Tags:{
        type: [String],
        required: true,
    },
    is_complete: {
        type: Boolean,
        default: false,
        required: true
    }


}

const Todo = module.exports = todosSchema;