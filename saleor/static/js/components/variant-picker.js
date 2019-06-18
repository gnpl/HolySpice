import React from 'react';
import ReactDOM from 'react-dom';

import VariantPicker from './variantPicker/VariantPicker';
import VariantPrice from './variantPicker/VariantPrice';
import variantPickerStore from '../stores/variantPicker';
import * as Vibrant from 'node-vibrant';

import {onAddToCheckoutSuccess, onAddToCheckoutError} from './checkout';

export default $(document).ready((e) => {
  const variantPickerContainer = document.getElementById('variant-picker');
  const variantPriceContainer = document.getElementById('variant-price-component');
  function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}
  function getColor() {
  return (
    "#" +
    Math.random()
      .toString(16)
      .slice(2, 8)
  );
}
  img.addEventListener('load', function() {
    var col = getColor();
    document.body.style.backgroundColor = col;
    document.getElementById('navbar').style.backgroundColor = col;
    document.getElementById('sidebar').style.backgroundColor = shadeColor(col,-20);
    document.getElementById('checkbar').style.backgroundColor = col;
  });
  if (variantPickerContainer) {
    const variantPickerData = JSON.parse(variantPickerContainer.dataset.variantPickerData);
    ReactDOM.render(
      <VariantPicker
        onAddToCheckoutError={onAddToCheckoutError}
        onAddToCheckoutSuccess={onAddToCheckoutSuccess}
        store={variantPickerStore}
        url={variantPickerContainer.dataset.action}
        variantAttributes={variantPickerData.variantAttributes}
        variants={variantPickerData.variants}
      />,
      variantPickerContainer
    );

    if (variantPriceContainer) {
      ReactDOM.render(
        <VariantPrice
          availability={variantPickerData.availability}
          priceDisplay={variantPickerData.priceDisplay}
          store={variantPickerStore}
        />,
        variantPriceContainer
      );
    }
  }
});
