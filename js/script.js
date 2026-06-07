document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const mainHeader = document.querySelector('.main-header');
    const navItems = document.querySelectorAll('.nav-item');

    // 1. فتح وإغلاق القائمة الجانبية للموبايل
    function toggleMenu() {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        // منع السكرول في الخلفية عند فتح المنيو لتجربة مستخدم أفضل
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'initial';
        }
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // 2. إغلاق المنيو تلقائياً عند الضغط على أي رابط (مفيد جداً للموبايل)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. تغيير شكل الهيدر (إضافة سكرول ناعم) عند النزول لأسفل الصفحة
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // 4. تفعيل وضع الرابط النشط (Active Link) تلقائياً عند الضغط
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});












// ==================== سكريبت ألبوم الصور المتحرك (Hero Carousel) ====================
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-indicators .dot');
let currentSlide = 0;
const slideInterval = 6000; // وقت التبديل بين الصور (6 ثوانٍ لمنح المريض شعوراً بالهدوء وعدم التشتت)

function changeSlide(nextSlideIndex) {
    // إزالة الصفة النشطة من الصورة والنقطة الحالية
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // تعيين الصورة القادمة لتكون هي النشطة
    currentSlide = nextSlideIndex;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    changeSlide(next);
}

// تشغيل التبديل التلقائي بشكل مستمر
let autoSlide = setInterval(nextSlide, slideInterval);

// إمكانية التنقل بين الصور يدوياً عند الضغط على النقاط (Indicators)
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // إيقاف التوقيت التلقائي مؤقتاً لتجنب التداخل عند ضغط المستخدم
        clearInterval(autoSlide);

        changeSlide(index);

        // إعادة تشغيل التوقيت التلقائي من جديد
        autoSlide = setInterval(nextSlide, slideInterval);
    });
});




// ==================== 1. سلايدر صور الكتاب الأساسي (أفقي - يمين ويسار) ====================
const bookSlides = document.querySelectorAll('.book-slide');
const bookDots = document.querySelectorAll('.book-slider-dots .b-dot');
const bookPrev = document.getElementById('bookPrev');
const bookNext = document.getElementById('bookNext');
let currentBookSlide = 0;

function showBookSlide(index) {
    bookSlides[currentBookSlide].classList.remove('active-slide');
    bookDots[currentBookSlide].classList.remove('active');
    
    currentBookSlide = (index + bookSlides.length) % bookSlides.length;
    
    bookSlides[currentBookSlide].classList.add('active-slide');
    bookDots[currentBookSlide].classList.add('active');
}

bookPrev.addEventListener('click', () => showBookSlide(currentBookSlide + 1));
bookNext.addEventListener('click', () => showBookSlide(currentBookSlide - 1));

bookDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showBookSlide(idx));
});


// ==================== 2. فتح وإغلاق نافذة الفهرس الذكية (سكرول عمودي) ====================
const openIndexBtn = document.getElementById('openIndexBtn');
const indexModal = document.getElementById('indexModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalOverlayClose = document.getElementById('modalOverlayClose');
const modalScrollContainer = document.querySelector('.modal-scroll-container');

function openModal() {
    indexModal.classList.add('open');
    document.body.style.overflow = 'hidden'; // قفل سكرول الموقع لمنع تداخل الحركتين
}

function closeModal() {
    indexModal.classList.remove('open');
    document.body.style.overflow = 'initial'; // إرجاع سكرول الموقع لطبيعته
    
    // تصفير موضع سكرول الفهرس ليبدأ دائماً من أول صفحة في المرة القادمة
    if(modalScrollContainer) {
        modalScrollContainer.scrollTop = 0;
    }
}

openIndexBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalOverlayClose.addEventListener('click', closeModal);