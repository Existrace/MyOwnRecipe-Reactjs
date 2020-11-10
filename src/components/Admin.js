import React, {Component} from 'react';
import AddRecipes from "./AddRecipes";
import AdminForm from "./AdminForm";
import Login from "./Login";

// Import Firebase
import firebase from "firebase/app";
import 'firebase/auth'
import base, {firebaseApp} from '../base'
import Footer from "./Footer";

class Admin extends Component {
    state = {
        uid: null,
        chef: null
    }

    componentDidMount() {
        // A chaque fois qu'une page change/ rafraichissement
        firebase.auth().onAuthStateChanged(user => {
            // Si un utilisateur Firebase est connecté
            if (user) {
                let promise = this.handleAuth({user});
            }
        })
    }

    handleAuth = async authData => {
        // Await => Ne passe pas à la suite tant que cette action n'est pas effectuée
        const box = await base.fetch(this.props.pseudo, {context: this})

        // La personne qui s'est connectée sur Facebook
        // devient alors propriétaire de la page courange
        if (!box.chef) {
            // post -> ecrit une donnée
            await base.post(`${this.props.pseudo}/chef`, {
                data: authData.user.uid
            })
            console.log('Statut authData', authData.user.uid)
        }

        this.setState({
                uid: authData.user.uid,
                chef: box.chef || authData.user.uid // Si la page n'appartient à personne (auth facebook)
            }
        )
    }

    /* Se connecter via firebase */
    authenticate = () => {
        const authProvider = new firebase.auth.FacebookAuthProvider()
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.handleAuth)

        console.log('Statut de uid :',  this.state.uid);
    }

    /* Déconnexion Facebook */
    logout = async () => {
        console.log('Déconnexion')
        await firebase.auth().signOut()
        this.setState({uid: null})
    }

    render() {
        const {recettes, addRecipe, updateRecipe, deleteRecipe} = this.props

        /*const logout = <button onClick={this.logout}>Déconnexion</button>*/

        // Si l'utilisateur n'est pas connecté
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }

        if (this.state.uid !== this.state.chef) {
            return (
                <div>
                    <h2> Vous n'êtes pas la propriétaire de cette page</h2>
                    <button onClick={this.logout}>Déconnexion</button>
                </div>
            )
        }

        return (
            <div className="cards">
                <AddRecipes addRecipe={addRecipe}/>
                {
                    Object.keys(recettes)
                        .map(key => <AdminForm
                                key={key}
                                id={key}
                                updateRecipe={updateRecipe}
                                deleteRecipe={deleteRecipe}
                                recettes={recettes}
                            />
                        )
                }
                <Footer logout={this.logout}/>
            </div>

        );
    }
}

export default Admin;
