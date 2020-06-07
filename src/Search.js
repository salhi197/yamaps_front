import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup,Circle } from "react-leaflet"


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      country: "algérie",
      usedMethod:"none",
      cities: [],
      coordinates:[
        -1.4277291 ,35.059692
      ],
      city:[]
      };  
  }
  

componentDidMount(){
  navigator.geolocation.getCurrentPosition(location => {
    this.setState({
      coordinates:[location.coords.latitude,location.coords.longitude]
    })
  });  
}



handleOnChange = event => {
  // this.setState({ searchValue: event.target.value });
  this.setState ({
    [event.target.name]: event.target.value,
  })
  this.makeApiCall(this.state.searchValue ,this.state.country);
};

handleCityClick = event => {
    var getCityUrl = 'http:///'+process.env.REACT_APP_API_HOST+':'+process.env.REACT_APP_API_PORT+'/place/details';
    console.log(event.target)
    this.setState({
      coordinates:[event.target.getAttribute('lon'),event.target.getAttribute('lat')],
      cities:[]    
    })
    fetch(getCityUrl,{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },      
      body: JSON.stringify({
        _id: event.target.getAttribute('_id'),
      })
  })
  .then(response => {
    return response.json();
  })
  .then(jsonData => {
    console.log(jsonData.city.result)
    this.setState({ city: jsonData.city.result });

  });
};


makeApiCall = (searchInput,country) => {
  if(searchInput.length > 0){
    var searchUrl = 'http://'+process.env.REACT_APP_API_HOST+':'+process.env.REACT_APP_API_PORT+'/v1/api';
    fetch(searchUrl,{ 
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },      
      body: JSON.stringify(
        {input: searchInput,
        country: country,
        lat:this.state.coordinates[0],
        lon:this.state.coordinates[1],
      })
  })
  .then(response => {
      return response.json();
    })
    .then(jsonData => {
      console.log(jsonData.predictions)
        this.setState({ cities: jsonData.predictions, });
    });
  }
};



  render() {
    return (

                    <div className="container-fluid" id="">
                        <div className="row parent ">
                                <div className="col-md-3 col-xs-10 absolute">
                                        <input
                                                className="search form-control"
                                                  type="text"
                                                  name="searchValue"
                                                  placeholder="Search"
                                                  onChange={event => this.handleOnChange(event)}
                                                  value={this.state.searchValue}
                                        />
                                        <input
                                                className="search form-control"
                                                  type="text"
                                                  name="country"
                                                  placeholder="Search"
                                                  onChange={event => this.handleOnChange(event)}
                                                  value={this.state.country}
                                        />
                                                                                
                                        <p className="list-group-item"> Used Method : 
                                          <span>
                                            {this.state.usedMethod}
                                          </span>
                                          
                                        </p>
                                        {this.state.cities ? (
                                            <div className="ul-container">
                                                <ul className="list-group">
                                                    {this.state.cities.map((city, index) => (
                                                      <Element city/>
                                                    ))}
                                                </ul>
                                             ) : (
                                            <p>Try searching for a meal</p>
                                        )}
                                </div>

                              <div className="col-md-12 map">
                                  <Map center={this.state.coordinates} zoom={15}>
                                          <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                          />
                                        <Marker
                                          position={this.state.coordinates}
                                        />
                                      {/* <Circle 
                                        center={this.state.coordinates}
                                        fillColor="blue" 
                                        radius={5000}/> */}

                                  </Map>
                              </div>
                        </div>
                    </div>
    );
  }
}

export default Search;





