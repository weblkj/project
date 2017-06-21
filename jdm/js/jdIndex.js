/*页面加载完成之后触发的事件*/
window.onload=function(){
	//alert(111);
	//调用通栏
	headerScoll();
	cutDownTime();
	banner6();
}
/*1.顶部通栏
	必须知道的几个值:
		1.导航栏距离顶点的高度
		2.顶部通栏距离顶点的高度		
*/
function headerScoll(){
	//1.获取导航栏
	var navDom = document.querySelector(".jd_nav");
	//2.导航栏距离顶点的高度
	/*var top = navDom.offsetTop;//距离顶部的高度
	var height = navDom.offsetHeight;//该节点自身的height值
	console.log(top);
	console.log(height);*/
	var maxDistance = navDom.offsetTop;
	//3.获取顶部通栏
	var headerDom = document.querySelector(".jd_header");
	//4.顶部通栏透明  通过js写的样式会放在行内 所以最好写在css文件中
	//headerDom.style.backgroundColor = 'rgba(201,21,35,0)';
	//5.注册onsrcoll事件
	window.onscroll= function(){
		//console.log(222);
		var scrollDistance = window.document.body.scrollTop;
		//console.log(scrollDistance);
		//如果滚动距离/maxDistance >1,超出了轮播图,则背景变为实心;
		var percent = scrollDistance/maxDistance;
		if(percent>1){
			percent=1;
		}
		//将通栏背景设置为percent(0-1)
		headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
	}
}

