import { useState } from 'react';
import { Button, Modal } from 'antd'
import axios from 'axios'
import Swal from 'sweetalert2'

const AddRecipe = (props) => {

    const { recipeList } = props

    const [ newRecipe, setNewRecipe ] = useState({
        recipe:"",
        ingredients: "",
        directions: "",
        image:''
    })

    const [ recipeError, setRecipeError ] = useState('')
    const [ ingredientsError, setIngredientsError ] = useState('')
    const [ directionsError, setDirectionsError ] = useState('')

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        const form = document.getElementById("myForm");
        form.reset();
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedIngredients = newRecipe.ingredients.split('\\')
        const updatedDirections = newRecipe.directions.split('\\')
        const _FormData = new FormData()
        _FormData.append('recipe', newRecipe.recipe)
        for (var i = 0; i < updatedIngredients.length; i++) {
            _FormData.append('ingredients[]', updatedIngredients[i]);
        }
        for (var j = 0; j < updatedDirections.length; j++) {
            _FormData.append('directions[]', updatedDirections[j]);
        }
        _FormData.append('image', newRecipe.image)
        
        // for (var pair of _FormData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }
        let isNewRecipe = true
        recipeList.forEach((rec) => {
            if(rec.recipe.toLowerCase() === newRecipe.recipe.toLowerCase()){
                isNewRecipe = false
            }
        })
        if(!isNewRecipe){
            Swal.fire({
                text:`${newRecipe.recipe} recipe has been added already`,
                width:'300px'
            })
            handleCancel()
        }
        else if (!newRecipe.recipe) {
            setRecipeError("Recipe Name is required");
            setIngredientsError("");
            setDirectionsError("");
          } 
        else if (!newRecipe.ingredients) {
            setIngredientsError("Ingredients are required");
            setRecipeError("");
            setDirectionsError("");
        } 
        else if (!newRecipe.directions) {
            setDirectionsError("Directions are required");
            setRecipeError("");
            setIngredientsError("");
        }
        else if(_FormData && isNewRecipe){
            axios.post('http://localhost:3040/api/recipe', _FormData, {
                headers:{
                    'Content-Type':'multipart/form-data',
                }
            })
                 .then((res) => {
                    console.log(res.data)
                    // alert("Recipe Successfully Added")
                    Swal.fire({
                        icon:"success",
                        text:"Recipe Successfully Added",
                        width:'300px',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                    // window.location.reload()
                 })
                 .catch((err) => {
                    Swal.fire({
                        icon:'error',
                        text:err.message,
                        width:'300px'
                    })
                 })
        }
    }

    return (
        <div>
            <Button type="primary" onClick={showModal} className='add' style={{margin:"10px 0px"}}>
                <b>Add a Recipe</b>
            </Button>
            <Modal
                open={isModalOpen}
                style={{ top: 20 }}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <h1 style={{textAlign:"center"}}>Add a Recipe</h1>
                <form className='form' id="myForm">
                    <label htmlFor="recipeTitle">Recipe Title:</label><br />
                    {recipeError && <p className='danger'>{ recipeError }</p>}
                    <input 
                        type="text" 
                        id="recipeTitle" 
                        name="recipe" 
                        required 
                        placeholder='Recipe Name'
                        onChange = {(e) => setNewRecipe({...newRecipe,[e.target.name]:e.target.value})}
                    /><br />

                    <label htmlFor="ingredients">Ingredients:</label><br />
                    {ingredientsError && <p className='danger'>{ ingredientsError }</p>}
                    <textarea 
                        id="ingredients"
                        name="ingredients"
                        rows="5"
                        required
                        // eslint-disable-next-line
                        placeholder={'Separate each ingredient with a "\\": \n\nMilk ' + '\\ 2 Eggs \\ 1/3 Cup Sugar'}
                        onChange = {(e) => setNewRecipe({...newRecipe,[e.target.name]:e.target.value})}
                    >
                    </textarea><br />

                    <label htmlFor="directions">Directions:</label><br />
                    {directionsError && <p className='danger'>{ directionsError }</p>}
                    <textarea 
                        id="directions" 
                        name="directions" 
                        rows="5" 
                        required
                        placeholder={'Separate each step with a "\\": \n\nPreheat oven to 350°F ' +
                                    '\\ \nCombine ingredients in pie crust \\ \nBake until crust ' +
                                    'is golden brown. \\'}
                        onChange = {(e) => setNewRecipe({...newRecipe,[e.target.name]:e.target.value})}
                    ></textarea><br />

                    <label htmlFor="image">Image:</label><br />
                    <input 
                        type="file" 
                        id="image" 
                        name="image" 
                        required 
                        accept='.jpg, .jpeg, .gif'
                        onChange = {(e) => setNewRecipe({...newRecipe,[e.target.name]:e.target.files[0]})}
                    /><br />

                    {/* <label>Video:</label>
                    <input
                        type="file"
                        accept=".mp4"
                        name="video"
                    /> */}

                    <button onClick={handleSubmit}>Add</button>
                    <button onClick={handleCancel}>Close</button>
                </form>
            </Modal>
            
        </div>
    )
}

export default AddRecipe