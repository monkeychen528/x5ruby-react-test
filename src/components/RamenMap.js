import React from 'react';
import * as L from 'leaflet';
import * as cityline from './associate.json';
import * as cityRoad from './cityRoad.json';

// import '../mapNav.css';
import '../map.css';

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '請選擇縣市',
    };
  }


  componentDidMount() {
    const map = L.map('map').setView([25.0491609, 121.4890514], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // mouse事件 顏色改變要看官網的屬性
    function changeColor(e) {
      console.log(e);
      e.target.setStyle({ fillColor: 'blue' });
    }
    function changeBack(e) {
      e.target.setStyle({ fillColor: 'white' });
    }
    // 綁事件或改顏色都在這function改
    function EachFeature(feature, layer) {
      // does this feature have a property named popupContent?
      if (feature.properties.COUNTYNAME) {
        layer.bindPopup(feature.properties.COUNTYNAME);
      }
      layer.on({
        mouseover: changeColor,
        mouseout: changeBack,
      });
    }

    // 搭配console看，leaflet 的onEachFeature會自動跑回圈綁上popup
    console.log(cityline.features);
    L.geoJSON(cityline.features, {
      onEachFeature: EachFeature,
      style: {
        weight: 0.5,
        fillColor: 'white',
      },
    }).addTo(map);
  }

  //  綁定選擇縣市
  handleChange = (e) => {
    this.setState({ data: e.target.value });
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <section>
          <div className="wrap d-flex justify-content-between">
            <div className="RdFilter">
              <select onChange={this.handleChange}>
                <option value={undefined}>請選擇縣市</option>
                {cityRoad.map((item) => (
                  <option key={item.CityName}>{item.CityName}</option>
                ))}
              </select>
              {
                data !== '請選擇縣市' ? (
                  <select className="toggleSlide">
                    {cityRoad.map((item) => (
                      item.CityName === data ? (
                        item.AreaList.map((dist) => (
                          <option key={dist.ZipCode}>
                            {dist.AreaName}
                          </option>
                        ))
                      ) : '無資料'
                    ))}

                  </select>
                ) : ''
              }
            </div>
            <div id="map" />
          </div>
        </section>
      </>
    );
  }
}
