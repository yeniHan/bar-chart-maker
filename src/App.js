import React, { useState } from 'react';
import './App.scss';
import FileInput from './components/FileInput';
import BarPoints, { yKeyValidationChk } from './utils/BarPoints';
import SettingBox from './components/SettingBox';
import BarChart from './components/BarChart';

function App() {
  const [ dataList, setDataList ] = useState(null)
  const [ pointsObj, setPointsObj ] = useState(null)
  const [ xKey, setXKey ] = useState("None") 
  const [ yKey, setYKey ] = useState("None")
  const [ yStepsNum, setYStepsNum ] = useState(4)

  const onChangeFile = (dataList) => {
    setDataList(dataList)
    setPointsObj(null)
    setXKey("None")
    setYKey("None")
    setYStepsNum(4)
  }

  const onChangeXYKey = (keyName, key) => {
    if(keyName === 'yKey') {
      const isValid = yKeyValidationChk(dataList, key)
      if (!isValid) alert('Y축 필드값은 수치여야 합니다.')
      else setYKey(key)
    }else setXKey(key)
  }

  const setColor = (idx, color) => {
    let list = dataList.map((item, i) => {
      if(idx=== i) return { ...item, color: color}
      return item
    })
    setDataList(list)
  }

  const createBarChart = () => {
    if (!xKey|| !yKey) { alert('X축 필드과 Y축 필드를 지정해주세요.')}
    else {
      try {
        const pointsObj = new BarPoints(dataList, xKey, yKey, yStepsNum)
        setPointsObj(pointsObj)
      } catch (e) {
        alert(e.message)
      } 
    }
  }
  return (
    <div className="App">
        <h1>Bar Chart Maker</h1>
        <FileInput onChangeFile={onChangeFile}/>
        { dataList && <SettingBox dataList={dataList} createBarChart={createBarChart} setColor={setColor}
          xKey={xKey} yKey={yKey} onChangeXYKey={onChangeXYKey} yStepsNum={yStepsNum} setYStepsNum={setYStepsNum}/>}
        { pointsObj && <BarChart pointsObj={pointsObj}/>}
    </div>
  );
}

export default App;
