import React, { Component } from 'react';

export default class ErrorMessage extends Component {

    constructor(props) {
        super(props);
        this.colorClass = [];
    } // End constructor

    componentWillMount = () => {
        if (this.props.big) {
            this.colorClass.push('big');
        }

        if (this.props.bright) {
            this.colorClass.push('bright');
        }
    }; // End componentWillRender

    render() {
        return (
            <div className={`errorMsgs ${this.colorClass.join(" ")}`}>
                <span>{this.props.label}</span>
            </div>
        );
    }
} // End ErrorMessage