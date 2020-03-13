import React from 'react';
import { Link } from 'react-router-dom';
import * as L from 'leaflet';
import cityline from './associate.json';
import cityRoad from './cityRoad.json';
import '../asset/map.css';

// 暫解:map在didmount的時候生成，但外面的選項更動時也要能跳動，故map宣告在最外層
let map = null;

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '請選擇縣市',
      data: [],
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
    const ind = e.target.selectedIndex; // 取出選取的城市 為selected 的位置
    const city = document.querySelector('#city');
    const lat = city.children[ind].dataset.place; // select標籤下的option有selected並取出dataset值
    // 如果選擇選為初始狀態資料都改為初始
    if (lat === undefined) {
      this.setState({
        selected: city.value,
        data: [],
      });
      return;
    }
    map.panTo(lat.split(','));// 經緯度從逗號切開

    try {
      const res = await fetch('http://localhost:5000/star');
      const json = await res.json();
      console.log(city.value);
      this.setState({
        selected: city.value,
        data: json,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { data, selected } = this.state;
    console.log(this.state);
    return (
      <>
        <section>
          <div className="wrapMap">
            <div className="RdFilter">
              <select onChange={this.handleChange} id="city">
                <option value={undefined}>請選擇縣市</option>
                {cityRoad.map((item) => (
                  <option key={item.CityName} data-place={Object.values(item.LatLng)}>
                    {item.CityName}
                  </option>
                ))}
              </select>
              {/* 判斷上方城市是否有選擇，再判斷資料跟選擇城市是否相同 */}
              {
                selected !== '請選擇縣市' ? (
                  <select className="toggleSlide">
                    {cityRoad.map((item) => (
                      item.CityName === selected ? (
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
              {/* 判斷撈回是否有資料 */}
              {
                data ? data.map((item) => (
                  <figure key={item.id}>
                    <Link to="./">
                      <img src={`images/${item.img}`} alt="" />
                      <h4>
                        {item.title}
                        <small>
                          {`  評分: ${item.point}`}
                        </small>
                      </h4>
                    </Link>
                  </figure>
                )) : ''
              }
            </div>
            <div id="map" />
          </div>
        </section>
      </>
    );
  }
}
