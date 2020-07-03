class videoPlayer {
  constructor(videoContainer) {
    this.player = videoContainer;
    this.track = videoContainer.querySelector("track");
    this.video = videoContainer.querySelector("video");
    this.controls = videoContainer.querySelector(".controls");
    this.playPause = videoContainer.querySelector(".playPause");
    this.playPauseimg = videoContainer.querySelector(".playPause img");
    this.pauseLayer = videoContainer.querySelector(".pauseLayer");
    this.progressBar = videoContainer.querySelector(".progressBar");
    this.loadedBar = videoContainer.querySelector(".loadedBar");
    this.playbackBar = videoContainer.querySelector(".playbackBar");
    this.currentTime = videoContainer.querySelector(".currentTime");
    this.totalTime = videoContainer.querySelector(".totalTime");
    this.totalVolume = videoContainer.querySelector(".volumeBar");
    this.currentVolume = videoContainer.querySelector(".volumeBarset");
    this.currentVolumetxt = videoContainer.querySelector(".currentVolume");
    this.moveTimelineLeft = videoContainer.querySelector(".moveTimelineLeft");
    this.moveTimelineRight = videoContainer.querySelector(".moveTimelineRight");
    this.moveVolumeLeft = videoContainer.querySelector(".moveVolumeLeft");
    this.moveVolumeRight = videoContainer.querySelector(".moveVolumeRight");
    this.fullScreen = videoContainer.querySelector(".fullScreen");
    this.popUp = videoContainer.querySelector(".popUp");
    this.apiKEY = "trnsl.1.1.20200321T193655Z.27fb38b0d801dbb7.9d355d1bc97fbdaddb6b67cea7c3882c46ea6364";
    this.translateBox = videoContainer.querySelector(".translateInfo");
    this.translateButton = videoContainer.querySelector(".translateButton")
    this.subOut = document.querySelector(".subOut");
    this.flagMouseMove = true;
    this.timeChange = 5;
    this.voiceChange = 0.01;
    this.toggleControlsTime = 3000;
    this.tooltip = document.createElement("div");
    this.moveTime;
    this.moveTL;
    this.moveTR;
    this.volL;
    this.volR;
    this.dragVL = false;
    this.showWhiteCircleTM;
    this.showWhiteCircleTime = 2000;
    this.volumeST;
    this.firstSetVolume = true;
    this.dragTM = false;
    this.controlsEnable = true;
    this.hideDefaultSubs();
    this.assignEventListeners();
    this.setVolume();
    this.setDuration();
    this.updateLoadingProgress();
  }
  hideDefaultSubs() {
    for (let i = 0; i < this.video.textTracks.length; i++) {
      this.video.textTracks[i].mode = 'hidden';
    }
  }
  play() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
      this.toggleControls;
    }
  }
  updateLoadingProgress() {
    if (this.video.buffered.length > 0) {
      let percentLoaded = (this.video.buffered.end(0) / this.video.duration) * 100;
      this.loadedBar.style.width = `${percentLoaded}%`;
    }
  }
  updatePlayingProgress() {
    let percentPlayed = (this.video.currentTime / this.video.duration) * 100;
    this.playbackBar.style.width = `${percentPlayed}%`;
  }
  movePlayingProgress(s) {
    this.video.currentTime += s;
    this.updatePlayingProgress();
    this.updateCurrentTime();
    this.showWhiteCircle();
    // this.subOut.style.display = "none";
    this.translateBox.style.display = "none";
  }
  formatTime(s) {
    let seconds = Math.round(s),
      minutes = Math.floor(seconds / 60),
      hours = Math.floor(seconds / 3600),
      remainingMinutes = minutes - hours * 60,
      remainingSeconds = seconds - (hours * 3600) - (remainingMinutes * 60);
    if (remainingSeconds == 0) remainingSeconds = "00";
    else if (remainingSeconds < 10) remainingSeconds = `0${remainingSeconds}`;
    if (remainingMinutes == 0) remainingMinutes = "00";
    else if (remainingMinutes < 10) remainingMinutes = `0${remainingMinutes}`;
    return `${hours}:${remainingMinutes}:${remainingSeconds}`;
  }
  setDuration() {
    this.totalTime.innerHTML = this.formatTime(this.video.duration);
  }
  updateCurrentTime() {
    this.currentTime.innerHTML = this.formatTime(this.video.currentTime);
  }
  setCurrentPlayback(e) {
    let leftPos = this.progressBar.getBoundingClientRect().left,
      clickPos = e.pageX,
      pixelsFromLeft = clickPos - leftPos,
      percent = (pixelsFromLeft / this.progressBar.offsetWidth);
    let newTime = this.video.duration * percent;
    this.video.currentTime = newTime;
  }
  adjustVolume(e) {
    let leftPos = this.totalVolume.getBoundingClientRect().left,
      clickPos = e.pageX,
      pixelsFromLeft = clickPos - leftPos,
      percent = (pixelsFromLeft / this.totalVolume.offsetWidth);
    this.video.volume = percent;
    this.setVolume();
  }
  setVolume() {
    let percent = this.video.volume * 100;
    this.currentVolume.style.width = `${percent}%`;
    clearTimeout(this.volumeST);
    if (!this.firstSetVolume) {
      this.currentVolumetxt.style.display = "flex";
      this.currentVolumetxt.innerHTML = `${Math.round(percent)}%`;
      this.volumeST = setTimeout(() => {
        this.currentVolumetxt.style.display = "none";
      }, 500);
    } else {
      this.firstSetVolume = !this.firstSetVolume;
    }
  }
  moveVolume(s) {
    if ((this.video.volume + s) < 0) this.video.volume = 0;
    else if ((this.video.volume + s) > 1) this.video.volume = 1;
    else this.video.volume += s;
    this.setVolume();
    this.toggleControls();
  }
  resetPlayer() {
    this.playPauseimg.src = "img/icons/play.png";
  }
  toggleFullScreen() {
    this.subOut.style.display = "none";
    this.translateBox.style.display = "none";
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) this.player.requestFullscreen();
      else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }
  }
  dragTimeline(e) {
    let leftPos = this.progressBar.getBoundingClientRect().left,
      clickPos = e.pageX,
      pixelsFromLeft = clickPos - leftPos,
      percent = (pixelsFromLeft / this.progressBar.offsetWidth);
    this.playbackBar.style.width = `${percent *100}%`;
    this.subOut.style.display = "none";
    this.translateBox.style.display = "none";
  }
  enddragTimeline(e) {
    let leftPos = this.progressBar.getBoundingClientRect().left,
      clickPos = e.pageX,
      pixelsFromLeft = clickPos - leftPos,
      percent = (pixelsFromLeft / this.progressBar.offsetWidth);
    let newTime = this.video.duration * percent;
    this.video.currentTime = newTime;
  }
  markTooltip(e) {
    let leftPos = this.player.getBoundingClientRect().left,
      leftPosTimebar = this.progressBar.getBoundingClientRect().left,
      topPos = this.player.getBoundingClientRect().top,
      movePosX = e.pageX,
      movePosY = e.pageY,
      pixelsFromLeft = movePosX - leftPos,
      pixelsFromTop = movePosY - topPos,
      pixelsFromLeftTimebar = movePosX - leftPosTimebar,
      percent = (pixelsFromLeftTimebar / this.progressBar.offsetWidth);
    this.tooltip.remove();
    this.tooltip = document.createElement("div");
    this.tooltip.classList.add("tooltip");
    this.tooltip.textContent = this.formatTime(this.video.duration * percent);
    this.tooltip.style.top = `${pixelsFromTop - 35}px`;
    this.tooltip.style.left = `${pixelsFromLeft}px`;
    this.tooltip.draggable = "false";
    this.player.appendChild(this.tooltip);
  }
  showWhiteCircle() {
    clearTimeout(this.showWhiteCircleTM);
    document.querySelector(".circ").classList.add("whiteCircle");
    this.showWhiteCircleTM = setTimeout(() => {
      document.querySelector(".circ").classList.remove("whiteCircle");
    }, this.showWhiteCircleTime);
  }
  toggleControls() {
    clearTimeout(this.moveTime);
    this.controls.style.display = "flex";
    this.player.style.cursor = "auto";
    this.controlsEnable = true;
    this.toggleSubs();
    if (!this.video.paused) {
      this.moveTime = setTimeout(() => {
        this.controls.style.display = "none";
        this.player.style.cursor = "none";
        this.controlsEnable = false;
        this.toggleSubs();
      }, this.toggleControlsTime);
    }
  }
  toggleSubs() {
    if (document.fullscreenEnabled) {
      if (document.fullscreenElement) {
        this.changeSubLine(0, 30);
      } else {
        if (this.controlsEnable) {
          this.changeSubLine(0, 20);
          this.changeSubLine(0, 17);
        } else {
          this.changeSubLine(0, 17);
          this.changeSubLine(0, 20);
        }
      }
    }
  }
  openPopup() {
    try {
      if (this.video !== document.pictureInPictureElement)
        this.video.requestPictureInPicture();
      else
        document.exitPictureInPicture();

    } catch (error) {
      alert(`> Twoje przeglądarka nie wspiera Picture-in-Picture WEB API , ale możesz włączyć PPM -> obraz w obrazie`);
    }
  }
  changeActiveSubtitle(event) {
    if (event.target.track.activeCues) {
      let myCues = event.target.track.activeCues;
      if (myCues.length > 0) {
        this.subOut.style.display = "flex";
        const disp = document.getElementById("display");
        const newLineSub = myCues[0].getCueAsHTML();
        disp.innerHTML = "";
        disp.appendChild(newLineSub);
        disp.innerHTML = disp.innerHTML.trim().split("\n").join(" ").split(" ").map(e => `<span class='sub'>${e}</span>`).join(" ");
        document.querySelectorAll(".sub").forEach((elem) => {
          elem.addEventListener("click", (ev) => {
            ev.stopPropagation();
            this.translateBox.style.display = "block";
            this.translateBox.style.top = "70%";
            this.translateBox.style.left = "50%";
            this.translateBox.textContent = "";
            this.showTranslateBox(ev.target.textContent, ev.target, 0);
          });
        })
        this.translateButton.style.height = `${document.querySelector("#display").offsetHeight}px`;
      }
    }
  }
  translate(word) {
    this.video.pause();
    this.toggleControls;
    const lang = "en-pl";
    const format = "plain";
    let text = encodeURIComponent(word);
    let url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.apiKEY}&text=${text}&lang=${lang}&${format}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.translateBox.textContent = data.text[0];
      }).catch(e => {
        console.log(e);
      });
  }
  showTranslateBox(word, where, minus) {
    let leftPos = this.player.getBoundingClientRect().left,
      topPos = this.player.getBoundingClientRect().top,
      leftSub = where.getBoundingClientRect().left,
      topSub = where.getBoundingClientRect().top;
    this.translateBox.style.left = `${leftSub - leftPos + (where.offsetWidth/2)}px`;
    this.translateBox.style.top = `${topSub - topPos - (where.offsetHeight) - minus}px`;
    this.translate(word);
  }
  translateSent() {
    if (this.video.textTracks[0].activeCues.length) {
      if (this.video.textTracks[0].activeCues[0]) {
        this.translateBox.style.display = "block";
        this.translateBox.style.top = "70%";
        this.translateBox.style.left = "50%";
        this.translateBox.textContent = "";
        this.showTranslateBox(this.video.textTracks[0].activeCues[0].text, this.playPause, this.subOut.offsetHeight * 2);
      }
    }
  }
  removeActiveSubtitle() {
    const disp = document.getElementById("display");
    disp.innerHTML = "";
    this.subOut.style.display = "none";
    this.translateBox.style.display = "none";
  }
  addRemoveListenerSub() {
    if (this.video.textTracks[0].activeCues.length) {
      if (this.video.textTracks[0].activeCues[0]) {
        this.video.textTracks[0].activeCues[0].addEventListener("exit", () => {
          this.removeActiveSubtitle();
        });
      }
    }
  }
  changeSubLine(index, a) {
    for (let i = 0; i < this.video.textTracks[index].cues.length; i++) {
      this.video.textTracks[index].cues[i].line = a;
    }
  }
  assignEventListeners() {
    this.player.addEventListener("mousemove", () => {
      this.toggleControls();
    });
    this.playPause.addEventListener("click", () => {
      this.play();
    }, false);
    this.video.addEventListener("loadeddata", () => {
      this.changeSubLine(0, 15);
    }, false);
    this.video.addEventListener("pause", () => {
      this.playPauseimg.src = "img/icons/play.png";
    }, false);
    this.video.addEventListener("play", () => {
      this.translateBox.textContent = "";
      this.subOut.style.display = "none";
      this.translateBox.style.display = "none";
      this.playPauseimg.src = "img/icons/pause.png";
    }, false);
    this.video.addEventListener("click", () => {
      this.play();
      this.toggleControls();
    }, false);
    this.video.addEventListener("dblclick", () => {
      this.toggleFullScreen();
    }, false);
    this.video.addEventListener("progress", () => {
      this.updateLoadingProgress();
    }, false);
    this.video.addEventListener("timeupdate", () => {
      if (!this.dragTM) {
        this.updatePlayingProgress();
      }
      this.addRemoveListenerSub();
      this.updateCurrentTime();
    }, false);
    this.video.addEventListener("durationchange", () => {
      this.setDuration();
    }, false);
    this.video.addEventListener("volumechange", () => {
      this.setVolume();
    }, false);
    this.video.addEventListener("ended", () => {
      this.resetPlayer();
    }, false);
    this.progressBar.addEventListener("click", () => {
      this.setCurrentPlayback(event);
      this.showWhiteCircle();
      this.subOut.style.display = "none";
      this.translateBox.style.display = "none";
    }, false);
    this.progressBar.addEventListener("mousedown", () => {
      this.dragTM = true;
    }, false);
    this.progressBar.addEventListener("mouseup", () => {
      this.dragTM = false;
      this.enddragTimeline(event);
    }, false);
    this.progressBar.addEventListener("mousemove", () => {
      this.markTooltip(event);
      if (this.dragTM) {
        this.dragTimeline(event);
        this.showWhiteCircle();
      }
    }, false);
    this.progressBar.addEventListener("mouseleave", () => {
      this.tooltip.remove();
      if (this.dragTM) {
        this.dragTM = false;
        this.enddragTimeline(event);
      }
    }, false);
    this.totalVolume.addEventListener("click", () => {
      this.adjustVolume(event);
    }, false);
    this.totalVolume.addEventListener("mousemove", () => {
      if (this.dragVL) {
        this.adjustVolume(event);
      }
    }, false);
    this.totalVolume.addEventListener("mouseup", () => {
      this.dragVL = false;
    }, false);
    this.totalVolume.addEventListener("mousedown", () => {
      this.dragVL = true;
    }, false);
    this.totalVolume.addEventListener("mouseleave", () => {
      if (this.dragVL) {
        this.dragVL = false;
      }
    }, false);
    this.moveVolumeLeft.addEventListener("mousedown", () => {
      const that = this;
      this.volL = setInterval(() => {
        that.moveVolume(-that.voiceChange);
      }, 50);
    }, false);
    this.moveVolumeLeft.addEventListener("mouseup", () => {
      clearInterval(this.volL);
    }, false);
    this.moveVolumeLeft.addEventListener("mouseleave", () => {
      clearInterval(this.volL);
    }, false);
    this.moveVolumeRight.addEventListener("mousedown", () => {
      const that = this;
      this.volR = setInterval(() => {
        that.moveVolume(that.voiceChange);
      }, 30);
    }, false);
    this.moveVolumeRight.addEventListener("mouseup", () => {
      clearInterval(this.volR);
    }, false);
    this.moveVolumeRight.addEventListener("mouseleave", () => {
      clearInterval(this.volR);
    }, false);
    this.moveTimelineLeft.addEventListener("click", () => {
      this.movePlayingProgress(-this.timeChange);
    }, false);
    this.moveTimelineLeft.addEventListener("mousedown", () => {
      const that = this;
      this.moveTL = setInterval(() => {
        that.movePlayingProgress(-that.timeChange);
        this.toggleControls();
      }, 100);
    }, false);
    this.moveTimelineLeft.addEventListener("mouseup", () => {
      clearInterval(this.moveTL);
    }, false);
    this.moveTimelineLeft.addEventListener("mouseleave", () => {
      clearInterval(this.moveTL);
    }, false);
    this.moveTimelineRight.addEventListener("click", () => {
      this.movePlayingProgress(this.timeChange);
    }, false);
    this.moveTimelineRight.addEventListener("mousedown", () => {
      const that = this;
      this.moveTR = setInterval(() => {
        that.movePlayingProgress(that.timeChange);
        this.toggleControls();
      }, 100);
    }, false);
    this.moveTimelineRight.addEventListener("mouseup", () => {
      clearInterval(this.moveTR);
    }, false);
    this.moveTimelineRight.addEventListener("mouseleave", () => {
      clearInterval(this.moveTR);
    }, false);
    this.fullScreen.addEventListener("click", () => {
      this.toggleFullScreen();
    }, false);
    this.popUp.addEventListener('click', () => {
      this.openPopup();
    });
    this.track.addEventListener("cuechange", (e) => {
      this.changeActiveSubtitle(e);
    });
    this.translateButton.addEventListener('click', () => {
      this.translateSent();
    });
    this.subOut.addEventListener('click', () => {
      this.video.pause();
    });
    window.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 32:
          this.play();
          this.toggleControls();
          break;
        case 37:
          this.movePlayingProgress(-this.timeChange);
          this.toggleControls();
          break;
        case 39:
          this.movePlayingProgress(this.timeChange);
          this.toggleControls();
          break;
        case 38:
          this.moveVolume(this.voiceChange);
          this.toggleControls();
          break;
        case 40:
          this.moveVolume(-this.voiceChange);
          this.toggleControls();
          break;
        case 70:
          this.toggleFullScreen();
          this.toggleControls();
          break;
        case 80:
          this.openPopup();
          break;
      }
    });
  }
}
if (document.querySelector("video")) {
  const videoPlayer1 = new videoPlayer(document.querySelector(".player"))
};
// var track = document.getElementById("track1");