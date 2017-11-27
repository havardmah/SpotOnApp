import React, { Component } from 'react';

export default class Loader extends Component {

    renderIcon = () => {
        if (this.props.small) {
            return (
                <div className="lds-flickr">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            );
        } else {
            return (
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            );
        }
    }; // End renderIcon

    render() {
        return (
            <div id="loader">
                <div className="lds-css ng-scope">
                    { this.renderIcon() }
                </div>
            </div>
        );
    }
} // End Loader