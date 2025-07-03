
// 鼠标移动视差效果
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const bgX = (x - 0.5) * 40;
    const bgY = (y - 0.5) * 40;
    
    background.style.transform = `translate(${bgX}px, ${bgY}px)`;
});
 

// 页面加载初始化
window.addEventListener('load', function() {
    setupCharacters();
});
 
$(document).ready(function() {
    var active1 = false;
    var active2 = false;
    var active3 = false;
    var active4 = false;
  
    $('.parent2').on('mousedown touchstart', function() {
        if (!active1) $(this).find('.test1').css({'background-color': 'gray', 'transform': 'translate(0px,125px)'});
        else $(this).find('.test1').css({'background-color': 'dimGray', 'transform': 'none'}); 
        
        if (!active2) $(this).find('.test2').css({'background-color': 'gray', 'transform': 'translate(60px,105px)'});
        else $(this).find('.test2').css({'background-color': 'dimGray', 'transform': 'none'});
        
        if (!active3) $(this).find('.test3').css({'background-color': 'gray', 'transform': 'translate(105px,60px)'});
        else $(this).find('.test3').css({'background-color': 'silver', 'transform': 'none'});
        
        if (!active4) $(this).find('.test4').css({'background-color': 'gray', 'transform': 'translate(125px,0px)'});
        else $(this).find('.test4').css({'background-color': 'silver', 'transform': 'none'});
        
        active1 = !active1;
        active2 = !active2;
        active3 = !active3;
        active4 = !active4;
    });
});
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const expand = () => {
  searchBtn.classList.toggle("close");
  input.classList.toggle("square");
};
searchBtn.addEventListener("click", expand);
 // 登录/注册模态框控制
 document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const openModalBtn = document.getElementById('openLoginModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('authModal');
    const modalSigninBtn = document.getElementById('modalSigninBtn');
    const modalSignupBtn = document.getElementById('modalSignupBtn');
    const pinkbox = document.querySelector('.pinkbox');
    const signinForm = document.querySelector('.signin');
    const signupForm = document.querySelector('.signup');

    // 打开模态框
    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex';
        // 默认显示登录表单
        pinkbox.style.transform = 'translateX(0%)';
        signupForm.classList.add('nodisplay');
        signinForm.classList.remove('nodisplay');
    });

    // 关闭模态框
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 模态框内的登录/注册切换
    modalSigninBtn.addEventListener('click', function(e) {
        e.preventDefault();
        pinkbox.style.transform = 'translateX(0%)';
        signupForm.classList.add('nodisplay');
        signinForm.classList.remove('nodisplay');
    });

    modalSignupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        pinkbox.style.transform = 'translateX(80%)';
        signinForm.classList.add('nodisplay');
        signupForm.classList.remove('nodisplay');
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // 为每个图标添加点击事件
    const icons = {
        '#icon-01': 'Index.html',
        '#icon-02': 'Writer.html', 
        '#icon-03': 'MoreBook.html', 
    };
    
    // 找到所有使用symbol的svg元素
    document.querySelectorAll('svg use').forEach(useEl => {
        const href = useEl.getAttribute('xlink:href');
        if(icons[href]) {
            // 为父级svg添加点击事件
            useEl.parentElement.style.cursor = 'pointer';
            useEl.parentElement.addEventListener('click', () => {
                window.location.href = icons[href];
            });
        }
    });
});
const audio = new Audio();
// 替换为您的音乐文件URL
audio.src = "../img/music.mp3";

const playBtn = document.getElementById('playBtn');
const progressContainer = document.getElementById('progressContainer');
const progressBar = document.getElementById('progressBar');
const timeDisplay = document.getElementById('timeDisplay');
const player = document.querySelector('.music-player');
const vinyl = document.querySelector('.vinyl');

let isPlaying = false;

// 播放/暂停
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        player.classList.remove('playing');
    } else {
        audio.play();
        player.classList.add('playing');
    }
    isPlaying = !isPlaying;
    
    // 更新播放按钮图标
    const playIcon = playBtn.querySelector('.play-icon');
    playIcon.innerHTML = isPlaying ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>' : '<path d="M8 5v14l11-7z"/>';
}

// 更新进度条
function updateProgress() {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        updateTimeDisplay();
    }
}

// 更新时间显示
function updateTimeDisplay() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 设置进度
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// 歌曲结束时
function songEnded() {
    isPlaying = false;
    player.classList.remove('playing');
    const playIcon = playBtn.querySelector('.play-icon');
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    progressBar.style.width = '0%';
    updateTimeDisplay();
}

// 事件监听
playBtn.addEventListener('click', togglePlay);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', songEnded);

// 初始化时间显示
updateTimeDisplay();
const muteBtn = document.getElementById('muteBtn');
let isMuted = false;

// 静音/取消静音功能
function toggleMute() {
    isMuted = !isMuted;
    audio.volume = isMuted ? 0 : 1;
    
    // 更新静音按钮图标
    const volumeIcon = muteBtn.querySelector('.volume-icon');
    volumeIcon.innerHTML = isMuted ? 
        '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>' : 
        '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
    
    // 添加/移除静音样式
    muteBtn.classList.toggle('muted', isMuted);
}

// 静音按钮事件监听
muteBtn.addEventListener('click', toggleMute);
 // 获取DOM元素
 const showEnvelopeBtn = document.getElementById('showEnvelopeBtn');
 const envelope = document.getElementById('envelope');
 const letterModal = document.getElementById('letterModal');
 const closeBtn = document.getElementById('closeBtn');
 
 let isEnvelopeVisible = false;
 let isLetterOpen = false;
  
  