// простая логика для мобильного меню и подстановки текущего года
document.addEventListener('DOMContentLoaded', function () {
  // текущий год в футер
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      navList.classList.toggle('show');
    });
  }
});

// ===== УЛУЧШЕННЫЙ СЛАЙДЕР СПЕЦИАЛЬНОСТЕЙ =====
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.specialties-slider');
  const sliderWrapper = document.querySelector('.specialties-slider-wrapper');
  const prevButton = document.querySelector('.slider-arrow-left');
  const nextButton = document.querySelector('.slider-arrow-right');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!slider) return;
  
  const items = document.querySelectorAll('.specialty-item');
  const itemsCount = items.length;
  let currentIndex = 0;
  let itemsPerView = 3;
  
  // Определяем количество элементов в зависимости от ширины экрана
  function updateItemsPerView() {
    if (window.innerWidth <= 768) {
      itemsPerView = 1;
    } else if (window.innerWidth <= 1024) {
      itemsPerView = 2;
    } else {
      itemsPerView = 3;
    }
    updateSlider();
  }
  
  // Создаем точки-индикаторы
  function createDots() {
    dotsContainer.innerHTML = '';
    const dotsCount = Math.ceil(itemsCount / itemsPerView);
    
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('button');
      dot.classList.add('slider-dot');
      dot.setAttribute('aria-label', `Перейти к слайду ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        goToSlide(i);
      });
      
      dotsContainer.appendChild(dot);
    }
  }
  
  // Переход к определенному слайду
  function goToSlide(index) {
    const maxIndex = Math.ceil(itemsCount / itemsPerView) - 1;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateSlider();
  }
  
  // Обновление слайдера
  function updateSlider() {
    const itemWidth = items[0].offsetWidth + 20; // width + gap
    const translateX = -currentIndex * itemWidth * itemsPerView;
    slider.style.transform = `translateX(${translateX}px)`;
    
    // Обновляем состояние кнопок
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= Math.ceil(itemsCount / itemsPerView) - 1;
    
    // Обновляем точки
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Следующий слайд
  function nextSlide() {
    const maxIndex = Math.ceil(itemsCount / itemsPerView) - 1;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  }
  
  // Предыдущий слайд
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }
  
  // Инициализация
  updateItemsPerView();
  createDots();
  updateSlider();
  
  // Обработчики событий
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  
  // Обработка изменения размера окна
  window.addEventListener('resize', () => {
    updateItemsPerView();
    createDots();
    updateSlider();
  });
  
  // Добавляем поддержку клавиатуры
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
  
  // Добавляем поддержку свайпа на мобильных устройствах
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  
  sliderWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });
  
  sliderWrapper.addEventListener('touchend', () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    
    isDragging = false;
  });
});

// Селекторы для ползунков
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const slider = document.querySelector('.news-slider');

// Функция для прокрутки слайдера влево
leftBtn.addEventListener('click', () => {
  slider.scrollBy({
    left: -300,  // Прокручиваем на 300px влево
    behavior: 'smooth',
  });
});

// Функция для прокрутки слайдера вправо
rightBtn.addEventListener('click', () => {
  slider.scrollBy({
    left: 300,  // Прокручиваем на 300px вправо
    behavior: 'smooth',
  });
});

// Функция для смены языка
document.addEventListener('DOMContentLoaded', function() {
  const languageBtn = document.querySelector('.language-btn');
  const langOptions = document.querySelectorAll('.lang-option');
  
  // Устанавливаем начальное значение кнопки из активного языка
  const activeLang = document.querySelector('.lang-option.active');
  if (activeLang) {
    const langCode = activeLang.getAttribute('data-lang');
    languageBtn.textContent = langCode.toUpperCase();
  }
  
  // Обработчик выбора языка
  langOptions.forEach(option => {
    option.addEventListener('click', function() {
      const selectedLang = this.getAttribute('data-lang');
      
      // Обновляем текст кнопки
      languageBtn.textContent = selectedLang.toUpperCase();
      
      // Обновляем активный элемент
      langOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      // Здесь можно добавить логику смены языка на сайте
      console.log('Язык изменен на:', selectedLang);
    });
  });
});