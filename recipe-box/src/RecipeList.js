import { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeDetails from './RecipeDetails'
import AddRecipe from './AddRecipe'
import Swal from 'sweetalert2'

const RecipeList = (props) => {
    const [ recipeList, setRecipeList ] = useState([])
    const [ selectedRecipe, setSelectedRecipe ] = useState(recipeList[0])
    const [ search, setSearch ] = useState('')
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

    // useEffect(() => {
    //     console.log('search changed', search)
    // }, [search])

    
    return (
        <div>
            <form className='search-box'>
                <label htmlFor="search" className='search-label'>Search for Recipe: </label>
                <input type='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className='search-input' id='search'/>
            </form>
            <div className="recipe-list">
                {recipeList.length===0 && <p style={{color:"red",textAlign:"center"}}>Something unexpected happened</p>}
                {
                    recipeList?.filter(recipe => recipe.recipe.toLowerCase().includes(search.toLowerCase())).length === 0 &&
                    <p style={{color:"red",textAlign:"center"}}>Recipe not found</p>
                }
                <ol>
                    {
                        recipeList?.filter(recipe => recipe.recipe.toLowerCase().includes(search.toLowerCase())).map((recipe) => {
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