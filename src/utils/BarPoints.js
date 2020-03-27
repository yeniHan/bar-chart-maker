
const chkAllValueIsNumeric = function (list, yKey) {
    return list.every(item => !isNaN(item[yKey]))
}

const sortList = (data, asec, yKey) => {
    if (asec){
        return data.sort((a, b) => {
            if (a[yKey] > b[yKey]) return  1
            else if (a[yKey] < b[yKey]) return -1
            else return 0
        })
    }else {
        return data.sort((a, b) => {
            if (a[yKey] < b[yKey]) return  1
            else if (a[yKey] > b[yKey]) return -1
            else return 0
        })
    }
}

const BarPoints = function (list, xKey, yKey) {
    // valid "Y" key check: 비교가능한 수치여야함!
    if (chkAllValueIsNumeric(list, yKey)){
        const sortedList = sortList(list, true, yKey)
        this.listInfo = {
            data: sortedList,
            info: this.getListInfo(sortedList)
        }

        this.xKey = xKey
        this.yKey = yKey
        this.barWidth = this.getBarWidth()
        this.between = 10
        this.paperWidth = this.getPaperWidth()
        this.paperHeight = 510
        this.yUnit = ( this.paperHeight - 10 )/100
        this.middleX = Math.floor(this.paperWidth/2)
        this.startXs = null
        // // y value의 최소 uit을 y 최대값을 찾아, paperHeight로 계산하여 설정
        this.maxY = this.getMaxY()
        // bar들의 중앙 정렬을 위해 필요한 정보 생성
        this.points = []
    } else throw new Error('NOT VALID Y KEY')
}

BarPoints.prototype.getBarWidth = function () {
    const len = this.listInfo.data.length
    if (len <= 5) return 100
    else if (5 < len <= 15) return 40
    else if (15 < len <= 30) return 20
    else return 10
}

BarPoints.prototype.getListInfo = function (list) {
    const len = list.length
    const endIdx = Math.floor(len/2)
    const isEven = len%2 === 0
    return {
        leftList: list.slice(0, endIdx),
        rightList: list.slice(isEven ? endIdx: endIdx + 1), 
        middleItem: !isEven? list[endIdx]: null
    }
}

BarPoints.prototype.getMaxY = function () {
    const yKey = this.yKey
    const maxY = Math.max.apply(Math, this.listInfo.data.map(function(o) { return o[yKey] }))
    return maxY
}

BarPoints.prototype.getPaperWidth = function () {
    const len = this.listInfo.data.length
    return this.between * 2 + this.barWidth * len + (len- 1) * this.between
}

BarPoints.prototype.processY = function (y) {
    return Math.floor(this.yUnit * ( y /this.maxY ) * 100)
}

BarPoints.prototype.createMiddlePoint = function () {
    const { middleItem } = this.listInfo.info
    const xM = this.middleX - this.barWidth/2
    const yM = this.processY(middleItem[this.yKey])
    const middlePoint = { xLabel: `${middleItem[this.xKey]}` ,x: xM, y: yM, color: middleItem.color}
    return middlePoint
}

BarPoints.prototype.createStartXs = function () {
    if (this.points.length > 0) {
        const { x, y } = this.points[0]
        return {
            startXLeft : x - this.between/2 - this.barWidth,
            startXRight : x + this.barWidth + this.between/2
        }
    }else {
        return {
            startXLeft : this.middleX - this.between/2 - this.barWidth,
            startXRight : this.middleX + this.between/2
        }
    }
}


BarPoints.prototype.createLeftRightPoints = function () {
    const { leftList, rightList } = this.listInfo.info 
    const { startXLeft, startXRight } = this.startXs
    let points = []
    sortList(leftList, false, this.yKey).reduce((accX, curr) => {
        points.push({ xLabel: `${curr[this.xKey]}`, x: accX, y: this.processY(curr[this.yKey]), color: curr.color})
        return accX + (-1)*(this.barWidth + this.between)
    }, startXLeft)

    rightList.reduce((accX, curr) => {
        points.push({  xLabel: `${curr[this.xKey]}`, x: accX, y: this.processY(curr[this.yKey]), color: curr.color})
        return accX + (this.barWidth + this.between)
    }, startXRight)
    
    return points
}

BarPoints.prototype.getPoints = function () {

    if (this.listInfo.info.middleItem) {
        this.points.push(this.createMiddlePoint())
    }

    this.startXs = this.createStartXs()
    this.points = this.points.concat(this.createLeftRightPoints())
 
    return this.points
}


export default BarPoints;
