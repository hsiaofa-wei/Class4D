document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const slides = document.querySelector('.carousel-slides');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const carouselContainer = document.querySelector('.carousel-container');
    const battleInfoBtn = document.querySelector('.battle-info-btn');
    const battleInfoModal = document.querySelector('.battle-info-modal');
    const closeBtn = document.querySelector('.close-btn');
    const battleInfos = document.querySelectorAll('.battle-info-text > div');
    
    // 轮播图控制
    const totalSlides = 3;
    let currentIndex = 0;
    let intervalId = setInterval(nextSlide, 5000);

    // 核心功能函数
    function updateCarousel() {
        slides.style.transform = `translateX(-${currentIndex * 100 / totalSlides}%)`;
        indicators.forEach((ind, i) => ind.classList.toggle('active', i === currentIndex));
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % totalSlides);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    // 事件监听
    indicators.forEach((ind, i) => ind.addEventListener('click', () => goToSlide(i)));
    
    carouselContainer.addEventListener('mouseenter', () => clearInterval(intervalId));
    carouselContainer.addEventListener('mouseleave', () => intervalId = setInterval(nextSlide, 5000));

    // 触摸滑动控制
    let touchStartX = 0;
    carouselContainer.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
    carouselContainer.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        Math.abs(diff) > 50 && (diff < 0 ? nextSlide() : prevSlide());
    }, {passive: true});

    // 战役弹窗控制
    battleInfoBtn.addEventListener('click', () => {
        battleInfos.forEach((info, i) => info.style.display = i === currentIndex ? 'block' : 'none');
        battleInfoModal.classList.add('active');
        clearInterval(intervalId);
    });

    const closeModal = () => {
        battleInfoModal.classList.remove('active');
        intervalId = setInterval(nextSlide, 5000);
    };

    closeBtn.addEventListener('click', closeModal);
    battleInfoModal.addEventListener('click', e => e.target === battleInfoModal && closeModal());
    document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());

    // 初始化
    updateCarousel();
});
