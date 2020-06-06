import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup,Circle } from "react-leaflet"


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
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
    this.setState({ searchValue: event.target.value });
    this.makeApiCall(this.state.searchValue);

  };
  handleCityClick = event => {
//    var scoreUrl = 'http:///localhost:3002/api/score';
    var getCityUrl = 'http:///35.205.193.128/place/details';
    console.log(event.target)
    this.setState({
      coordinates:[event.target.getAttribute('lon'),event.target.getAttribute('lat')],
      cities:[]    
    })
    /**
     * fucntion to increment 
     */
    
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


  makeApiCall = searchInput => {

    if(searchInput.length > 0){
      var searchUrl = 'http://35.205.193.128/v1/api';
      fetch(searchUrl,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },      
        body: JSON.stringify({input: searchInput, b: 'Textual content'})
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
                                                  placeholder="Search"
                                                  onChange={event => this.handleOnChange(event)}
                                                  value={this.state.searchValue}
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
                                                        <li  className="list-group-item"  key={index}>
                                                            <div className="row" key={index}>
                                                                <div className="element" key={index}>
                                                                    <div key={index}>
                                                                        <p
                                                                            lat={city.structured_formatting.location.lat}
                                                                            lon={city.structured_formatting.location.lon}
                                                                            key={index}
                                                                            _id={city.place_id}
                                                                            score={city.structured_formatting['score']}
                                                                            nbclick={city.structured_formatting['nbClick']}

                                                                            onClick={this.handleCityClick}
                                                                        >
                                                                            <i
                                                                                className='fas fa-map-marker-alt'></i>
                                                                            &nbsp;
                                                                            {city.description}
                                                                            <br></br>
                                                                              <small>
                                                                                {city.structured_formatting.location.lat} - {city.structured_formatting.location.lon} 
                                                                                - id : {city.place_id } - method : {city.method}                                                                             
                                                                              </small>                                                                            
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                                     
                                            <div className="col-md-12">
                                                <div className="profile-sidebar">
                                                  <div className="profile-userpic">
                                                  </div>
                                                  <div className="profile-usertitle">
                                                    <div className="profile-usertitle-name">
                                                    {this.state.city.wilaya }
                                                    </div>
                                                    <div className="profile-usertitle-job">
                                                    {this.state.city.formatted_address}
                                                    </div>
                                                  </div>
                                                  <div className="profile-userbuttons">
                                                    <button type="button" className="btn btn-success btn-sm">Itinéraires</button>
                                                  </div>
                                                  <div className="profile-usermenu">
                                                    <ul className="nav">
                                                      <li className="active">
                                                        <a>
                                                        _id :{this.state.city.place_id} </a>
                                                      </li> 
                                                      <li>
                                                        <a>
                                                        NameFr : {this.state.city.name} </a>
                                                      </li>
                                                      <li>
                                                        <a  target="_blank">
                                                        	wilaya :city.wilaya </a>
                                                      </li>
                                                      <li>
                                                        <a>
                                                        Commune : city.commune</a>
                                                      </li>
                                                      <li>
                                                        <a>
                                                        Context : city.Context</a>
                                                      </li>
                                                      <li>
                                                        <a>
                                                        Nombre Click : city.nbclick</a>
                                                      </li>
                                                      <li>
                                                        <a>
                                                        Score : this.state.city.score:</a>
                                                      </li>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
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





