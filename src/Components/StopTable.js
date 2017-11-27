import React, { Component } from 'react';
import Loader from './Loader';
import calcTime from '../scripts/TimeCalc';

export default class StopTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deps: null,
            loading: true
        };

        setInterval(this.getStop, 5000);
    } // End constructor

    componentWillMount = () => {
        this.getStop();
    }; // End componentWillMount

    componentWillReceiveProps(nextProps) {
        if (this.props.stop.ID !== nextProps.stop.ID) {
            this.setState({
                deps: null,
                loading: true
            });
        }
    } // End componentWillUpdate

    getStop = async () => {
        let url = "https://hjelvik.net/spotOn/proxy_v3.php?stop=" + this.props.stop.ID;
        // let url = "http://localhost/RuterExpectedArrivalsApp/proxy_v3.php?stop=" + this.props.stop.ID;
        try {
            let response = await fetch(url);
            let responseJson = await response.json();
            this.setState({
                deps: responseJson,
                loading: false
            });
        } catch (error) {
            console.log(error);
        } // End catch
    }; // End getStop

    renderRows = () => {
        if (this.state.loading) {
            return (
                <div className="depTablesR">
                    <Loader small />
                </div>
            )
        } else if (this.state.deps === null || this.state.deps.length === 0) {
            return (
                <div className="depTablesR">
                    <span className="errors">No traffic</span>
                </div>
            )
        } else {
            const deps = this.state.deps;
            return deps.map(dep => {
                return (
                    <div className="depTablesR" key={dep.VehicleJourneyName}>
                        <span className="depsLines"><span className="lineNumbers">{ dep.LineRef }</span> { dep.DestinationName }</span>
                        <span className="depsExpecteds">{ calcTime(dep.MonitoredCall.ExpectedArrivalTime) }</span>
                    </div>
                );
            });
        }
    }; // End renderRows

    render = () => {
        return(
            <div className="departures">
                <div className="depTables">
                    <div className="depTablesH">{ this.props.stop.Name }</div>
                    { this.renderRows() }
                </div>
            </div>
        );
    } // End render
} // End StopTable