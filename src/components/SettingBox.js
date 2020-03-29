import React, { useState, useEffect } from 'react'
import { CirclePicker } from 'react-color';
import './SettingBox.scss';
import { InputLabel, Select, MenuItem} from "@material-ui/core";

const SettingBox = ({dataList, createBarChart, setColor, xKey, yKey, onChangeXYKey, yStepsNum, setYStepsNum}) => {
    const keys = Object.keys(dataList[0])

    return (
        <div className="setting-box">
            <div> 
                <table className="select-setting">
                    <tr>
                        <td><InputLabel>X 축&nbsp;&nbsp;</InputLabel></td>
                        <td>
                            <Select onChange={(e) => onChangeXYKey('xKey', e.target.value)} value={xKey}>
                                <MenuItem key="null" value="None">None</MenuItem>
                                {keys.map((key,idx) => <MenuItem key={idx} value={key}>{key.replace( /"/g , '')}</MenuItem>)}
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td><InputLabel>Y 축&nbsp;&nbsp;</InputLabel></td>
                        <td>
                            <Select onChange={(e) => onChangeXYKey('yKey', e.target.value)} value={yKey}>
                                <MenuItem key="null" value="None">None</MenuItem>
                                {keys.map((key, idx) => <MenuItem key={idx} value={key}>{key.replace( /"/g , '')}</MenuItem>)}
                            </Select>
                        </td>
                    </tr>
                    <tr>
                        <td><InputLabel>Y 축 step 갯수&nbsp;&nbsp;</InputLabel></td>
                        <td>
                            <Select onChange={(e) => setYStepsNum(e.target.value)} value={yStepsNum}>
                                <MenuItem key="null" value="None">None</MenuItem>
                                {new Array(3, 4, 10, 15).map((step, idx) => <MenuItem key={idx} value={step}>{step}</MenuItem>)}
                            </Select>
                        </td>
                    </tr>
                </table>
            </div>
            {(xKey !== "None" && yKey !== "None") &&
                <>
                    <div class="color-setting">
                        <h4>각 데이터의 색상을 지정하세요.</h4>
                        <table>
                            <tr>
                                <th>No.</th><th>{xKey}</th><th>{yKey.replace( /"/g , '')}</th><th>Color picker</th><th>Color</th>
                            </tr>
                            {dataList.map((item, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td><td>{item[xKey]}</td><td>{item[yKey]}</td><td className="col-picker"><CirclePicker colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7"]} onChangeComplete={colorInfo => setColor(idx, colorInfo.hex)}/></td><td>{item.color ? item.color: 'default'}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <button className="create-btn" onClick={() => createBarChart()}>생성</button>
                </>
            }
        </div>
    )
} 

export default SettingBox;