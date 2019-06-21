import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Textarea = ({
    placeholder,
    name,
    error,
    value,
    onChange,
    info
}) => {
    return (
        <div className="form-group">
        <textarea
          className={classnames('form-control form-control-lg',{
            'is-invalid':error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {{info} && <div className="form-text text-muted">{info}</div>}
        {{error} && <div className="invalid-feedback">{error}</div>}
      </div>

    );
};

Textarea.propTypes = {
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
}

export default Textarea;