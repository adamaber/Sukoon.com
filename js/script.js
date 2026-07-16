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







function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    // استخدام setTimeout لضمان تفعيل حركة السلايد بسلاسة بعد الـ display
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    // الانتظار حتى تنتهي الحركة (0.4 ثانية) ثم إخفاء العنصر تماماً
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
}











document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.dynamic-slide');
    const dots = document.querySelectorAll('.v-dot');
    let currentSlide = 0;
    let slideInterval;

    // دالة الانتقال لشريحة معينة
    function goToSlide(index) {
        // إزالة الكلاس النشط من الشريحة والنقطة الحالية
        slides[currentSlide].classList.remove('active-slide');
        dots[currentSlide].classList.remove('active');
        
        // تعيين الشريحة الجديدة
        currentSlide = index;
        
        // إضافة الكلاس النشط للشريحة والنقطة الجديدة
        slides[currentSlide].classList.add('active-slide');
        dots[currentSlide].classList.add('active');
    }

    // دالة الانتقال للشريحة التالية تلقائياً
    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }

    // تشغيل التايمر التلقائي (كل 5 ثواني)
    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // إيقاف التايمر وإعادة تشغيله عند الضغط اليدوي
    function resetSlideShow() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // إضافة حدث الضغط على النقط الجانبية
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide !== index) {
                goToSlide(index);
                resetSlideShow();
            }
        });
    });

    // بدء التشغيل لأول مرة
    startSlideShow();
});


// الانتظار حتى تحميل هيكل الصفحة بالكامل (DOM) قبل تشغيل السكربت
document.addEventListener("DOMContentLoaded", () => {
    
    // تحديد جميع العناصر التي تحتوي على كلاس العداد الرقمي
    const counterNumbers = document.querySelectorAll(".count-num");
    
    // الدالة المسؤولة عن تشغيل عداد الأرقام تدريجياً
    const startCounting = (element) => {
        // جلب الرقم المستهدف من خاصية (data-target) وتحويله لنوع رقمي
        const target = parseInt(element.getAttribute("data-target"), 10);
        const duration = 2000; // المدة الإجمالية للحركة بالملي ثانية (ثانيتين)
        
        // حساب الوقت الفاصل بين كل زيادة (لا يقل عن 15ms لضمان سلاسة الأداء)
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let current = 0; // نقطة البداية للعداد

        // الدالة الفرعية لتكرار عملية الزيادة
        const step = () => {
            // حساب قيمة الزيادة في كل خطوة بناءً على الوقت والهدف
            const increment = Math.ceil(target / (duration / stepTime));
            current += increment;

            // التحقق إذا وصلنا للرقم المستهدف أو تجاوزناه
            if (current >= target) {
                // إظهار الرقم النهائي منسقاً (مثال: إضافة فاصلة الآلاف تلقائياً)
                element.innerText = target.toLocaleString();
            } else {
                // تحديث النص بالرقم الحالي وتكرار الدالة بعد الوقت المحدد
                element.innerText = current.toLocaleString();
                setTimeout(step, stepTime);
            }
        };

        // بدء تشغيل أول خطوة في العداد
        step();
    };

    // إعداد مراقب الشاشة (Intersection Observer) لتشغيل العداد أول ما يظهر أمام العميل
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // التحقق إذا كان العنصر مرئياً داخل الشاشة
            if (entry.isIntersecting) {
                startCounting(entry.target); // تشغيل العداد للعنصر المرئي
                observer.unobserve(entry.target); // إيقاف مراقبة العنصر لعدم تكرار الحركة عند النزول والصعود
            }
        });
    }, { 
        threshold: 0.5 // يبدأ التأثير عندما يظهر 50% من القسم داخل الشاشة
    });

    // تفعيل المراقب على كل عناصر العدادات المحددة في الصفحة
    counterNumbers.forEach(num => observer.observe(num));
});




document.addEventListener("DOMContentLoaded", function () {
    const articlesDropdown = document.getElementById('articlesDropdown');
    const dropdownContainer = document.getElementById('articlesDropdownContainer');

    if (articlesDropdown && dropdownContainer) {
        articlesDropdown.addEventListener('click', function (e) {
            // إذا كان المستخدم يتصفح من شاشة كمبيوتر (أكبر من 768px)
            if (window.innerWidth > 768) {
                e.preventDefault(); // نمنع الانتقال لصفحة المقالات
                e.stopPropagation(); // نمنع تداخل الضغطة مع باقي الصفحة
                
                dropdownContainer.classList.toggle('open'); // نفتح الستارة
            }
            // لو شاشة موبايل (أصغر من 768px) مش هنعمل preventDefault خالص، وهنسيب اللينك يوديه لـ articles.html علطول
        });

        // غلق الستارة تلقائياً في الكمبيوتر عند الضغط في أي مكان خارجي
        document.addEventListener('click', function (e) {
            if (window.innerWidth > 768 && !dropdownContainer.contains(e.target)) {
                dropdownContainer.classList.remove('open');
            }
        });
    }
});
