import React from 'react';
import RamenMap from './RamenMap';
import Navbar from './Navbar';
// todo地圖導入資料
const MapIndex = () => (
  <>
    {/* Navbar特別獨立出去避免RamenMap 裡面改變state時影響而重複render */}
    <Navbar page="map" />
    <RamenMap />
  </>
);

export default MapIndex;
