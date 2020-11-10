import React from 'react';
import {ColorContext} from "./Color";

const Footer = (props) => {
    return (
        <footer>
            <ColorContext.Consumer>
                {context => (
                    <button style={{ backgroundColor: context.state.color}}
                            onClick={props.logout}>Déconnexion</button>
                )}
            </ColorContext.Consumer>
        </footer>
    );
};

export default Footer;
