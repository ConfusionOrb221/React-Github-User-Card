import React, { Component } from 'react';

class User extends Component {

    

    render() {
        return (
            <>
                {this.props.renderUser()}
            </>
        );
    }
}

export default User;