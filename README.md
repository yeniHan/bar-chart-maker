<div align="center">	
    <img src="bar-chart-maker-1.PNG" width="800px"</img> 
    <img src="bar-chart-maker2.PNG" width="800px"</img> 
</div>	

<h1>BarPoints 라이브러리</h1>
<p>
BarPoints는 d3의 막대그래프 그리는 기능을 모사하여 만들어본 copy 프로젝트로, 어떠한 다른 기존 차트 라이브러리도 사용되지 않은 순수 JavaScript 차트 라이브러리입니다.<br/>
첨부된 데이터 파일에서 변환된 object 리스트와 x축과 y축이 설정을 가지고,<br/>
new BarPoints(cvs에서 변환된 object list, x축 필드 이름, y축 필드 이름)를 통해 객체를 생성하면, <br/>
BarPoints의 prototype으로 지정된 getPoints() 함수를 통해, 막대그래프의 각 막대를 그릴 "rect"의 속성값을 반환해줍니다.<br/>
<br/>
<h4>Built-in 함수 설명</h4>
<ul>
    <li> getPoints(): 각 막대에 해당될 "rect" 속성값 반환</li> 
    <li> setXYKeys(): BarPoint 객체의 x축, y축 설정 변경</li>
    <li> setYStepsNum(): BarPoint 객체의 y축 step 갯수 변경</li>
</ul>
</p>
<br/>
<br/>
<h1>&lt;BarChart&gt;컴포넌트</h1>
<p>BarPoint를 객체를 prop로 내려주면, 해당 객체를 가지고 막대그래프를 그려주는 React 컴포넌트</p>
<br/>
<br/>
<h1><b>Bar Chart Maker</b> 사용법</h1>
<p>
BarPoints 라이브러리를 사용하여, CVS 파일 데이터를 막대그래프로 시각화해줍니다.
<br/>
<br/>
1. cvs 파일 첨부 (*CVS만 지원됩니다)<br/>
2. x 축 과 y 축 설정<br/>
3. (옵션) 각 바에 적용될 색상 설정 <br/>
3. 생성 버튼 클릭
</p>
  
 
