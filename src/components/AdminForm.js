import React from 'react';
import {ColorContext} from "./Color";

const AdminForm = ({
                       id, updateRecipe, recettes, deleteRecipe
                   }) => {

    const recette = recettes[id]

    /* Execution mise à jour recette */
    const handleChange = (event, id) => {
        const {name, value} = event.target
        const recette = recettes[id]
        recette[name] = value

        updateRecipe(id, recette)
    }

    return (
        <div className="card">
            <form className="admin-form">
                <input type='text' name='nom'
                       placeholder="Nom de la recette"
                       value={recette.nom}
                       onChange={e => handleChange(e, id)}
                />

                <input type='text'
                       name='image' placeholder="L'image"
                       value={recette.image}
                       onChange={e => handleChange(e, id)}
                />

                <textarea name='ingredients' rows='3'
                          placeholder='Liste des ingrédients'
                          value={recette.ingredients}
                          onChange={e => handleChange(e, id)}
                />

                <textarea name='instructions' rows='15'
                          placeholder='Liste des instructions'
                          value={recette.instructions}
                          onChange={e => handleChange(e, id)}
                />

                <ColorContext.Consumer>
                    {context => (
                        <button style={{backgroundColor: context.state.color}}
                                onClick={() => deleteRecipe(id)}>
                            Supprimer
                        </button>
                    )}
                </ColorContext.Consumer>
            </form>
        </div>
    )
}

export default AdminForm
