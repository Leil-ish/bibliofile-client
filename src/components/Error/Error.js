import React, { Component } from 'react';

class Error extends Component {

    constructor(props) {
        super(props);
        this.state={
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
        return (
            <div>
                <h2>Oops! Could not display this right now.</h2>
            </div>
            );
        }
        return this.props.children;
    }
}

export default Error;