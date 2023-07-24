const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recipeSchema = new Schema({
    recipe: {
        type:String,
        required: true
    },
    ingredients: {
        type:[String],
        required: true
    },
    directions: {
        type:[String],
        required: true
    },
    image: {
        type:String
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe