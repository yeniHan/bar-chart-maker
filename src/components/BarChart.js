import React, { useState, useEffect } from 'react';
import './BarChart.scss';

const BarChart = ({pointsObj}) => {
    const defaultColor = '#a2a2a2'
    const [points, setPoints] = useState([])
    
    useEffect(() => {
        setPoints(pointsObj.getPoints())
    }, [pointsObj])

    const { paperWidth, paperHeight, barWidth } = pointsObj
    return (
        <div className="bar-chart">
            <svg width={paperWidth} height={paperHeight}>
                {points.map(p => {
                    const { xLabel, x, y, color } = p
                    return (
                            <rect x={x} y={paperHeight - y} width={barWidth} height={y} fill={color ? color: defaultColor} />
                    )
                })}
            </svg>
            <svg width={paperWidth} height={15}>
                {points.map(p => {
                    const { xLabel, x, y, color } = p
                    return (
                        <text x={x} y={15} fill="black" font-size="10">{`${xLabel}`.slice(0, 5)}</text>
                    )
                })}
            </svg>
        </div>
    )
}

export default BarChart