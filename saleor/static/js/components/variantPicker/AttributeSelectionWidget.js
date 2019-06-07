import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Parser from 'html-react-parser';

export default class AttributeSelectionWidget extends Component {

  static propTypes = {
    attribute: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    selected: PropTypes.string
  };

  handleChange = (attrPk, valuePk) => {
    this.props.handleChange(attrPk.toString(), valuePk.toString());
  }

  render() {
    const ur1 = "<img src='/static/images/";
    const ur2 = ".png' height='50px' width='50px'>";
    const { attribute, selected } = this.props;
    const variantPickerContainer = document.getElementById('variant-picker');
    const variantPickerData = JSON.parse(variantPickerContainer.dataset.variantPickerData);
    var rates = {};
    return (
      <div className="variant-picker">
        <div className="variant-picker__label">{attribute.name}</div>
        <div className="btn-group" data-toggle="buttons">
          {attribute.values.map((value, i) => {
            const active = selected === value.pk.toString();
            rates[value.pk] = +(Math.round(Number(variantPickerData.variants[i].price.net) / Number(attribute.values[i].name.match(/\d/g).join('')) + 'e+2') + 'e-2');
            const labelClass = classNames({
              'btn btn-secondary variant-picker__option': true,
              'active': active
            });
            return (
              <label
                className={labelClass}
                key={i}
                onClick={() => {
                  this.handleChange(attribute.pk, value.pk);
                }}>
                <input
                  defaultChecked={active}
                  name={value.pk}
                  type="radio"/>
                {Parser(ur1 + value.name + ur2)}
              </label>
            );
          })}
        </div>
        <p>₹{rates[selected]}/gm</p>
      </div>
    );
  }
}
