import React from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import './Maps.css'

let API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      enabled: false,
      coords: []
    };
    this.getCoordsFromAddress = this.getCoordsFromAddress.bind(this);
    this.getAddressFromCoords = this.getAddressFromCoords.bind(this);
  }
   
  
  
  renderMarkers(map, maps, myLatLng) {
   var markerIcon = {
       url: 'https://image.flaticon.com/icons/svg/1564/1564899.svg',
      
       scaledSize: new maps.Size(40, 40),
      
    };
    for (var i = 0; i < myLatLng.length; i++) {
      var image = markerIcon;
      let marker = new maps.Marker({
        position: { lat: myLatLng[i].latitude, lng: myLatLng[i].longitude },
        map,
        title: "You are here!",
        icon: image
      });
    }
  }

  componentDidMount() {
    this.getCoordsFromAddress(this.props.addressArray);
    // this.getAddressFromCoords("48.8583701","2.2922926")
  }

  async getCoordsFromAddress(address) {
    console.log('get coords')
    console.log(address)
    Geocode.setApiKey(API_KEY);
    for (var i = 0; i < address.length; i++) {
      Geocode.fromAddress(address[i]).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          let tempState = this.state.coords;
          tempState.push({ latitude: lat, longitude: lng });
          this.setState({
            coords: tempState,
            enabled: true
          });
          console.log(this.state);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getAddressFromCoords(latitude, longitude) {
    Geocode.setApiKey(API_KEY);
    Geocode.fromLatLng(latitude, longitude).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    if (this.state.enabled) {
      return (
        
        <div className="map-container">
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            center={{
              lat: this.state.coords[0].latitude,
              lng: this.state.coords[0].longitude
            }}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) =>
              this.renderMarkers(map, maps, this.state.coords)
            }
            defaultZoom={10}
          />
          
        </div>
            
        
      );
    } else {
      return (
        <div
          style={{
            height: "300px",
            width: "300px",
            textAlign: "center",
            lineHeight: "300px",
            border: "solid black 1px"
          }}
        >
          Loading Map...
        </div>
      );
    }
  }
}