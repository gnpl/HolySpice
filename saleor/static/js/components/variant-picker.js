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
  img.crossOrigin = "Anonymous";
  img.addEventListener('load', function() {
    let v = new Vibrant(img.getAttribute('data-src'));
    console.log(img);
    v.getPalette((err, palette) => {
    console.log(palette.Vibrant.hex, err);
    document.body.style.backgroundColor = palette.Muted.hex;
    document.getElementById('navbar').style.backgroundColor = palette.Muted.hex;
    document.getElementById('sidebar').style.backgroundColor = palette.Muted.hex;
    document.getElementById('checkbar').style.backgroundColor = palette.Muted.hex;
    });
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
