const express = require('express')

const router = express.Router()

const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, '-' + Date.now() + file.originalname)
    }
});

const upload = multer({ storage: storage })


const RecipeController = require('../app/controller/RecipeController')

router.get('/api/recipe', RecipeController.list)
router.post('/api/recipe', upload.single('image'), RecipeController.Add)
router.put('/api/recipe/:id', RecipeController.Update)
router.delete("/api/recipe/:id", RecipeController.destroy)

module.exports = router