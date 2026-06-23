document.addEventListener('DOMContentLoaded', () => {

    // ==================== العناصر الأساسية ====================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const mainHeader = document.querySelector('.main-header');
    const navItems = document.querySelectorAll('.nav-item');

    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownParent = document.querySelector('.nav-list .dropdown');

    // ==================== القائمة الجانبية ====================
    function toggleMenu() {
        if (!hamburgerBtn || !navMenu || !menuOverlay) return;

        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        document.body.style.overflow =
            navMenu.classList.contains('active')
                ? 'hidden'
                : '';
    }

    if (hamburgerBtn && navMenu && menuOverlay) {
        hamburgerBtn.addEventListener('click', toggleMenu);
        menuOverlay.addEventListener('click', toggleMenu);
    }

    // ==================== إغلاق المنيو عند الضغط على رابط ====================
    navItems.forEach(item => {
        item.addEventListener('click', function () {

            // Active Link
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Close Menu
            if (navMenu && navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ==================== تغيير شكل الهيدر عند السكرول ====================
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            mainHeader.classList.toggle(
                'scrolled',
                window.scrollY > 50
            );
        });
    }

    // ==================== Dropdown للموبايل ====================
    if (dropdownBtn && dropdownParent) {
        dropdownBtn.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();

                dropdownParent.classList.toggle('open');
            }
        });

        document.addEventListener('click', (e) => {
            if (
                window.innerWidth <= 768 &&
                !dropdownParent.contains(e.target)
            ) {
                dropdownParent.classList.remove('open');
            }
        });
    }

    // ==================== Hero Carousel ====================
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-indicators .dot');

    if (slides.length && dots.length) {

        let currentSlide = 0;
        const slideInterval = 6000;

        function changeSlide(nextIndex) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');

            currentSlide = nextIndex;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            changeSlide((currentSlide + 1) % slides.length);
        }

        let autoSlide = setInterval(nextSlide, slideInterval);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(autoSlide);

                changeSlide(index);

                autoSlide = setInterval(nextSlide, slideInterval);
            });
        });
    }

    // ==================== Book Slider ====================
    const bookSlides = document.querySelectorAll('.book-slide');
    const bookDots = document.querySelectorAll('.book-slider-dots .b-dot');
    const bookPrev = document.getElementById('bookPrev');
    const bookNext = document.getElementById('bookNext');

    if (
        bookSlides.length &&
        bookDots.length &&
        bookPrev &&
        bookNext
    ) {

        let currentBookSlide = 0;

        function showBookSlide(index) {

            bookSlides[currentBookSlide].classList.remove('active-slide');
            bookDots[currentBookSlide].classList.remove('active');

            currentBookSlide =
                (index + bookSlides.length) % bookSlides.length;

            bookSlides[currentBookSlide].classList.add('active-slide');
            bookDots[currentBookSlide].classList.add('active');
        }

        bookPrev.addEventListener('click', () => {
            showBookSlide(currentBookSlide - 1);
        });

        bookNext.addEventListener('click', () => {
            showBookSlide(currentBookSlide + 1);
        });

        bookDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showBookSlide(index);
            });
        });
    }

    // ==================== Modal ====================
    const openIndexBtn = document.getElementById('openIndexBtn');
    const indexModal = document.getElementById('indexModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlayClose = document.getElementById('modalOverlayClose');
    const modalScrollContainer = document.querySelector('.modal-scroll-container');

    if (
        openIndexBtn &&
        indexModal &&
        closeModalBtn &&
        modalOverlayClose
    ) {

        function openModal() {
            indexModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            indexModal.classList.remove('open');
            document.body.style.overflow = '';

            if (modalScrollContainer) {
                modalScrollContainer.scrollTop = 0;
            }
        }

        openIndexBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        modalOverlayClose.addEventListener('click', closeModal);
    }

});




