<template>
  <div class="box" ref="view">
    <div class="btn" v-if="playfalg">
      <img class="play" @click="play" src="../assets/imgs/btnplay-sheet0.png" alt="">
    </div>
    <div class="bage" v-if="suspend">
      <span>{{ countDown }}</span>
    </div>
    <div class="time">
      <img class="pause" @click="play" v-if="!playfalg" src="../assets/imgs/btnpause-sheet0.png" alt="">
      <img class="pause" @click="play" v-else src="../assets/imgs/btnplay-sheet0.png" alt="">
      <span>{{m}}:{{s}}</span>
    </div>
    <div class="header">
      <van-nav-bar
          :title="title"
          left-text=""
          left-arrow
          @click-left="onClickLeft" class="Tutorial">
        <!--      <div name="search" slot="left">-->
        <!--        <van-icon name="arrow"/>-->
        <!--      </div>-->
      </van-nav-bar>
    </div>
    <div class="back" :style="{left:back+'px'}"></div>
    <div class="back1" :style="{left:back1+'px'}"></div>
    <div class="fraction"><img src="../assets/imgs/guiscore-sheet0.png" alt="">{{fraction}}分</div>
    <div class="feiji" ref="feiji" :style="{bottom: feijiy+'px',left: +feijix+'px',transition: 'bottom 0.2s'}">
      <img src="../assets/imgs/shark-sheet0.png" style="position: absolute;z-index: 2" alt="">
    </div>
    <img class="gif" v-if="!yanhua" :style="{bottom: yanhuay+'px',left: +yanhuax+'px',}" src="../assets/imgs/a.gif" alt="">
    <div class="yuan" ref="yuan" :style="{'left': '0px'}">
      <div class="li" v-for="(item,index) in list" :key="index" :style="{'bottom': item.y+'px','left': item.x+'px',
      'display':!item.falg ?'none':'block',}">
        <img v-if="index==0" src="../assets/imgs/smallfish-sheet2.png" alt="">
        <img v-if="index==1" src="../assets/imgs/smallfish-sheet3.png" alt="">
        <img v-if="index==2" src="../assets/imgs/smallfish-sheet2.png" alt="">
        <img v-if="index==3" src="../assets/imgs/smallfish-sheet3.png" alt="">
        <img v-if="index==4" src="../assets/imgs/smallfish-sheet2.png" alt="">
        <img v-if="index==5" src="../assets/imgs/smallfish-sheet3.png" alt="">
        <img v-if="index==6" src="../assets/imgs/smallfish-sheet0.png" alt="">
        <img v-if="index==7" src="../assets/imgs/smallfish-sheet1.png" alt="">
        <img v-if="index==8" src="../assets/imgs/smallfish-sheet0.png" alt="">
        <img v-if="index==9" src="../assets/imgs/smallfish-sheet1.png" alt="">
        <img v-if="index==10" src="../assets/imgs/smallfish-sheet0.png" alt="">
        <img v-if="index==11" src="../assets/imgs/bigfish-sheet0.png" alt="">
        <img v-if="index==12" src="../assets/imgs/bigfish-sheet1.png" alt="">
        <img v-if="index==13" src="../assets/imgs/bigfish-sheet0.png" alt="">
        <img v-if="index==14" src="../assets/imgs/bigfish-sheet0.png" alt="">
        <img v-if="index==15" src="../assets/imgs/bigfish-sheet1.png" alt="">
        <img v-if="index==16" src="../assets/imgs/bigfish-sheet0.png" alt="">
        <img v-if="index==17" src="../assets/imgs/bigfish-sheet0.png" alt="">
        <img v-if="index==18" src="../assets/imgs/bigfish-sheet1.png" alt="">
        <img v-if="index>=19 && index<25" src="../assets/imgs/bigfish-sheet3.png" alt="">
        <img v-if="index>=25" src="../assets/imgs/bigfish-sheet2.png" alt="">
      </div>
    </div>
    <div id="main"></div>
    <div class="audio" @click="audio">
      <img v-if="btnsound" src="../assets/imgs/btnsound-sheet0.png" alt="">
      <img v-else src="../assets/imgs/btnsound-sheet2.png" alt="">
    </div>
    <audio v-show="btnsound" ref="audio" loop src="../assets/mp3/bg1.mp3"></audio>
    <audio v-show="btnsound" ref="ping" src="../assets/mp3/ping.mp3"></audio>
  </div>