/*2.倒计时*/
function cutDownTime(){
	console.log(333);
	//剩余总时间(秒/s)
	//var totalSec = 3600;
	//获取存放显示时间的li(queryselector查找到的数组)
	var liArr = document.querySelectorAll(".main_content:nth-child(1) .content_top li");
	//console.log(liArr);
	var h = parseInt(liArr[0].innerText)*10+parseInt(liArr[1].innerText);
	console.log(h);//03
	var m = parseInt(liArr[3].innerText)*10+parseInt(liArr[4].innerText);
	console.log(m);//02
	var s = parseInt(liArr[6].innerText)*10+parseInt(liArr[7].innerText);
	console.log(s);//505
	var totalSec = h*3600+m*60+s;
	console.log(totalSec);
	//开始倒计时
	var timeId = setInterval(function(){
		//判断如果倒计时已经小于0 结束倒计时
		if(totalSec<=0){
			clearInterval(timeId);
			return;
		}
		//秒数减1
		totalSec--;
		//将当前总秒数换算成时:分:秒
		//小时计算:Math.floor(totalSec/3600)
		var hour = Math.floor(totalSec/3600);
		//分别取小时的十位和个位  Math.floor(hour/10)  hour%10;分钟秒数同
		//分钟计算:Math.floor(totalSec%3600/60)
		var minute = Math.floor(totalSec%3600/60);
		//秒数计算:totalSec%3600%60
		var second = totalSec%3600%60;
		//将换算的数字放到页面对应的 li中
		liArr[0].innerHTML = Math.floor(hour/10);
		liArr[1].innerHTML = hour%10;
		liArr[3].innerHTML = Math.floor(minute/10);
		liArr[4].innerHTML = minute%10;
		liArr[6].innerHTML = Math.floor(second/10);
		liArr[7].innerHTML = second%10;
	},1000)
}
/*3.轮播图 自动切换 没有过渡效果*/
function banner(){
	/*
	必须要记录的一些值：
	1.定义index记录的值
	2.轮播图每张图片的宽度
	  整个轮播图的ul
	  索引ul li[index-1]
	 */
	//1.记录屏幕宽度(即每张图片宽度)
	var width = document.body.offsetWidth;
	//2.获取所有轮播图的ul节点
	var moveUl = document.querySelector(".banner_images");
	//3.定义一个index记录当前的索引值
	var index = 1;
	//4.记录表示索引的li标签
	var indexLiArr = document.querySelectorAll(".banner_index li");
	//5.自动轮播 1秒切换一张图
	setInterval(function(){
		//下一张
		index++;
		if(index>=9){
			index = 1;
		}
		/*
		 修改ul的位置 css3的属性:translate(改变图片位置及旋转)【不会影响其他元素】
		 						 translateX:在X轴上移动
		*/
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},3000)
}
/*4.轮播图 能看到切换过程 但是第一次显示的是第八张图 最后一张跳转到1之后 再无过渡效果*/
function banner2(){
	/*
	必须要记录的一些值：
	1.定义index记录的值
	2.轮播图每张图片的宽度
	  整个轮播图的ul
	  索引ul li[index-1]
	 */
	//1.记录屏幕宽度(即每张图片宽度)
	var width = document.body.offsetWidth;
	//2.获取所有轮播图的ul节点
	var moveUl = document.querySelector(".banner_images");
	moveUl.style.transition = "all 1s";
	//3.定义一个index记录当前的索引值
	var index = 1;
	//4.记录表示索引的li标签
	var indexLiArr = document.querySelectorAll(".banner_index li");
	//5.自动轮播 1秒切换一张图
	setInterval(function(){
		//下一张
		index++;
		if(index>=9){
			index = 1;
			//瞬间回到第一张
			moveUl.style.transition = "";
		}
		/*
		 修改ul的位置 css3的属性:translate(改变图片位置及旋转)【不会影响其他元素】
		 						 translateX:在X轴上移动
		*/
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},3000)
}
/*5.轮播图 */
/*   transition:过渡
     translate:旋转(rotate)/缩放(scale)/倾斜(skew)/移动(translate)
*/
function banner3(){
	/*
	必须要记录的一些值：
	1.定义index记录的值
	2.轮播图每张图片的宽度
	  整个轮播图的ul
	  索引ul li[index-1]
	 */
	//1.记录屏幕宽度(即每张图片宽度)
	var width = document.body.offsetWidth;
	//2.获取所有轮播图的ul节点
	var moveUl = document.querySelector(".banner_images");
	moveUl.style.transition = "all 1s";
	//3.定义一个index记录当前的索引值
	var index = 1;
	//4.记录表示索引的li标签
	var indexLiArr = document.querySelectorAll(".banner_index li");
	//5.自动轮播 1秒切换一张图
	setInterval(function(){
		//下一张
		index++;
		/*if(index>=9){
			index = 1;
			//瞬间回到第一张
		}*/
		/*
		 修改ul的位置 css3的属性:translate(改变图片位置及旋转)【不会影响其他元素】
		 						 translateX:在X轴上移动
		*/
		moveUl.style.transition = "all .5s";
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},1000)
	/*每次过渡结束(轮播一张图结束)
	  判断是否到了最后一张
	  如果是 则立刻调到第一张
	*/
	moveUl.addEventListener("webkitTransitionEnd",function(){
		if(index>=9){
			index = 1;
			//关闭过渡
			moveUl.style.transition="";
			//修改ul的位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}
		//根据当前图片的下标修改对应的索引的背景颜色(白色)
		//清空所有实心
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		};
		//当前位置的li变成实心
		indexLiArr[index-1].className='current';
	})
}

function banner4(){

	//1.记录屏幕宽度(即每张图片宽度)
	var width = document.body.offsetWidth;
	//2.获取所有轮播图的ul节点
	var moveUl = document.querySelector(".banner_images");
	moveUl.style.transition = "all 1s";
	//3.定义一个index记录当前的索引值
	var index = 1;
	//4.记录表示索引的li标签
	var indexLiArr = document.querySelectorAll(".banner_index li");
	//5.自动轮播 1秒切换一张图  索引自动切换
	/*setInterval(function(){
		//下一张
		index++;

		moveUl.style.transition = "all .5s";
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},1000)*/
	/*moveUl.addEventListener("webkitTransitionEnd",function(){
		if(index>=9){
			index = 1;
			//关闭过渡
			moveUl.style.transition="";
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		};
		indexLiArr[index-1].className='current';
	})*/
	var startX = 0,moveX = 0,distanceX = 0;
	moveUl.addEventListener("touchstart",function(event){
			startX = event.touches[0].clientX;
			//console.log(startX);
	});
	moveUl.addEventListener("touchmove",function(event){
			moveX = event.touches[0].clientX;
			//console.log(moveX);
	});
	moveUl.addEventListener("touchend",function(event){
			distanceX = startX-moveX;
			console.log(distanceX);
	});
	if(distanceX>=width/3){
		index++;
		//moveUl.style.transition="all .5s";
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	}
}


