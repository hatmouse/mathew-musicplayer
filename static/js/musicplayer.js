// require.config({
//     paths: {
//         "jquery": "jquery-2.1.3.min",
//         "velocity": "velocity.min"
//     },
//     shim: {
//         "velocity": {
//             deps: [ "jquery" ]
//         }
//     }
// });
// require([ "jquery", "velocity"], function ($, Velocity) {
// });
window.onload=function(){
	audio=$('#audio')
	audio0=audio[0];
	var musicIndex=5;
	var bufferTimer = null;
	var volumeTimer = null;
    var progress_width=$('.progress_wrap').width();
    var progress_x=$('.progress_wrap').offset().left;
	//-------------------------控制按钮绑定事件
	$('.play_bt').click(function() {
		toPlay('play');
	});
	$('.pause_bt').click(function() {
		toPlay('pause');
	});
	$('.prev_bt').click(function() {
		toPlay('prev');
	});
	$('.next_bt').click(function() {
		toPlay('next');
	});

	//--------------------------点击进度条设置进度
	$('.progress_wrap').click(function(ev) {
		console.log(ev.clientX+'-'+ev.clientY);
		adjustProgress(this, ev);
	});
	//---------------------------当前对应坐标线
	$('.progress_wrap').mouseover(function(){
		$('.cur_cursor').css('display','inline');
		$('.timetip').css('display','inline');
	});
	$('.progress_wrap').mouseout(function(){
		$('.cur_cursor').css('display','none');
		$('.timetip').css('display','none');
	});
	$('.progress_wrap').mousemove(function(ev){
        var leftx=ev.clientX-progress_x;
        var surplus = audio0.duration*leftx/progress_width;
        var surplusMin = parseInt(surplus/60);
		var surplusSecond = parseInt(surplus%60);
		if (surplusSecond < 10 ) {
		    surplusSecond = '0'+surplusSecond;
		};
		$('.timetip span').text(surplusMin + ":" +surplusSecond);
		progress_x=$('.progress_wrap').offset().left;
		$('.cur_cursor').css('left',leftx+'px');
		$('.timetip').css('left',leftx-8+'px');
		console.log(ev.clientX+'+'+ev.clientY);
	});
	initPlayer(musicIndex - 1);
	audio0.volume = 0.8;
	audio.bind('canplay', bufferBar);

	function initPlayer(index) {
			//音乐路径
			audio.attr('src', playList[index].musicURL);
			//歌手
			$('.author').text(playList[index].artist);
			//歌名
			$('.title').text(playList[index].musicName);
			//缓冲进度条
			audio.unbind('canplay', bufferBar);
			clearInterval(bufferTimer);
			$('.buffer_progress').css('width', '0px');
		}
		//=================================================播放
	function toPlay(action) {
			if (action == 'play') {
				audio0.play();
				// $('.music_logo').velocity({rotateZ:360},{loop:true, duration: 10000,delay:0});
				$('.pause_bt').css('display','inline');
				$('.play_bt').css('display','none');
			} else if (action == 'pause') {
				audio0.pause();
				$('.play_bt').css('display','inline');
				$('.pause_bt').css('display','none');
			} else if (action == 'prev') {
				playMusicMode('prev');
			} else if (action == 'next') {
				playMusicMode('next');
			}
		}
		//==============================================播放结束后播放下一曲
	audio.bind('ended', function() {
		playMusicMode('next');
	});

	function playMusicMode(action) {
		var musicNum = playList.length;
		var index = musicIndex;
		if (action == 'prev') {
			if (index == 1) { //如果是第一首歌，跳到最后一首
				index = musicNum;
			} else {
				index -= 1;
			}
		} else if (action == 'next') {
			if (index == musicNum) { //如果是最后一首歌，跳到第一首
				index = 1;
			} else {
				index += 1;
			}
		}
		musicIndex = index;
		playIndex(index - 1);
	}
	//================================================更新歌曲播放索引，重新加载歌曲，并播放
	function playIndex(index){
		initPlayer(index);
		audio0.load();
		audio.bind('canplay',bufferBar);
		toPlay('play');
	}

	//=============================================显示剩余时间 和 播放进度条
	audio.bind('timeupdate',function(){
		if (!isNaN(audio0.duration)) {
			//当前时间
			// var surplus = audio.duration-audio.currentTime;
			var surplus = audio0.currentTime;
			var surplusMin = parseInt(surplus/60);
			var surplusSecond = parseInt(surplus%60);
			if (surplusSecond < 10 ) {
				surplusSecond = '0'+surplusSecond;
			};
			//$('.timetip span').text("-" + surplusMin + ":" +surplusSecond);

			//播放进度条
			var progressValue = audio0.currentTime/audio0.duration*progress_width;
			$('.move_bg').css('left',parseInt(progressValue)-70+ 'px');
		};
	});
	//===============================================显示缓冲进度条
	function bufferBar(){
		bufferTimer = setInterval(function(){
			var bufferIndex = audio0.buffered.length;
			if (bufferIndex > 0 && audio0.buffered != undefined) {
				var bufferValue = audio0.buffered.end(bufferIndex-1)/audio0.duration*progress_width;
                //alert(bufferValue+'--'+audio0.buffered.end(bufferIndex-1)+'--'+bufferIndex+'--'+audio0.duration+'--'+progress_width);
				$('.buffer_progress').css('width',parseInt(bufferValue)+'px');
				if (Math.abs(audio0.duration - audio0.buffered.end(bufferIndex-1)) <1) {
					$('.buffer_progress').css('width',progress_width+'px');
					clearInterval(bufferTimer);
				}
			}
		},1000);
	}
	//=============================================调整播放进度条
	function adjustProgress(dom,ev){
		var event = window.event || ev;
		var progressX = event.clientX - progress_x;
		audio0.currentTime = parseInt(progressX/progress_width*audio0.duration);
		audio.unbind('canplay',bufferBar);
	}
}