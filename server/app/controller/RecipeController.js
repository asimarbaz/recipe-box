const Recipe = require('../models/recipe')

const RecipeController = {}

RecipeController.list = (req, res) => {
    Recipe.find()
          .then((recipeList) => {
            res.json(recipeList)
          })
          .catch((err) => {
            res.json(err)
          })
}

RecipeController.Add = (req, res) => {
    const body = req.body
    const recipe = new Recipe(body)

    if(req.file){
      recipe.image = req.file.path
    }
    
    recipe.save()
          .then((recipe) => {
            res.json(recipe)
          })
          .catch((err) => {
            res.json(err)
          })
}

RecipeController.Update = (req, res) => {
    const id = req.params.id
    const body = req.body
    // let result 
    // if(req.file.path){
    //     result = { body, image:req.file.path}
    // }
    // else {
    //     result = body
    // }
    Recipe.findOneAndUpdate({_id: id}, body, { new:true, runValidators:true})
          .then((recipe) => {
            res.json(recipe)
          })
          .catch((err) => {
            res.json(err)
          })
}

RecipeController.destroy = (req, res) => {
    const id = req.params.id
    Recipe.findOneAndDelete({_id: id})
          .then((recipe) => {
            res.json(recipe)
          })
          .catch((err) => {
            res.json(err)
          })
}

module.exports = RecipeController