function banner5(){
	var width = document.body.offsetWidth;
	var index =1;
	var moveUl = document.querySelector('.banner_images');
	var startX = 0,moveX = 0;
	moveUl.addEventListener("touchstart",function(event){
			startX = event.touches[0].clientX;
			//console.log(startX);
	});
	moveUl.addEventListener("touchmove",function(event){
			moveX = event.touches[0].clientX-startX;
			//console.log(moveX);
			var transX = index*width*-1+moveX;
			moveUl.style.transform = 'translate('+transX+'px)';
	});
	moveUl.addEventListener("touchend",function(event){
		var minMoveX = width/3;
		if(Math.abs(moveX)>=minMoveX){
			index++;
			//moveUl.style.transition="all .5s";
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}
			
	});
}


function banner6(){
	var width = document.body.offsetWidth;
	var moveUl = document.querySelector(".banner_images");
	moveUl.style.transition = "all .5s";
	var index = 1;
	var indexLiArr = document.querySelectorAll(".banner_index li");
	//5.自动轮播 1秒切换一张图
	var timeId = setInterval(function(){
		//下一张
		index++;
		
		moveUl.style.transition = "all .5s";
		moveUl.style.transform = 'translateX('+index*width*-1+'px)';
	},1000)
	
	moveUl.addEventListener("webkitTransitionEnd",function(){
		if(index>=9){
			index = 1;
			//关闭过渡
			moveUl.style.transition="";
			//修改ul的位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}else if(index<1){//即将变为空白 立刻回到倒数第二张
			index = 8;
			//关闭过渡
			moveUl.style.transition="";
			//立刻修改ul的位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}		
		for (var i = 0; i < indexLiArr.length; i++) {
			indexLiArr[i].className = '';
		};
		indexLiArr[index-1].className='current';
	})
	//手指滑动效果
	//1.按下时的X轴坐标
	var startX = 0;
	//水平方向移动的距离
	var moveX = 0;
	moveUl.addEventListener("touchstart",function(event){
		//关闭自动轮播效果 和过渡效果
		clearInterval(timeId);
		moveUl.style.transition="";
		//获取按下时的X轴坐标
		startX = event.touches[0].clientX;
	});
	//滑动
	moveUl.addEventListener("touchmove",function(event){
		//计算移动的值
		moveX = event.touches[0].clientX-startX;
		console.log(moveX);
		var transX = index*width*-1+moveX;
		//实时更新图片位置
		moveUl.style.transform = 'translateX('+transX+'px)';
	});
	moveUl.addEventListener("touchend",function(event){
		//想切图 要移动的最小距离是整个屏幕的3/1
		var minMoveX = width/3;
		if(Math.abs(moveX)>=minMoveX){
			//根据moveUl的正负 确定移动方向 index++ / index--
			//切图
			if(moveX>0){
				index--;
			}else{
				index++;				
			}
			//添加过渡
			moveUl.style.transition = "all .5s";
			//更新图片位置
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}else{
			//回退到当前图
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		}		
		//开启定时器
		timeId = setInterval(function(){
			//下一张
			index++;
			
			moveUl.style.transition = "all .5s";
			moveUl.style.transform = 'translateX('+index*width*-1+'px)';
		},1000)
	});
}