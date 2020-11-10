import React, {Component} from 'react';
import base from "../base";

const withFireBase = WrappedComponent => (
    class HOC extends Component {
        state = {
            pseudo: this.props.match.params.pseudo,
            recettes: {}
        }

        componentDidMount() {
            this.ref = base.syncState(`/${this.state.pseudo}/recettes`, {
                context: this,
                state: 'recettes'
            })
        }

        componentWillUnmount() {
            // Terminer la connexion pour chaque utilisateur
            base.removeBinding(this.ref)
        }

        addRecipes = recette => {
            const recettes = {...this.state.recettes}
            recettes[`recette-${Date.now()}`] = recette
            this.setState({recettes})
        }

        updateRecipe = (key, newRecipe) => {
            const recettes = {...this.state.recettes}
            recettes[key] = newRecipe
            this.setState({recettes})
        }

        deleteRecipe = key => {
            const recettes = {...this.state.recettes}
            recettes[key] = null
            this.setState({recettes})
        }

        render() {
            return (
                <WrappedComponent
                    recettes={this.state.recettes}
                    addRecipes={this.addRecipes}
                    updateRecipe={this.updateRecipe}
                    deleteRecipe={this.deleteRecipe}
                    {...this.props}
                />
            );
        }
    }
)



export default withFireBase;
