import React from 'react';
import PropTypes from 'prop-types';

export default class MyComponent extends React.Component{
    componentWillReceiveProps () {
        console.log('componentWillRecieveProps');
    }
    shouldComponentUpdate (nextProps, nextState) {
        console.log('nextProps, nextState', nextProps, nextState);
        return false;
    }
    render () {
        console.log('MyComponent render');
        return <h4>{this.props.name}</h4>
    }
}

MyComponent.propTypes = {
    name: PropTypes.string.isRequired
}