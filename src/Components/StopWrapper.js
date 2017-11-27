import React, { Component } from 'react';
import { isEqual } from 'lodash';
import latLonToUTM from '../scripts/General';

import StopTable from './StopTable';

export default class StopWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            utm: null,
            watchId: null,
            stops: null,
            data: null
        };

        setInterval(this.getStops, 10000);
    } // End constructor

    componentWillMount() {
        this.handleLocation();
    }; // End componentWillMount

    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevState.data, this.state.data)) {
            if (this.state.data.length === 0) {
                this.props.setError({
                    label: 'No stops found!',
                    big: true,
                    bright: true
                });
                this.props.setLoading(false);
            }
        }
    }// End componentDidUpdate

    componentWillUnmount() {
        if (this.state.watchId !== null) {
            navigator.geolocation.clearWatch(this.state.watchId);
        }
    }; // End componentWillUnmount

    handleLocation = () => {
        if ("geolocation" in navigator) {
            const watchId = navigator.geolocation.watchPosition(
                position => {
                    this.setCoords(position);
                    this.props.setError();
                },
                error => {
                    this.props.setError({
                        label: 'For Spot On to work, Spot On need to access your location!',
                        big: false,
                        bright: true
                    });
                    this.props.setLoading(false);
                }, {
                    enableHighAccuracy: true,
                    maximumAge: 1000,
                    timeout: 10000
                });
            this.setState({ watchId });
        } else {
            this.props.setError({
                label: 'We did not manage to get your location!',
                big: true,
                bright: true
            });
        }
    }; // End handleLocation

    setCoords = position => {
        const xy = latLonToUTM(position.coords.latitude, position.coords.longitude);
        this.setState({
            utm: {
                x: parseInt(xy[0]),
                y: parseInt(xy[1])
            }
        });
        this.getStops();
    }; // End setCoords

    getStops = async () => {
        if (this.state.utm !== null) {
            let url = "https://hjelvik.net/spotOn/proxy_v3.php?coords=" + this.state.utm.x + "," + this.state.utm.y;
            // let url = "http://localhost/RuterExpectedArrivalsApp/proxy_v3.php?coords=" + this.state.utm.x + "," + this.state.utm.y;
            try {
                let response = await fetch(url);
                let responseJson = await response.json();
                this.setState({
                    data: responseJson
                });
            } catch (error) {
                console.log(error);
                this.props.setError({
                    label: 'Something went wrong!',
                    big: true,
                    bright: true
                })
            } // End catch

            this.props.setLoading(false);
        }
    }; // End getStops

    constructTables = () => {
        if (this.state.data && this.state.data.length > 0) {
            const stops = this.state.data;
            return stops.map(item => <StopTable key={item.ID} stop={item} />);
        }
        return null;
    }; // End constructTables

    render() {
        return (
            <section>
                { this.constructTables() }
            </section>
        );
    } // End render
} // End StopWrapper;