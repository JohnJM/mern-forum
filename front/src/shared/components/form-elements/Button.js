import React from 'react';
import {Link} from 'react-router-dom';
const Button = props => {
    if (props.href) {
        return (
            <a
                className={`btn text-${props.size || 'base'} ${props.size && 'x1'}${props.inverse && 'button--inverse'}`}
                href={props.href}>
                {props.children}
            </a>
        );
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                    exact={props.exact}
                    className={`btn text-${props.size || 'base'}${props.size && 'x1'} ${props.inverse && 'button--inverse'}`}>
                    {props.children}
                </Link>
            );
    }
    return (
        <button
        // brken - try use instead of base use text-red-500?
            className={`btn text-${props.size || 'base'}${props.size && 'xl'} ${props.inverse && 'btn--inverse'}`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}>
            {props.children}
        </button>

    )
}

export default Button;