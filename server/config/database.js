const mongoose = require('mongoose')

const configureDb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/recipe-box')
            .then(() => {
                console.log("Database connected successfully")
            })
            .catch((err) => {
                console.log("error connecting to db", err)
            })
}

module.exports = configureDb