</template>

<script>
import {Drawing,updateyAxisData} from "@/assets/js/canvas";
import { Dialog} from 'vant'
let isAndroid='',isiOS=''

export default {
  name: "circulartext",
  data(){
    return{
      feijix:0,//飞机的x轴
      feijiy:0,//飞机的y轴
      width:0,//屏幕的宽
      height:0,//屏幕的高
      bei:5,//倍数
      /*arr:[5, 20, 35, 0, 5, 20, 35, 0, 5, 20, 35, 0, 5, 20, 35, 0, 5, 20, 35, 0, 5, 25, 25, 25, 0, 5, 25, 25, 25, 0, 5, 25, 25, 25, 0, 5, 25, 25, 25,
        0, 5, 25, 25, 25, 0, 5, 20, 35, 0, 10, 25, 40, 0, 10, 25, 40, 0, 10, 25, 40, 0, 10, 25, 40, 0, 10, 30, 30, 30,0, 10, 30, 30, 30, 0, 10, 30,
        30, 30, 0, 10, 30, 30, 30, 0, 10, 30, 30, 30, 0, 10, 20, 20, 20, 20, 20, 0, 10, 20, 20, 20,20,20,0,10,20,20,20,20,20,0,10,20,20,20,20,20,0,10,
        20,20,20,20,20,0,10,35,25,25,25,35,0],*/
      data:[],
      list:[],
      Duration: 6,
      falg:true,
      num:0,
      yuanWidth:0,
      mousefalg:true,
      fraction:0,//分数
      btntext:'已打开',
      btnfalg:true,
      back:0,
      back1:0,
      spacing:0,
      endstar:true,
      countDown:5,
      m:'00',
      s:'00',
      time:625,
      suspend:false,
      playfalg: false,
      timer:'',
      y1:0,
      y2:0,
      y3:0,
      y4:0,
      y5:0,
      arr: [10,50,105,170,225,270,340,405,480,545],
      modelData1:[10,50,105,170,225,270,340,405,480,545],
      modelData2:[10,50,95,135,180,220,265],
      modelData3:[10,80,160,230],
      model:0,
      n: 0,
      index: 0,
      arr1:[],
      arr2:[],
      arr3:[],
      ln:0,
      maxfraction:0,
      number:0,
      array1:[],
      array2:[],
      i:0,
      btnsound:true,
      pingfalg:true,
      yanhua:true,
      yanhuay:0,
      yanhuax:0,
      max:50,
      min:0,
      leadOffFalg:true,
      leadOffFalg1: true,
      title:''
    }
  },
  created() {
    let u = navigator.userAgent
    isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS){
      window.webkit.messageHandlers.start.postMessage({ "params": "1111" });
    }
  },
  mounted() {
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight - 30
    this.spacing = (this.height-((this.height/7)*2))/5
    this.feijix = this.$refs.yuan.clientWidth/4
    this.feijiy = this.height/7
    this.yuanWidth = this.$refs.yuan.clientWidth
    this.back1 = this.$refs.yuan.clientWidth-2
    this.y1 = this.height/7
    this.y2 = this.spacing + (this.height/7) +4
    this.y3 = (this.spacing*2)+ (this.height/7)+8
    this.y4 = (this.spacing*3)+ (this.height/7)+8
    this.y5 = (this.spacing*4)+ (this.height/7)+16

    this.$refs.audio.play()
    window.fly = this.fly//运行数据
    window.end = this.end//结束运行
    window.leadOff = this.leadOff//导联脱落
    window.electrodeLeadOff = this.electrodeLeadOff//电极片脱落
    window.parameter = this.parameter//app传入参数
    document.oncontextmenu=function(){return false;};
    document.onselectstart=function(){return false;};

    /*this.parameter('{"min":10,"model":1,"max":50,"historyMaxFraction":400}')
    let that = this,i=0,data={},y=0,feijiy=0,num=0
    setInterval(function (){
      if(that.endstar && !that.playfalg && !that.suspend){
        data = that.$store.state.waveDataArray[i]
        if(data){
          that.data.push(data)
          feijiy =localStorage.getItem('feijiy')
          if(feijiy && feijiy< that.y1+(that.spacing/2)){
            num = 0
          }else if(feijiy && feijiy< that.y2+(that.spacing/2) && feijiy> that.y2-(that.spacing/2)){
            num = 1
          }else if(feijiy && feijiy< that.y3+(that.spacing/2) && feijiy> that.y3-(that.spacing/2)){
            num = 2
          }else if(feijiy && feijiy< that.y4+(that.spacing/2) && feijiy> that.y4-(that.spacing/2)){
            num = 3
          }else if(feijiy && feijiy< that.y5+(that.spacing/2) && feijiy> that.y5-(that.spacing/2)){
            num = 4
          }
          let cha = that.max/5
          if((data/cha)<=0){
            that.feijiy = that.height/7
            y=data
          }else if((data/cha)>=5){
            that.feijiy = (5 * that.spacing)+(that.height/7)
            y=data
          }else if( parseInt(data/cha) != num){
            that.feijiy = (((data/10)-1) * that.spacing)+(that.height/7)+8
            y=data
          }
          console.log(1)
          updateyAxisData(y)
        }else{
          i=0
        }
        i++
      }
    },100)*/

  },
  methods:{
    audio(){//音乐开关
      if(this.btnsound){
        this.$nextTick(res=>{
          this.$refs.audio.pause()
          this.$refs.ping.pause()
        })
        this.btnsound = false
      }else{
        this.btnsound = true
        this.$nextTick(res=>{
          this.$refs.audio.play()
        })
      }
    },
    timeReset(){
      if(parseInt(this.time/60)<10){//倒计时
        this.m = '0'+parseInt(this.time/60)
      }else{
        this.m = parseInt(this.time/60)
      }
      if(this.time - (this.m*60)){
        this.s = '0'+this.time - (this.m*60)
      }else{
        this.s = this.time - (this.m*60)
      }
    },
    parameter(res){//进入游戏时app传入的参数{historyMaxFraction: '历史最高分',model: '游戏模式',max: '最大值',min: '最小值'}
      console.log('传入参数',res)
      let data = JSON.parse(res)
      this.maxfraction = data.historyMaxFraction
      this.model = data.model
      this.max = data.max
      this.min = data.min
      this.$store.state.max = data.max
      this.$store.state.min = data.min
      if(data.model == 1){
        this.arr = this.modelData1
        this.time = 625
        this.title = '标准多媒体'
      }else if(data.model == 2){
        this.arr = this.modelData2
        this.time = 300
        this.title = '力量训练'
      }else if(data.model == 2){
        this.arr = this.modelData3
        this.time = 300
        this.title = '耐力训练'
      }
      this.timeReset()
      this.motion()//鱼的运动和计时
    },
    end(data){//结束
      if(data){
        this.endstar=false
      }
    },
    fly(data){//设备力值传入
      let feijiy = 0,y=0,num=0
      if(this.endstar && !this.playfalg && !this.suspend){
        this.data.push(data)
        feijiy =localStorage.getItem('feijiy')
        if(feijiy && feijiy< this.y1+(this.spacing/2)){
          num = 0
        }else if(feijiy && feijiy< this.y2+(this.spacing/2) && feijiy> this.y2-(this.spacing/2)){
          num = 1
        }else if(feijiy && feijiy< this.y3+(this.spacing/2) && feijiy> this.y3-(this.spacing/2)){
          num = 2
        }else if(feijiy && feijiy< this.y4+(this.spacing/2) && feijiy> this.y4-(this.spacing/2)){
          num = 3
        }else if(feijiy && feijiy< this.y5+(this.spacing/2) && feijiy> this.y5-(this.spacing/2)){
          num = 4
        }
        let cha = this.max/5
        if((data/cha)<=0){
          this.feijiy = this.height/7
          y=data
        }else if((data/cha)>=5){
          this.feijiy = (5 * this.spacing)+(this.height/7)
          y=data
        }else if( parseInt(data/cha) != num){
          this.feijiy = (((data/10)-1) * this.spacing)+(this.height/7)+8
          y=data
        }
        updateyAxisData(y)
        localStorage.setItem('feijiy',this.feijiy)
      }
    },
    leadOff(data1,data2){//导联脱落false正常 ,true脱落
      console.log('导联脱落',data2,this.leadOffFalg)
      if(data2 && this.leadOffFalg){
        this.pingfalg = false
        this.$refs.audio.pause()
        this.btnsound = false
        this.playfalg=true
        this.endstar=false
        this.leadOffFalg1 = true
        Dialog.alert({ message: '导联脱落' }).then(() => {
          this.leadOffFalg = false
        });
      }else if(!data2 && this.leadOffFalg1 && !this.leadOffFalg){
        this.pingfalg = true
        this.btnsound = true
        this.$nextTick(res=>{
          this.$refs.audio.play()
        })
        this.playfalg=false
        this.endstar=true
        this.leadOffFalg = true
        this.leadOffFalg1 = false
        this.motion()//鱼的运动和计时
      }
    },
    motion(){
      let timer = '',timer1 = '',that = this
      timer = setTimeout(fn,1000)
      function fn(){
        if(that.endstar && !that.playfalg){//游戏未结束时
          clearTimeout(timer)
          if(that.m=='00' && that.s=='00'){
            that.playfalg=true
            that.endstar=false
            window.webkit.messageHandlers.end.postMessage({ "fraction": that.fraction });
            Dialog.alert({ title: '本次得分：'+that.fraction,message: '历史最高分：'+that.maxfraction,confirmButtonText: '返回'}).then(() => {
              // on close
            });
          }
          if(that.suspend){//暂停时5s倒计时
            clearTimeout(timer1)
            if(that.countDown==0){
              that.suspend = false
              that.btnsound = true
              that.$refs.audio.play()
            }
            that.countDown--;
          }else{//未暂停，游戏倒计时
            that.i++;
            if(that.s>0 && that.s<=10 && that.s>0){
              that.s = '0'+(that.s-1)
            }else if(that.s>0 && that.s>10){
              that.s--;
            }else if(that.s==0 && that.m<=10 && that.m>0){
              that.m = '0'+(that.m-1)
              that.s = 59
            }else if(that.s==0 && that.m>10){
              that.m--;
              that.s = 59
            }
            that.pingfalg=true
            timer1 = setTimeout(fn1,25)
            let a=0
            function fn1(){
              if(!that.yanhua){
                a++;
                if(a>15){
                  a=0
                  that.yanhua = true
                }
              }
              if(that.endstar && !that.playfalg && !that.suspend){
                clearTimeout(timer1)
                if(that.list.length>0){
                  for(let i = 0;i<that.list.length;i++){
                    that.list[i].x -=4
                    let feijiyfalg = 0
                    let feijixfalg = 0
                    feijiyfalg = that.feijiy - that.list[i].y >= -that.spacing/2 && that.feijiy - that.list[i].y< that.spacing/2
                    feijixfalg = that.list[i].x-that.feijix-50>-30 && that.list[i].x-that.feijix-50 < 30
                    if(feijixfalg && feijiyfalg){
                      if(that.pingfalg && that.btnsound){
                        that.pingfalg=false
                        that.$refs.ping.play()
                      }
                      if(that.list[i].falg){
                        that.yanhua=false
                        that.yanhuay = that.list[i].y-40
                        that.yanhuax = that.list[i].x-80
                      }
                      that.list[i].falg = false
                      let Rank = 1
                      if(that.feijiy < that.y1+(that.spacing/2)){
                        Rank = 1
                      }else if(that.feijiy > that.y2-(that.spacing/2) && that.feijiy < that.y3+(that.spacing/2)){
                        Rank = 2
                      }else{
                        Rank = 3
                      }
                      that.array1.push(i + ':' +Rank)
                      that.array2 = Array.from(new Set(that.array1))
                      for(let j=0;j<that.array2.length;j++){
                        that.array2[j]=parseInt(that.array2[j].split(':')[1])
                      }
                      let total = that.array2.reduce(function(a, b) {
                        return a + b;
                      })
                      if(that.number){
                        that.fraction = that.number + total
                      }else{
                        that.fraction = total
                      }
                    }
                  }
                }
                that.back-=2;
                that.back1-=2;
                if(Math.abs(that.back)-that.yuanWidth>=0){
                  that.back=that.yuanWidth-4
                }
                if(Math.abs(that.back1)-that.yuanWidth==0){
                  that.back1= that.yuanWidth-4
                }
                setTimeout(fn1,25)
              }else{
                clearTimeout(timer1)
              }
            }
            if(that.arr.indexOf(that.i)!=-1){
              that.list=[]
              that.n=0
              that.ln=0
              that.index++;
              that.number = that.fraction
              that.array1 = []
              that.array2 = []
              that.$store.state.cavansFalg = 1
            }
            if(that.model == 1){
              that.model1(that.i)
            }else if(that.model == 2){
              that.model2(that.i)
            }else if(that.model == 3){
              that.model3(that.i)
            }
          }
          timer = setTimeout(fn,1000)
        }else{
          clearTimeout(timer1)
          clearTimeout(timer)
        }
      }
    },
    model1(i){//标准多媒体
      if(this.index==1){
        this.arr1 = [0,2,7,9,14,16,21,23,28,30]
        this.arr2 = [1,8,15,22,29]
      }else if(this.index==2){
        this.arr1 = [0,4,10,14,20,24,30,34,40,44]
        this.arr2 = [1,2,3,11,12,13,21,22,23,31,32,33,41,42,43]
      }else if(this.index==3){
        this.arr1 = [0,5,12,17,24,29,36,41,48,53]
        this.arr2 = [2,3,4,14,15,16,26,27,28,38,39,40,50,51,52]
        this.arr3 = [1,13,25,37,49]
      }else if(this.index==4){
        this.arr1 = [0,2,4,10,12,14,20,22,24,30,32,34,40,42,44]
        this.arr2 = [1,3,11,13,21,23,31,33,41,43]
      }else if(this.index==5){
        this.arr1 = [0,2,8,10,16,18,24,26,32,34]
        this.arr2 = [1,9,17,25,33]
      }else if(this.index==6){
        this.arr1 = [0,6,13,19,26,32,39,45,52,58]
        this.arr2 = [1,2,3,4,5,14,15,16,17,18,27,28,29,30,31,40,41,42,43,44,53,54,55,56,57]
      }else if(this.index==7){
        this.arr1 = [0,5,12,17,24,29,36,41,48,53]
        this.arr2 = [1,2,3,4,13,14,15,16,25,26,27,28,37,38,39,40,49,50,51,52]
      }else if(this.index==8){
        this.arr1 = [0,6,14,20,28,34,42,48,56,62]
        this.arr2 = [2,3,4,16,17,18,30,31,32,44,45,46,58,59,60]
        this.arr3 = [1,5,15,19,29,33,43,47,57,61]
      }else if(this.index==9){
        this.arr1 = [0,5,12,17,24,29,36,41,48,53]
        this.arr2 = [2,3,14,15,26,27,38,39,50,51]
        this.arr3 = [1,4,13,16,25,28,37,40,49,52]
      }else if(this.index==10){
        this.arr1 = [0,7,15,22,30,37,45,52,60,67]
        this.arr2 = [1,2,3,4,5,6,16,17,18,19,20,21,31,32,33,34,35,36,46,47,48,49,50,51,61,62,63,64,65,66]
      }
      if(i>=10 && i<50){
        this.liShow(this.y1,this.y4)
      }
      if(i>=50 && i<105){
        this.liShow(this.y1,this.y3)
      }
      if(i>=105 && i<170){
        this.liShow(this.y1,this.y3,this.y4)
      }
      if(i>=170 && i<225){
        this.liShow(this.y1,this.y4)
      }
      if(i>=225 && i<270){
        this.liShow(this.y1,this.y5)
      }
      if(i>=270 && i<340){
        this.liShow(this.y1,this.y2)
      }
      if(i>=340 && i<405){
        this.liShow(this.y1,this.y3)
      }
      if(i>=405 && i<480){
        this.liShow(this.y1,this.y3,this.y4)
      }
      if(i>=480 && i<545){
        this.liShow(this.y1,this.y2,this.y4)
      }
      if(i>=545){
        this.liShow(this.y1,this.y2)
      }
    },
    model2(){//力量训练
      if(this.index==1 || this.index==3 || this.index==5){
        this.arr1 = [0,2,7,9,14,16,21,23,28,30]
        this.arr2 = [1,8,15,22,29]
        this.liShow(this.y1,this.y4)
      }else if(this.index==2 || this.index==4 || this.index==6){
        this.arr1 = [0,2,8,10,16,18,24,26,32,34]
        this.arr2 = [1,7,17,25,33]
        this.liShow(this.y1,this.y5)
      }
    },
    model3(){//耐力训练
      if(this.index==1 || this.index==3){
        this.arr1 = [0,6,13,19,26,32,39,45,52,58]
        this.arr2 = [1,2,3,4,5,14,15,16,17,18,27,28,29,30,31,40,41,42,43,44,53,54,55,56,57]
      }else if(this.index==2 || this.index==4){
        this.arr1 = [0,7,15,22,30,37,45,52,60,67]
        this.arr2 = [1,2,3,4,5,6,16,17,18,19,20,21,31,32,33,34,35,36,46,47,48,49,50,51,61,62,63,64,65,66]
      }
      this.liShow(this.y1,this.y2)
    },
    liShow(min,max,max1){
      let obj={}, x=this.yuanWidth
      if(this.arr1.indexOf(this.n)!=-1){
        obj={x:x, y:min, falg:true}
      }else if(this.arr2.indexOf(this.n)!=-1){
        obj={x:x, y:max, falg:true}
      }else if(this.arr3.indexOf(this.n)!=-1){
        obj={x:x, y:max1, falg:true}
      }
      this.list.push(obj)
      this.n++;
    },
    play(){
      this.endstar=false
      this.countDown = 5
      this.number = this.fraction
      this.array1 = []
      this.array2 = []
      if(this.playfalg){
        this.playfalg = false
        this.endstar = true
        this.$nextTick(res=>{
          this.$refs.audio.play()
        })
        this.btnsound = true
        this.motion()
      }else{
        this.pingfalg = false
        this.$refs.audio.pause()
        this.btnsound = false
        this.playfalg=true
        this.endstar=false
      }
      if(this.m=='00' && this.s=='00'){
        this.timeReset()
        this.endstar = true
      }
    },
    onClickLeft(){
      let that = this
      that.endstar=false
      that.countDown = 5
      that.number = that.fraction
      that.array1 = []
      that.array2 = []
      that.pingfalg = false
      that.$refs.audio.pause()
      that.btnsound = false
      if(that.m=='00' && that.s=='00'){
        window.webkit.messageHandlers.end.postMessage({ "fraction": that.fraction });
        window.close();
      }else{
        Dialog.confirm({
          title: '',
          message: '返回将结束游戏，是否确定返回？',
        })
        .then(() => {
          // on confirm
          if (isiOS){
            window.webkit.messageHandlers.end.postMessage({ "fraction": 0 });
          }
          window.close();
        })
        .catch(() => {
          // on cancel
          that.endstar=true
          that.suspend = true
          that.playfalg = false
          that.motion()
        });
      }
    },
  }
}
</script>

