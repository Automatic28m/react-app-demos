import React from "react";
import PropTypes from 'prop-types';

export const Response = (props) => {
    return (
        <>
            <div>
                <b className="text-xl">Result</b>
            </div>
            <div>
                <div>
                    <span>Value : </span><span className="text-accent">{props.passProp}</span>
                </div>
                <div>
                    <span>Type : </span><span className="text-accent">{typeof (props.passProp)}</span>
                </div>
            </div>
        </>
    )

}

Response.propTypes = {
    passProp: PropTypes.number.isRequired,
}