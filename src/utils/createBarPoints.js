const chkAllValueIsNumeric = function (list) {
    return list.every(item => !isNaN(item))
}

const getBarWidth = function (len) {
    if (len <= 5) return 200
    else if (5 < len <= 15) return 60
    else if (15 < len) return 40
}

const getListInfo = function (list) {
    const len = list.length
    const endIdx = Math.floor(len/2)
    const isEven = len%2 === 0
    return {
        leftList: list.slice(0, endIdx),
        rightList: list.slice(isEven ? endIdx: endIdx + 1), 
        middleItem: !isEven? list[endIdx]: null
    }
}

BarPoints.prototype.getYUnit = function () {
    const maxY = Math.max.apply(Math, this.list.map(function(o) { return o[this.yKey] }))
    this.yUnit = Math.floor(this.paperHeight - 10 / maxY)
}

const BarPoints = function (list, xKey, yKey) {
    // valid "Y" key check: 비교가능한 수치여야함!
    if (chkAllValueIsNumeric(list)){
        this.barWidth = getBarWidth(list.length)
        this.between = 10
        this.paperWidth = this.between*2 + barWidth*list.length + (list.length - 1)*this.between
        this.paperHeight = 4500
        this.middleX = Math.floor(paperWidth/2)
        this.xKey = xKey
        this.yKey = yKey
        this.getYUnit()
        // bar들의 중앙 정렬을 위해
        const listInfo = sliceLists(list)
        this.points = []
    } else throw new Error('Not a valid Y key!')
}


BarPoints.prototype.createLeftRightPoints = function (info) {
    const { startXLeft, leftList, startXRight, rightList}
    const m = isLeftList ? -1 : 1
    let pointsLeft = []
    list.reduce((accX, nextX, idx) => {
        const thisItem = list[idx]
        pointsLeft.push({ x: accX, y: thisItem[this.yKey]*this.yUnit, color: thisItem.color})
        return startX +  (-1)*(this.barWidth + this.between)
    }, startX)
    this.points.concat(pointsLeft)

    let pointsRight = []
    list.reduce((accX, nextX, idx) => {
        const thisItem = list[idx]
        pointsLeft.push({ x: accX, y: thisItem[this.yKey]*this.yUnit, color: thisItem.color})
        return startX + (-1)*(this.barWidth + this.between)
    }, startX)
    this.points.concat(pointsLeft)
    
}

BarPoints.prototype.createMiddlePoint = function () {
    const { middleItem } = this.listInfo
    const xM = this.middleX
    const yM = middleItem[this.yKey]*this.yUnit
    const middlePoint = { x: xM, y: yM, color: middleItem.color}
    this.points.push(middlePoint) 
    startXLeft = x + this.barWidth/2 + this.between
    startXRight = y + this.barWidth/2 + this.between
}

BarPoints.prototype.createPoints = function () {
    let startXLeft = null
    let startXRight = null
    if (this.listInfo.middleItem) {

    } else {
        startXLeft = this.middleX + this.between/2
        startXRight = this.middleX + this.between/2
    }

    this.points = this.points.concat(this.createLeftRightPoints(startXLeft, listInfo.leftList, true))
    this.points = this.points.concat(this.createLeftRightPoints(startXRight, listInfo.rightList, false))
}

const barP = new BarPoints()
barP.createPoints()
//     dataList: [20, 30, 40],

BarPoints.prototype.createSVG = null
const svg =  () => {
    
}

