import React from 'react';
import PropTypes from 'prop-types';

const Toast = ({msg})=>(
    <div className="animated toast">
        { msg }
    </div>
)
Toast.propTypes = {
    msg:PropTypes.string.isRequired
}
export default Toast;
