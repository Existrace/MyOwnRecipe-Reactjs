import React from 'react'
import { Redirect } from 'react-router-dom'

class Connexion extends React.Component {
    state = {
        pseudo: '',
        goToApp: false
    }

    /* Défini le titre de la page (onglet) */
    componentDidMount() {
        document.title = 'Connexion My Own Recipes';
    }

    goToApp = event => {
        event.preventDefault()
        this.setState({ goToApp: true })
    }
npx
    handleChange = event => {
        const pseudo = event.target.value
        this.setState({ pseudo })
    }

    render () {
        if (this.state.goToApp) {
            return <Redirect push to={`/pseudo/${this.state.pseudo}`} />
        }

        return (
            <div className='connexionBox'>
                <form className='connexion' onSubmit={this.goToApp} >
                    <h1>Boîte à Recettes</h1>
                    <hr/>
                    <input
                        type='text'
                        value={this.state.pseudo}
                        onChange={this.handleChange}
                        placeholder='Nom du chef'
                        pattern='[A-Za-z-]{1,}'
                        required />
                    <button type='submit'>Confirmer</button>
                    <p>Pas de caractères spéciaux acceptés.</p>
                </form>
            </div>
        )
    }
}

export default Connexion
