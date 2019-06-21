import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Textfield = ({
    placeholder,
    name,
    label,
    error,
    value,
    type,
    onChange,
    info,
    disabled
}) => {
    return (
        <div className="form-group">
        <input
          type={type}
          className={classnames('form-control form-control-lg',{
            'is-invalid':error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {{info} && <div className="form-text text-muted">{info}</div>}
        {{error} && <div className="invalid-feedback">{error}</div>}
      </div>

    );
};

Textfield.propTypes = {
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    type:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    disabled:PropTypes.string
}

Textfield.defaultProps = {
    type:'text'
}

export default Textfield;