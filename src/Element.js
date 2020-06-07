import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup,Circle } from "react-leaflet"


class Element extends Component {

    render() {
        return ( <li  className="list-group-item"  key={index}>
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
    
        );
    }
}


