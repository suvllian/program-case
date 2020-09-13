const songs = [
	{ src: "http://www.suvllian.com/static/music/2.mp3", cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489082811479&di=34a91f7666b8433a4fa48b22af22c3e5&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fbaike%2Fw%3D400%2Fsign%3D25b53fb35dafa40f3cc6cfdd9b65038c%2F9f2f070828381f30bf610528ae014c086e06f033.jpg", name:"斑马斑马", singer:"宋冬野"},
	{ src: "http://www.suvllian.com/static/music/3.mp3", cover: "http://gtms04.alicdn.com/tps/i4/TB1n1f3LXXXXXXNaXXXlzJZ8pXX-900-500.jpg", name:"再见再见", singer:"逃跑计划"},
	{ src: "http://www.suvllian.com/static/music/4.mp3", cover: "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1489072687&di=8d168f6ddcaf0ead3ae68d92cf581ac4&src=http://news.k618.cn/culture/201410/W020141008525558079287.jpg", name:"传奇", singer:"王菲"},
	{ src: "http://www.suvllian.com/static/music/1.mp3", cover: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489082868603&di=8b602496828a0ac9d1610ab81942f6db&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%253D580%2Fsign%3D0e7dfc11f01fbe091c5ec31c5b610c30%2F2d2ea18b87d6277feb99f15f2a381f30e824fcfa.jpg",name:"谢谢", singer:"汪峰"}
];

class Music {
	constructor() {
		this.audio = new Audio();

		this.$next = document.querySelector(".next");
		this.$play = document.querySelector(".button");
		this.$playIcon = document.querySelector(".button i");
		
		this.cover = document.querySelector(".music-cover>img");

		this.progress = document.querySelector(".time-control");
		this.progressValue = document.querySelector(".current-time");
		this.restTime = document.querySelector(".music-time");

		this.name = document.querySelector(".music-name");
		this.singer = document.querySelector(".music-singer");

		this.volume = document.querySelector(".volume-control");
		this.volumeValue = document.querySelector(".current-volume");

		this.currentSong = -1;
		this.songs = songs;
		this.time = 0;

		this.init();
	}


	init() {
		this.$play.addEventListener("click", this.playOrpause.bind(this));
		this.$next.addEventListener("click", this.next.bind(this));
		this.audio.addEventListener("timeupdate", this.updateProgress.bind(this));
		this.audio.addEventListener('ended', this.next.bind(this));
		this.progress.addEventListener("click", this.setProgress.bind(this));
		this.volume.addEventListener("click", this.setVolume.bind(this));
	}

	/* 加载歌曲并播放 */ 
	loadAndPlay(index) {
		this.currentSong = index;
		this.song = this.songs[this.currentSong];
		this.load();
		this.play();
	}

	/* 加载歌曲 */
	load() {
		this.name.textContent = this.song.name;
		this.singer.textContent = this.song.singer;
		this.cover.src = this.song.cover;
		this.audio.src = this.song.src;
		document.title = this.song.name;
	}

	/* 首次点击加载并播放歌曲 */
	/* 点击按钮如果在播放则停止，停止则播放 */
	playOrpause(){
		if (this.currentSong == -1){
			this.loadAndPlay(0);
		} else{
			if (this.audio.paused){
				this.play();
			} else{
				this.pause();
			}
		}		
	}

	/* 播放当前歌曲 */
	play() {
		this.audio.play();
		this.$playIcon.className = "fa fa-pause-circle-o";
	}

    /* 暂停当前歌曲 */ 
	pause() {
		this.audio.pause();
		this.$playIcon.className = "fa fa-play-circle-o";
	}

	prev() {
		if (this.currentSong == 0) {
			this.loadAndPlay(this.songs.length - 1)
		}else{
			this.loadAndPlay(this.currentSong - 1)
		}
	}

	/* 下一首歌 */
	next() {
		if (this.currentSong == this.songs.length - 1) {
			this.loadAndPlay(0)
		}else{
			this.loadAndPlay(this.currentSong + 1)
		}
	}

	/* 设置音量 */
	setVolume(e) {
		let rect = this.volume.getBoundingClientRect();
		let volume = (e.x - rect.left) / rect.width;
		this.volumeValue.style.width = volume * 100 + '%';
		this.audio.volume = volume;
	}

	setProgress(e) {
		this.audio.currentTime = e.offsetX / this.progress.clientWidth * this.audio.duration;
	}

	/* 更新歌曲当前剩余时间及进度条 */ 
	updateProgress(){
		let restTime = this.audio.duration - this.audio.currentTime;
		this.restTime.textContent = '-' + this.formatTime(restTime) + '/' +this.formatTime(this.audio.duration) ;
		this.progressValue.style.left = ((this.audio.currentTime / this.audio.duration * 100) - 100) +'%';
	}

	/* 格式化时间为00:00格式 */
	formatTime(time){
		time = parseInt(time);
		let min = Math.floor(time / 60);
		let sec = time % 60;
		let result = "";

		if (min < 10) {
			result += "0";
		}

		result += min + ":";

		if (sec < 10) {
			result += "0";
		}

		result += sec;

		return result;
	}

}

export default Music;