document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("articleModal");
  const modalOverlay = modal.querySelector(".modal-overlay");
  const closeBtn = modal.querySelector(".close-modal-btn");
  
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalFullContent = document.getElementById("modalFullContent");

  // دالة لفتح المودال وحقن البيانات ديناميكياً مع تعديل الروابط للـ SEO
  const openArticle = (card) => {
    const tag = card.querySelector(".card-tag").innerText;
    const title = card.querySelector(".article-title").innerText;
    const fullContent = card.querySelector(".full-content").innerHTML;
    const slug = card.getAttribute("data-slug");

    modalTag.innerText = tag;
    modalTitle.innerText = title;
    modalFullContent.innerHTML = fullContent;

    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // منع سكرول الخلفية عند فتح المودال

    window.location.hash = slug; // إضافة الهاش للرابط لمساعدة أرشفة جوجل والـ Share
  };

  // ربط الأزرار الأربعة بالأكشن
  document.querySelectorAll(".read-more-btn").forEach(button => {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".blog-card");
      openArticle(card);
    });
  });

  // دالة إغلاق المودال
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    // تنظيف الرابط وإزالة الهاش بشكل نظيف بدون ريفريش للصفحة
    history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  // ميزة الـ Deep Linking: لو حد فتح لينك بـ هاش معين يفتح المقال فوراً تلقائي
  const currentHash = window.location.hash.replace("#", "");
  if (currentHash) {
    const targetCard = document.querySelector(`[data-slug="${currentHash}"]`);
    if (targetCard) {
      setTimeout(() => openArticle(targetCard), 100);
    }
  }
});











document.addEventListener("DOMContentLoaded", function () {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    // جلب جميع الكروت المخفية وتحويلها لمصفوفة للتحكم في ترتيبها العكسي عند الغلق
    const hiddenCards = Array.from(document.querySelectorAll(".blog-grid .hidden-card"));

    if (loadMoreBtn) {
        // فكرة ذكية: سنستخدم فئة active على الزر لمعرفة الحالة الحالية (فتح أم غلق)
        loadMoreBtn.addEventListener("click", function () {
            const isOpen = loadMoreBtn.classList.contains("active");

            if (!isOpen) {
                // ---- [1] حالة الفتح: تظهر الكروت بالتتابع من الأول للأخير ----
                loadMoreBtn.classList.add("active");
                loadMoreBtn.innerText = "عرض مقالات أقل";

                hiddenCards.forEach((card, index) => {
                    // إظهار الكارت في المتصفح أولاً لتبدأ الأنيميشن
                    card.style.display = "flex"; 
                    
                    setTimeout(() => {
                        card.classList.add("show-smooth");
                    }, index * 120); // تتابع زمني مريح (120ms) بين كل كارت
                });

            } else {
                // ---- [2] حالة الغلق: تختفي الكروت بالتتابع العكسي من الأخير للأول ----
                loadMoreBtn.classList.remove("active");
                loadMoreBtn.innerText = "عرض جميع المقالات";

                // استخدام reverse() لتبدأ الحركة العكسية من الكارت الثامن نزولاً للخامس
                hiddenCards.slice().reverse().forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.remove("show-smooth");
                        
                        // بعد انتهاء أنيميشن الاختفاء تماماً، نقوم بعمل display: none
                        setTimeout(() => {
                            if (!loadMoreBtn.classList.contains("active")) {
                                card.style.display = "none";
                            }
                        }, 600); 

                    }, index * 100); 
                });

                // سكرول ناعم لأعلى قسم المقالات ليظل العميل في نفس سياق الصفحة بعد الاختفاء
                setTimeout(() => {
                    document.getElementById("artkels").scrollIntoView({ behavior: "smooth", block: "start" });
                }, hiddenCards.length * 100);
            }
        });
    }

    // 3. منطق فتح الـ Modal الديناميكي عند الضغط على "اقرأ المقال بالكامل"
    const modal = document.getElementById("articleModal");
    const closeBtn = document.querySelector(".close-modal-btn");
    const overlay = document.querySelector(".modal-overlay");

    document.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("read-more-btn")) {
            const card = e.target.closest(".blog-card");
            
            const title = card.querySelector(".article-title").innerText;
            const tag = card.querySelector(".card-tag").innerText;
            const fullContent = card.querySelector(".full-content").innerHTML;

            document.getElementById("modalTitle").innerText = title;
            document.getElementById("modalTag").innerText = tag;
            document.getElementById("modalFullContent").innerHTML = fullContent;

            modal.classList.add("active");
            document.body.style.overflow = "hidden"; 
        }
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = ""; 
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (overlay) overlay.addEventListener("click", closeModal);
});
