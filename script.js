/* =============================================
   PANCASILA & UUD 1945 — script.js
   ============================================= */

// =============================================
// 1. NAVIGASI — Efek scroll (tambah class 'scrolled')
// =============================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


// =============================================
// 2. ACCORDION UUD 1945 — Buka/tutup pasal
// =============================================

/**
 * Toggle accordion pasal UUD
 * Hanya satu pasal yang terbuka dalam satu waktu
 * @param {HTMLElement} header - elemen .pasal-header yang diklik
 */
function togglePasal(header) {
  const item = header.parentElement;
  const isOpen = item.classList.contains('open');

  // Tutup semua pasal yang sedang terbuka
  document.querySelectorAll('.pasal-item.open').forEach(el => {
    el.classList.remove('open');
  });

  // Jika pasal yang diklik belum terbuka, buka sekarang
  if (!isOpen) {
    item.classList.add('open');
  }
}

// Pasang event listener pada setiap pasal-header
document.querySelectorAll('.pasal-header').forEach(header => {
  header.addEventListener('click', () => {
    togglePasal(header);
  });
});


// =============================================
// 3. SCROLL REVEAL — Animasi elemen saat muncul di layar
// =============================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Beri sedikit jeda antar elemen untuk efek stagger
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);

      // Hentikan observasi setelah elemen terlihat
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1  // Trigger saat 10% elemen terlihat
});

// Mulai observasi setiap elemen dengan class .reveal
revealElements.forEach(el => {
  revealObserver.observe(el);
});


// =============================================
// 4. SMOOTH SCROLL — Untuk link navigasi internal
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

    // Lewati jika href hanya '#'
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});