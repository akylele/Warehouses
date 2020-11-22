import React from 'react'

const Col = (props) => (
    <div className={`col ${props.styles || ''}`}  {...props}>
        {props.children}
    </div>
)

export default Col