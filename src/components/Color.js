import React, {Component} from 'react';

const ColorContext = React.createContext()

class ColorProvider extends Component {
    state = {
        color: '#F1C40F'
    }
    render() {
        return (
            <ColorContext.Provider
            value={{state: this.state}}>
                {this.props.children}
            </ColorContext.Provider>
        );
    }
}

export { ColorContext }
export default ColorProvider;
