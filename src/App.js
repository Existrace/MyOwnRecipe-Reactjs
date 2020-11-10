import React, {useEffect} from 'react'
import './App.css'
import Header from "./components/Header"
import Admin from './components/Admin'
import Card from './components/Card'

import PropTypes from 'prop-types';

// React Context
import ColorContext from './components/Color'

// import HOC
import withFireBase from "./hoc/withFireBase";

const App = (props) => {
    /* Défini le titre de la page (onglet) */
    useEffect(() => {
        document.title = "My Own Recipes"
    }, [])

    const cards = Object.keys(props.recettes)
        .map(key =>
            <Card key={key} details={props.recettes[key]}/>
        )

    return (
        <ColorContext>
            <div className='box'>
                <Header pseudo={props.match.params.pseudo}/>
                <div className='cards'>
                    {cards}
                </div>
                <Admin
                    pseudo={props.match.params.pseudo}
                    recettes={props.recettes}
                    updateRecipe={props.updateRecipe}
                    addRecipe={props.addRecipes}
                    deleteRecipe={props.deleteRecipe}>
                </Admin>
            </div>
        </ColorContext>
    )
}

App.propTypes = {
    match: PropTypes.object.isRequired,
    recettes: PropTypes.object.isRequired,
    addRecipe: PropTypes.func.isRequired,
    deleteRecipe: PropTypes.func.isRequired,
    updateRecipe: PropTypes.func.isRequired
}

const WrappedComponent = withFireBase(App)

export default WrappedComponent
