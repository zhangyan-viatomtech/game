// import layui from "@/static/layui/layui.all"
import store from "@/store/index"
import echarts from "echarts"
let option = null;
let myChart = null;
let ctx = ''
let width = 0,height=0
let xAxisData=[];
let yAxisData=[];
let trim = ''
let timeout = 0
let time1= 0,time2=0
for(let i=0 ;i<600;i++){
    xAxisData.push(i);
}
export function Drawing(){

    // trim = setTimeout(fn,timeout);
}
function fn(){
    // updateyAxisData()//更新y轴的数据

}

export function updateyAxisData(data){//更新y轴的数据
    myChart = echarts.init(document.getElementById('main'));
    width = document.getElementById('main').clientWidth
    if(store.state.cavansFalg == 1){
        yAxisData=[]
        store.state.cavansFalg = 2
    }else if(store.state.cavansFalg == 2){
        yAxisData.push(data)
    }
    // console.log(yAxisData)
    DrawLine();//每走一遍定时器就更新一次图
    Interval()//定时器改变速率
}
function DrawLine(max,min){
    option = {
        animation:false,
        grid: {
            top: 0,
            left: 0,
            width: width,
            containLabel: false
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
                interval: 1,
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
        },
        yAxis: {
            min: store.state.min,
            max: store.state.max,
            type: 'value',
            minInterval: 1,
            interval:10, //每次增加几个
            axisLabel: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false,
            }
        },
        series: [{
            name: "Ecg",
            type: 'line',
            data: yAxisData,
            symbol: 'none',
            lineStyle: {
                normal: {
                    width: 1,
                    color: "#000"
                }
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(38,203,188)'
                }, {
                    offset: 1,
                    color: 'rgba(33, 94, 138)'
                }])
            },
        }],
    };
    myChart.setOption(option);
}
function Interval(){//根据数据差改变速率
    time1 = localStorage.getItem('time')
    time2 = new Date().valueOf() - parseInt(time1)
    localStorage.setItem('time',new Date().valueOf())
    if(store.state.trimStop){
        clearInterval(trim)
    }else{
        clearInterval(trim)
        trim = setTimeout(fn,1000)
    }

}
/**绘制网格总函数
 * 分别绘制
 * drawSmallGrid小网格
 * drawMediumGrid中网格
 * drawBigGrid大网格
 */
export function drawgrid() {
    const c_canvas = document.getElementById("grids");
    drawSmallGrid(c_canvas);
    drawMediumGrid(c_canvas);
    drawBigGrid(c_canvas);
    return;
}
/**绘制小网格
 * 第一个for语句循环出纵向小方格细线条，间距为X轴方向3像素
 * 第二个for语句循环出横向小方格细线条，间距为Y轴方向3像素
 */
function drawSmallGrid(c_canvas) {
    ctx = c_canvas.getContext("2d");
    ctx.strokeStyle = "#f1dedf";
    ctx.strokeWidth = 1;
    ctx.beginPath();
    for (let x = 0.5; x < 370; x += 3) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 370);
        ctx.stroke();
    }
    for (let y = 0.5; y < 370; y += 3) {
        ctx.moveTo(0, y);
        ctx.lineTo(370, y);
        ctx.stroke();
    }
    ctx.closePath();
    return;
}
/**绘制中型网格
 2  * 第一个for语句循环出纵向中方格中线条，间距为X轴方向15像素，小网格的5倍
 3  * 第二个for语句循环出横向中方格中线条，间距为Y轴方向15像素，小网格的5倍
 4  */
function drawMediumGrid(c_canvas){
    ctx = c_canvas.getContext("2d");
    ctx.strokeStyle="#fdbeb9";
    ctx.strokeWidth = 2
    //宽度是小网格的2倍
    ctx.beginPath();
    for(let x=0.5;x<370;x+=15){
        ctx.moveTo(x,0);
        ctx.lineTo(x,370);
        ctx.stroke();
    }
    for(let y=0.5;y<370;y+=15){
        ctx.moveTo(0,y);
        ctx.lineTo(370,y);
        ctx.stroke();
    }
    ctx.closePath();
    return;
}
/**绘制大型网格
 * 第一个for语句循环出纵向大方格中线条，间距为X轴方向75像素，小网格的5倍
 * 第二个for语句循环出横向大方格中线条，间距为Y轴方向75像素，小网格的5倍
 */
function drawBigGrid(c_canvas) {
    ctx = c_canvas.getContext("2d");
    ctx.strokeStyle = "#e0514b";
    ctx.strokeWidth = 3;
    ctx.beginPath();
    for (let x = 0.5; x < 370; x += 75) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 370);
        ctx.stroke();
    }
    for (let y = 0.5; y < 370; y += 60) {
        ctx.moveTo(0, y);
        ctx.lineTo(370, y);
        ctx.stroke();
    }
    // ctx.fillText("time/ms",offsetx+width/2,220);
    // ctx.fillText("0",offsetx,220);
    // ctx.fillText("10000",offsetx+width*49/50,220);
    height = document.getElementById('main').clientHeight
    document.getElementById('ruler').style.height = height/5
    document.getElementById('ruler').style.top = ((height/5)*2)-25
    // ctx.fillText("1.0mv",0,height/5*2-25);
    // ctx.fillText("0",0,height/5*3-40);
    // ctx.fillText("-1.0mv",0,(height/5)*4-55);

    ctx.closePath();
    return;
}
