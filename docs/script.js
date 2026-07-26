document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================
     1. モーダル（ポップアップ）処理（※ここはそのまま）
  ========================================== */
  const modal = document.getElementById('modal-01');
  if (modal) {
    const modalTitle = modal.querySelector('.c-modal__title');
    const modalImg = modal.querySelector('.c-modal__body img');
    const modalText = modal.querySelector('.c-modal__text');
    const closeBtns = modal.querySelectorAll('.js-modal-close');
    const triggers = document.querySelectorAll('.p-road-item__trigger');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const img = trigger.querySelector('img');
        const title = trigger.getAttribute('data-title') || 'Title';
        const text = trigger.getAttribute('data-text') || ''; 

        if (img && modalImg) {
          modalImg.src = img.src;
          if (modalTitle) modalTitle.innerText = title;
          if (modalText) modalText.innerText = text;
          modal.classList.add('is-active');
        }
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.classList.remove('is-active');
      });
    });
  }

  /* ==========================================
     2. スクロールで足跡をペタペタ順番に表示させる処理 ★
  ========================================== */
  const targets = document.querySelectorAll('.p-road-item, .js-footprints');

  const observer = new IntersectionObserver((entries) => {
    let delayCounter = 0; // 遅延時間を計算するためのカウンター

    // 画面内に入ってきた要素のリストを処理
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('is-show')) {
        
        // ★setTimeoutを使って表示時間を少しずつずらす
        setTimeout(() => {
          entry.target.classList.add('is-show');
        }, delayCounter * 1000); // 1つあたり150ミリ秒ずつ遅れて表示（ペタッ、ペタッ、ペタッ...）

        delayCounter++; // カウンターを増やす
      }
    });
  }, {
    threshold: 0.2 // 20%画面に入ったら発動
  });

  targets.forEach(target => observer.observe(target));
});

// トップに戻るボタンの制御
const pageTopBtn = document.getElementById('js-pagetop');

if (pageTopBtn) {
  // 100px以上スクロールしたらボタンを表示
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      pageTopBtn.classList.add('is-show');
    } else {
      pageTopBtn.classList.remove('is-show');
    }
  });

  // クリックしたらスムーズに上まで戻る
  pageTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
ß