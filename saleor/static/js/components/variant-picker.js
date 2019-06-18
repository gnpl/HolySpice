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
  var img = document.getElementById('showcase');
  img.setAttribute('crossOrigin', 'anonymous');
  img.addEventListener('load', function() {
    Vibrant.from(img).getPalette().then(function(palette) {console.log(palette)});
    document.body.style.backgroundColor = '#eab441';
    document.getElementById('navbar').style.backgroundColor = '#eab441';
    document.getElementById('sidebar').style.backgroundColor = '#e8ae30';
    document.getElementById('checkbar').style.backgroundColor = '#eab441';
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
