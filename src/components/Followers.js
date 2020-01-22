import React, { Component } from 'react';

class Followers extends Component {

    render() {
        return (
            <>
                {this.props.renderFollowers()}
            </>
        );
    }
}

export default Followers;