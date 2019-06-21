import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Selectiontext = ({
    name,
    error,
    value,
    onChange,
    info,
    options
}) => {
    const Selectoptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div className="form-group">
        <select
          className={classnames('form-control form-control-lg',{
            'is-invalid':error
          })}
          name={name}
          value={value}
          onChange={onChange}
        >
        {Selectoptions}
        </select>
        {{info} && <div className="form-text text-muted">{info}</div>}
        {{error} && <div className="invalid-feedback">{error}</div>}
      </div>

    );
};

Selectiontext.propTypes = {
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    options:PropTypes.array.isRequired
}

export default Selectiontext;