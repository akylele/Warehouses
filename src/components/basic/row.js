import React from 'react'

const Row = (props) => {

    const style = () => {
        if(props.styles){
            switch (props.styles) {
                case props.styles.indexOf('right'):
                    return 'right'
                case props.styles.indexOf('left'):
                    return 'left'
                default:
                    return 'center'
            }
        }

    }

    return (
        <div className={`row ${props.styles || ''}`}
             style={{display: 'flex', justifyContent: `${props.styles ? style() : 'center'}`}}{...props}>
            {props.children}
        </div>
    )
}

export default Row