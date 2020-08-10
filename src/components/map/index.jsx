import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

import { colors } from '../../utils/markerColors';
import { groupDynamically } from '../../utils/gruopDynamically';
import { geocode } from '../../utils/geocode';

const style = {
  width: '80%',
  height: '70%',
  margin: '2vh 10vw',
};

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
      addressError: '',
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      markerAddress: '',
      markerCat: '',
      loading: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.addresses !== prevProps.addresses) {
      this.getLatLong();
      this.setState({ addressError: '', loading: true });
    }
  }
  //Get coordinates from addresses
  getLatLong = async () => {
    const addresses = this.props.addresses;
    const coordinates = [];
    for (let i = 0; i < addresses.length; i++) {
      let address = `${addresses[i].state ? addresses[i].state + ' ' : ''}${
        addresses[i].city ? addresses[i].city + ' ' : ''
      }${addresses[i].zip ? addresses[i].zip + ' ' : ''}${addresses[i].address ? addresses[i].address : ''}`;
      try {
        let newLoc = await geocode(address, this.props.google);
        coordinates.push({ ...newLoc, category: addresses[i].category });
      } catch (addressError) {
        this.setState({ addressError });
      }
    }
    this.setState({ coordinates, loading: false });
  };

  displayMarkers = () => {
    let locationsWithCategories = this.state.coordinates.groupDynamically('category');
    return Object.keys(locationsWithCategories).map((key, index) => {
      return locationsWithCategories[key].map(({ category, address, ...obj }) => {
        return (
          <Marker
            key={address}
            id={address}
            className={category}
            position={obj}
            icon={colors[index]}
            onClick={this.onMarkerClick}
          />
        );
      });
    });
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: marker.position,
      showingInfoWindow: true,
      markerAddress: marker.id,
      markerCat: marker.className,
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };
  //Fit all Markers on the map
  setMapBounds = () => {
    let bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < this.state.coordinates.length; i++) {
      bounds.extend(this.state.coordinates[i]);
    }
    return bounds;
  };

  render() {
    return (
      <div className="mapDiv">
        {this.state.addressError !== undefined && <div className="messageDiv">{this.state.addressError}</div>}
        {this.state.loading && <div className="messageDiv">Please wait...</div>}
        <Map
          google={this.props.google}
          style={style}
          zoom={7}
          onClick={this.onMapClicked}
          initialCenter={{ lat: 51.107883, lng: 17.038538 }}
          bounds={this.setMapBounds()}
        >
          {this.state.coordinates.length > 0 && this.displayMarkers()}
          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h4>{this.state.markerCat}</h4>
              <h5>{this.state.markerAddress}</h5>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addresses: state.addresses.addressesInfo,
});

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  })(GoogleMap),
);
