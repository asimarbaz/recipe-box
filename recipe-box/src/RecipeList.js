import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeDetails from './RecipeDetails'
import AddRecipe from './AddRecipe'
import Swal from 'sweetalert2'

const RecipeList = (props) => {
    const [ recipeList, setRecipeList ] = useState([])
    const [ selectedRecipe, setSelectedRecipe ] = useState(recipeList[0])
    useEffect(() => {
        axios.get('http://localhost:3040/api/recipe')
             .then((response) => {
                setRecipeList(response.data)
                localStorage.setItem('recipes', JSON.stringify(response.data))
             })
             .catch((err) => {
                Swal.fire({
                    icon:'error',
                    text:err.message,
                    width:'300px',
                    // timer:1500
                })
             })
    }, [recipeList])

    
    return (
        <div>
            
            <div className="recipe-list">
                {recipeList.length===0 && <p style={{color:"red",textAlign:"center"}}>Something unexpected happened</p>}
                <ol>
                    {
                        recipeList?.map((recipe) => {
                            return <li key={recipe._id} onClick={() => setSelectedRecipe(recipe)}>{recipe.recipe}</li>
                        })
                    }
                </ol>
            </div>
            <div className='recipe-details'>
                <RecipeDetails selectedRecipe={selectedRecipe? selectedRecipe: recipeList[0]} />
                {/* <RecipeDetails selectedRecipe={selectedRecipe}  recipeList={recipeList}/> */}
            </div>
            <div className='add-recipe'>
                <AddRecipe recipeList={recipeList}/>
            </div>
        </div>
    )
}

export default RecipeList