import React from 'react'

const Button = (props) => (
    <span className={`btn ${props.styles || ''} ${props.styles && props.styles.includes('red') ? '' : 'blue'} `} {...props}>
        {props.children}
    </span>
)

export default Button