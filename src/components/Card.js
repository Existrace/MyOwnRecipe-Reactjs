import React from 'react';
import {ColorContext} from "./Color";

const Card = ({details}) => {

    const ingredients = details.ingredients
        .split(',')
        .map(item => <li key={item}>{item}</li>)

    const instructions = details.instructions
        .split('\n')
        .map(item => <li key={item}>{item}</li>)

    /* Image par défaut au cas où une recette n'aurait pas d'image
    * et où le chemin ne serait pas trouvé
    * */
    const requireImage = path => {
        try {
            return require(`../img/${path}`)
        } catch (error) {
            return require(`../img/default.jpeg`)
        }
    }

    return (
        <div className='card'>
            <div className='image'>
                <img src={requireImage(details.image)} alt={details.nom}/>
            </div>
            <ColorContext.Consumer>
                {context => (
                    <div className='recette' style={{color: context.state.color}}>
                        <h2>{details.nom}</h2>
                    </div>
                )}
            </ColorContext.Consumer>
            <ul className='liste-ingredients'>
                {ingredients}
            </ul>
            <ol className='liste-ingredients'>
                {instructions}
            </ol>
        </div>
    );
};

export default Card;
