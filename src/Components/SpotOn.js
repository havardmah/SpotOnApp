import React, { Component } from 'react';

import Loader from './Loader';
import ErrorMesssage from './ErrorMessage';
import StopWrapper from './StopWrapper';
import Footer from './Footer';

export default class SpotOn extends Component {

    constructor(props){
        super(props);
        this.state = {
            errorMsg: null,
            loading: true,
        };
    } // End Constructor

    renderLoadWheel = () => {
        if (this.state.loading) {
            return <Loader />;
        }
        return false;
    }; // End renderLoadWheel

    renderErrorMsg = () => {
        if (this.state.errorMsg) {
            const error = this.state.errorMsg;
            return <ErrorMesssage big={error.big} bright={error.bright} label={error.label} />;
        }
        return false;
    }; // End renderErrorMsg

    setLoading = (status = false) => {
        this.setState({
            loading: status
        });
    }; // End setLoading

    setError = (msg = null) => {
        this.setState({
            errorMsg: msg
        });
    }; // End setError

    render() {
        return (
            <div id="container">
                <h1>Spot On</h1>
                { this.renderLoadWheel() }
                { this.renderErrorMsg() }
                <StopWrapper setError={this.setError} setLoading={this.setLoading} />
                <Footer/>
            </div>
        );
    }
} // End SpotOn