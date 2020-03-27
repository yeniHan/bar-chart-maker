import React, { useState, useEffect } from 'react'
import { CirclePicker } from 'react-color';
import './SettingBox.scss';
import { InputLabel, Select, MenuItem} from "@material-ui/core";

const SettingBox = ({dataList, createBarChart, setColor, xKey, yKey, setXKey, setYKey}) => {
    const keys = Object.keys(dataList[0])

    return (
        <div className="setting-box">
            <div className="axis-setting"> 
                <div className="select-axis">
                    <InputLabel>X 축&nbsp;&nbsp;</InputLabel>
                    <Select onChange={(e) => setXKey(e.target.value)} value={xKey}>
                        <MenuItem key="null" value="None">None</MenuItem>
                        {keys.map((key,idx) => <MenuItem key={idx} value={key}>{key.replace( /"/g , '')}</MenuItem>)}
                    </Select></div>
                <div className="select-axis">
                    <InputLabel>Y 축&nbsp;&nbsp;</InputLabel>
                    <Select onChange={(e) => setYKey(e.target.value)} value={yKey}>
                        <MenuItem key="null" value="None">None</MenuItem>
                        {keys.map((key, idx) => <MenuItem key={idx} value={key}>{key.replace( /"/g , '')}</MenuItem>)}
                    </Select>
                </div>
            </div>
            {(xKey !== "None" && yKey !== "None") &&
                <>
                    <div class="color-setting">
                        <h4>각 데이터의 색상을 지정하세요.</h4>
                        <table>
                            <tr>
                                <th>{xKey}</th><th>{yKey.replace( /"/g , '')}</th><th>Color picker</th><th>Color</th>
                            </tr>
                            {dataList.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{item[xKey]}</td><td>{item[yKey]}</td><td className="col-picker"><CirclePicker colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7"]} onChangeComplete={colorInfo => setColor(idx, colorInfo.hex)}/></td><td>{item.color ? item.color: 'default'}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <button className="create-btn" onClick={() => createBarChart(xKey, yKey)}>생성</button>
                </>
            }
        </div>
    )
} 

export default SettingBox;