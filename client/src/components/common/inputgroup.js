import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Inputgroup = ({
    placeholder,
    type,
    name,
    error,
    value,
    onChange,
    icon
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon}></i>
                </span>
            </div>

        <input
          className={classnames('form-control form-control-lg',{
            'is-invalid':error
          })}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {{error} && <div className="invalid-feedback">{error}</div>}
      </div>

    );
};

Inputgroup.propTypes = {
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    icon:PropTypes.string,
    error:PropTypes.string,
    onChange:PropTypes.func.isRequired,
};

Inputgroup.defaultProps = {
    type:'text'
}

export default Inputgroup;