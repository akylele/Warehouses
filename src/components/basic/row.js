import React from 'react'

const Row = (props) => {

    const style = () => {
        if(props.styles){
            switch (props.styles) {
                case props.styles.includes('right'):
                    return 'right'
                case props.styles.includes('left'):
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