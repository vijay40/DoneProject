import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  onChange = (event) => {
    const { id, onChange } = this.props;
    const { value } = event.target;
    return onChange(id, value);
  }

  render() {
    const {
      id, selectText, disableSelectText, options, value,
    } = this.props;
    return (
      <select
        className="select-field"
        onChange={this.onChange}
        id={id}
        value={value}
      >
        {disableSelectText ? '' : <option value="" key="">{selectText}</option>}
        {options.map((item) => (
          <option
            value={item.value}
            key={item.key}
          >
            {item.name}
          </option>
        ))}
      </select>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  disableSelectText: PropTypes.bool,
  selectText: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

Select.defaultProps = {
  selectText: '',
  disableSelectText: false,
  value: '',
  onChange: () => '',
};

export default Select;
