import React, { useRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import './Tooltip.scss'
import { TooltipColor } from '../../helpers'

const Tooltip = ({ children, text, color, position }) => {
    const tooltipRef = useRef(null)
    const [tooltipWidth, setTooltipWidth] = useState(0)
    const [tooltipHeight, setTooltipHeight] = useState(0)
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const tooltipColor = TooltipColor[color] || TooltipColor.black
    const arrowPositionMap = {
        top: 'arrow-down',
        bottom: 'arrow-up',
        left: 'arrow-right',
        right: 'arrow-left',
    }
    const arrowPosition = arrowPositionMap[position] || arrowPositionMap.down

    useEffect(() => {
        const boundingRect = tooltipRef.current.getBoundingClientRect()
        setTooltipWidth(boundingRect.width)
        setTooltipHeight(boundingRect.height)
    }, [setTooltipWidth, setTooltipHeight])
    
    const positionStyleMap = {
        top: {
            top: `-${tooltipHeight}px`
        },
        bottom: {
            bottom: `-${tooltipHeight}px`
        },
        left: {
            left: `-${tooltipWidth}px`
        },
        right: {
            right: `-${tooltipWidth}px`
        }
    }

    const mouseEnterHandler = () => {
        setTooltipVisible(true)
    }

    const mouseLeaveHandler = () => {
        setTooltipVisible(false)
    }

    return (
        <div
            className="container"
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <div className={classNames('tooltip-container', position)}
                 ref={tooltipRef}
                 style={{
                     ...positionStyleMap[position],
                     visibility: tooltipVisible ? 'visible' : 'hidden'
                 }}
            >
                <div
                    className="tooltip"
                    style={{
                        color: '#fff',
                        backgroundColor: tooltipColor
                    }}
                >{text}</div>
                <div
                    className={arrowPosition}
                    style={{
                        [`border-${position}-color`]: tooltipColor
                    }}></div>
            </div>
            {children}
        </div>
    )
}

export default Tooltip
