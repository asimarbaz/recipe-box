import EditRecipe from "./EditRecipe"
import { Button } from 'antd'
import axios from 'axios'
import Swal from 'sweetalert2'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const RecipeDetails = (props) => {
    
    const { selectedRecipe } = props
    
    const handleDelete = (id) => {
        Swal.fire({
            text: `Are you sure you want to delete "${selectedRecipe.recipe}" from the Recipe Box?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            width:'300px'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3040/api/recipe/${id}`)
                    .then((res) => {
                        console.log('deleted', res);
                        Swal.fire({
                            icon:'info',
                            text:`"${selectedRecipe.recipe}" recipe successfully deleted`,
                            showConfirmButton: false,
                            width:'300px',
                            timer:1500
                        })
                        setTimeout(() => {
                            window.location.reload();
                        }, 1500)
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon:'error',
                            text:err.message,
                            width:'300px'
                        })
                    })
              
            }
          })
    }

    const styles = StyleSheet.create({
        page: {
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          padding: 20,
        },
        heading: {
          fontSize: 24,
          marginBottom: 10,
        },
        subheading: {
          fontSize: 18,
          marginTop: 10,
          marginBottom: 5,
        },
        content: {
          fontSize: 14,
          marginBottom: 5,
          paddingLeft: 20
        },
        image: {
            width: "30%", 
            marginBottom: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius:9
        }
      });

    const MyDoc = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            <View>
              <Text style={styles.heading}>{selectedRecipe?.recipe}</Text>
              {/* // eslint-disable-next-line */}
              {selectedRecipe.image && <Image src={selectedRecipe.image? 'http://localhost:3040/'+selectedRecipe.image: 'http://localhost:3040/uploads/logo512.jpg'} style={styles.image} />}
              <Text style={styles.subheading}>Ingredients:</Text>
              {selectedRecipe?.ingredients?.map((ingredient, index) => (
                <Text key={index} style={styles.content}>
                  {ingredient}
                </Text>
              ))}
              <Text style={styles.subheading}>Directions:</Text>
              {selectedRecipe?.directions?.map((step, index) => (
                <Text key={index} style={styles.content}>{`${index + 1}. ${step}`}</Text>
              ))}
            </View>
          </Page>
        </Document>
    );
    
    
    return (
        <>
            {selectedRecipe && <div>
                <div className="data" id="recipe-details">
                    <EditRecipe selectedRecipe={selectedRecipe}/>
                    
                    <Button type="primary" danger onClick={() => handleDelete(selectedRecipe._id)} className="delete"><b>Delete<b/></b></Button>
                    <h2 className="title">{selectedRecipe.recipe}</h2>
                    <hr />
                </div>
                
                <img src={selectedRecipe.image? 'http://localhost:3040/'+selectedRecipe.image: "logo512.jpg"} alt="food" className="food-image"/>
                
                <p className="para"><strong>Ingredients:</strong></p>
                <ul>
                    {selectedRecipe.ingredients.map((ingredient, i) => {
                        return (<li key={i}>{ingredient}</li>)
                    })}
                </ul>

                <p className="para"><strong>Directions:</strong></p>
                <ol>
                    {selectedRecipe.directions.map((direction, i) => {
                        return (<li key={i}>{direction}</li>)
                    })}
                </ol>
                <button className="download">
                    <PDFDownloadLink document={<MyDoc />} fileName={selectedRecipe.recipe.replace(" ", "-")+" recipe"} >
                        {/* {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')} */}
                        Download the Recipe
                    </PDFDownloadLink>
                </button>
            </div>
            }
        </>
    )
}

export default RecipeDetails