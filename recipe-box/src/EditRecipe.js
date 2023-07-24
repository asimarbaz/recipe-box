import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd'
import axios from 'axios'
import Swal from 'sweetalert2'

const EditRecipe = (props) => {

    const { selectedRecipe } = props

    const [ recipe, setRecipe ] = useState(selectedRecipe? selectedRecipe.recipe: '')
    const [ ingredients, setIngredients ] = useState(selectedRecipe? Object.values(selectedRecipe?.ingredients).join('\\'): '')
    const [ directions, setDirections ] = useState(selectedRecipe? Object.values(selectedRecipe?.directions).join('\\'): '')
    const [ isModalOpen, setIsModalOpen] = useState(false);

    const [ recipeError, setRecipeError ] = useState('')
    const [ ingredientsError, setIngredientsError ] = useState('')
    const [ directionsError, setDirectionsError ] = useState('')



    useEffect(() => {
        if(selectedRecipe){
            setRecipe(selectedRecipe?.recipe)
            setIngredients(Object.values(selectedRecipe?.ingredients).join('\\'))
            setDirections(Object.values(selectedRecipe?.directions).join('\\'))
        }
        else {
            setRecipe('')
            setIngredients('')
            setDirections('')
        }
    }, [selectedRecipe])


    
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e, id) => {
        e.preventDefault()
        const updatedRecipe = {
            recipe: recipe,
            ingredients: ingredients.split('\\'),
            directions: directions.split('\\')
        }

        if (!recipe) {
            setRecipeError("Recipe Name is required");
            setIngredientsError("");
            setDirectionsError("");
          } 
        else if (!ingredients) {
            setIngredientsError("Ingredients are required");
            setRecipeError("");
            setDirectionsError("");
        } 
        else if (!directions) {
            setDirectionsError("Directions are required");
            setRecipeError("");
            setIngredientsError("");
        }
        else if(id){
            axios.put(`http://localhost:3040/api/recipe/${id}`, updatedRecipe)
                 .then((res) => {
                    console.log(res.data)
                    Swal.fire({
                        icon:'info',
                        text:'Recipe updated successfully',
                        timer:1500,
                        width:'300px',
                        showConfirmButton:false
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                 })
                 .catch((err) => {
                    Swal.fire("Error updating the recipe", err)
                 })
        }
    }

    return (
        <div>
            <Button type="primary" onClick={showModal} className='edit'>
                <b>Edit</b>
            </Button>
            <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <h1 style={{textAlign:"center"}}>Edit Recipe</h1>
                { selectedRecipe && <form className='form' id='form'>
                    <label htmlFor="recipe">Recipe:</label><br />
                    {recipeError && <p className='danger'>{ recipeError }</p>}
                    <input
                        type="text" 
                        id="recipe" 
                        name="recipe" 
                        required 
                        value={recipe}
                        onChange={(e) => setRecipe(e.target.value)}
                    /><br />

                    <label htmlFor="ingredients">Ingredients:</label><br />
                    {ingredientsError && <p className='danger'>{ ingredientsError }</p>}
                    <textarea 
                        id="ingredients" 
                        name="ingredients" 
                        rows="4" 
                        required 
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    >
                    </textarea><br />

                    <label htmlFor="directions">Directions:</label><br />
                    {directionsError && <p className='danger'>{ directionsError }</p>}
                    <textarea 
                        id="directions" 
                        name="directions" 
                        rows="4" 
                        required 
                        value={directions}
                        onChange={(e) => setDirections(e.target.value)}
                    >
                    </textarea><br />


                    <button onClick={(e) => handleSubmit(e,selectedRecipe._id)}>Save</button>
                    <button onClick={handleCancel}>Close</button>
                </form>}
            </Modal>  
        </div>
    )
}

export default EditRecipe 