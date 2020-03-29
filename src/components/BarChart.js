import React, { useState, useEffect } from 'react';
import './BarChart.scss';

const BarChart = ({pointsObj}) => {
    const defaultColor = '#a2a2a2'
    const [points, setPoints] = useState([])
    
    useEffect(() => {
        setPoints(pointsObj.getPoints())
    }, [pointsObj])

    const { paperWidth, paperHeight, barWidth, ySteps, between, yStepsWidth } = pointsObj
    
    return (
        <div className="bar-chart">
                <svg width={paperWidth} height={paperHeight} viewBox={`0 0 ${paperWidth} ${paperHeight}`} overflow="auto">
                    {ySteps.map(yStep => {
                       const { ySText, value } = yStep
                        return (
                            <text x={0} y={ySText} font-size="10" width={yStepsWidth}>{value}</text>
                        )
                    })}
                    {ySteps.map(yStep => {
                       const { ySLine } = yStep
                        return (
                            <line x1={0} y1={ySLine} x2={paperWidth} y2={ySLine} stroke="#80808070" stroke-width="1" stroke-dasharray={4}/>
                        )
                    })}
                    {points.map(p => {
                        const { xLabel, x, y, color } = p
                        return (
                            <rect x={x} y={paperHeight - y} width={barWidth} height={y} fill={color ? color: defaultColor} />
                        )
                    })}
                </svg>
            <svg width={paperWidth} height="30px" viewBox={`0 0 ${paperWidth} 30`}>
                {points.map(p => {
                    const { xLabel, x, y, color } = p
                    return (
                        <text x={x} y={15} fill="black" font-size="10">{xLabel.length > 6 ? `${xLabel.slice(0, 7)}..`: xLabel}</text>
                    )
                })}
            </svg>
        </div>
    )
}

export default BarChart