import React from 'react';
import * as L from 'leaflet';
import * as cityline from './associate.json';
import * as cityRoad from './cityRoad.json';
import '../asset/map.css';

// 暫解:map在didmount的時候生成，但外面的選項更動時也要能跳動，故map宣告在最外層
let map = null;
export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '請選擇縣市',
      latlnt: undefined,
    };
  }

  componentDidMount() {
    map = L.map('map').setView([25.0491609, 121.4890514], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    // mouse事件 顏色改變要看官網的屬性
    function changeColor(e) {
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
    L.geoJSON(cityline.features, {
      onEachFeature: EachFeature,
      style: {
        weight: 0.5,
        fillColor: 'white',
      },
    }).addTo(map);
  }

  //  綁定選擇縣市
  handleChange = async (e) => {
    const ind = e.target.selectedIndex;
    const city = document.querySelector('#city');
    const lat = city.children[ind].dataset.place;
    this.setState({
      data: e.target.value,
    });
    map.panTo(lat.split(','));
    if (this.state.data !== e.target.value) {
      try {
        const res = await fetch('http://localhost:5000/star');
        const json = await res.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <section>
          <div className="wrap d-flex justify-content-between">
            <div className="RdFilter">
              <select onChange={this.handleChange} id="city">
                <option value={undefined}>請選擇縣市</option>
                {cityRoad.map((item) => (
                  <option key={item.CityName} data-place={Object.values(item.LatLng)}>
                    {item.CityName}
                  </option>
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