<style>
.van-nav-bar__content,.van-nav-bar__title{
  height: 30px!important;
  line-height: 30px!important;
}
.Tutorial .van-nav-bar__content,.van-nav-bar{
  background: transparent!important;
}
.van-hairline--bottom::after{
  border: none!important;
}
</style>
<style scoped>
.header{
  width: 50%;
  background: transparent;
}
.gif{
  position: absolute;
  width: 120px!important;
}
.audio{
  position: absolute;
  top: 30px;
  right: 110px;
  width: 30px;
  z-index: 1;
}
.audio img{
  width: 100%;
}
.btn{
  width: 100%;
  height: calc(100% - 30px);
  background: rgba(0,0,0,0.2);
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 2;
}
.pause{
  width: 30px;
  position: relative;
  top: 5px;
  margin-right: 10px;
}
.play{
  width: 50px;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  z-index: 1;
}
.bage{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.bage span{
  width: 50px;
  height: 50px;
  font-size: 30px;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
}
.time{
  position: absolute;
  top: 25px;
  right: 10px;
  z-index: 1;
  font-size: 20px;
}
#main{
  width: calc(100% - 250px);
  height: 80px;
  position: absolute;
  top: 40px;
  left: 80px;
}
.box {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
}
.back,.back1{
  height: 100%;
  width: 100%;
  background: url(../assets/imgs/background-sheet0.png) ;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  z-index: 0;
}
.fraction{
  font-size: 16px;
  display: flex;
  position: relative;
  top: 5px;
  left: 10px;
  font-weight: 600;
}
.fraction img{
  width: 20px;
  height: 20px;
}
.feiji {
  width: 50px;
  height: 30px;
  /* background: #E64566; */
  background-size: 300px;
  position: absolute;
}
.feiji img{
  width: 100%;
}
.yuan {
  width: 100%;
  height: 100%;
  white-space: nowrap;
  animation-name: marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  position: absolute;
  left: 0;
  top: 0;
}
.yuan .li {
  display: inline-block;
  width: 35px;
  /* background: rosybrown; */
  background-size: 50px;
  background-repeat: no-repeat;
  border-radius: 50%;
  position: absolute;
}
.yuan .li img{
  width: 100%;
}

</style>
