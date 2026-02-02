const header = document.querySelector('header');

if (header) {
  const toggleScrolledClass = () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolledClass);
  toggleScrolledClass();
}



var swiper1 = new Swiper(".products-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".products-section .swiper-button-next",
    prevEl: ".products-section .swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.10,
      spaceBetween: 10,
    },
    601: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  }
});

var swiper2 = new Swiper(".work-videos-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".work-videos-section .swiper-button-next",
    prevEl: ".work-videos-section .swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    601: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1025: {
      slidesPerView: 2.02,
      spaceBetween: 10,
    },
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const videoContainers = document.querySelectorAll('.custom-video');

  videoContainers.forEach(container => {
    const video = container.querySelector('video');
    const playButton = container.querySelector('.btn-play-video');

    video.removeAttribute('controls');

    playButton.addEventListener('click', function() {
      if (video.paused) {
        video.play();
        playButton.style.display = 'none';
      }
    });

    video.addEventListener('pause', function() {
      playButton.style.display = 'block';
    });

    video.addEventListener('ended', function() {
      playButton.style.display = 'block';});

    video.addEventListener('click', function() {
      if (!video.paused) {
        playButton.style.display = 'none';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var modalButtons = document.querySelectorAll('.open-modal-dialog'),
      overlay = document.querySelector('body'),
      closeButtons = document.querySelectorAll('.modal-dialog .modal-close');

  var currentOpenModal = null;
  var enterModalTimer = null;
  var isExitModalShown = false;
  var hasEnterModalShownInSession = false;
  var mobileExitTimer = null;

  function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function setCookie(name, value, options = {}) {
    options = {
      path: '/',
      ...options
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  function getSessionStorageItem(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      console.warn('sessionStorage недоступен:', e);
      return null;
    }
  }

  function setSessionStorageItem(key, value) {
    try {
      sessionStorage.setItem(key, value);
    } catch (e) {
      console.warn('Ошибка записи в sessionStorage:', e);
    }
  }

  async function openModal(modalBtn) {
    return new Promise(resolve => {
      var modalId = modalBtn.getAttribute('data-src'),
          modalElem = document.querySelector('.modal-dialog.' + modalId);

      if (currentOpenModal && currentOpenModal !== modalElem) {
        closeModalDirectly(currentOpenModal);
      }

      overlay.classList.add('modal-open');
      modalElem.style.display = 'flex';

      setTimeout(function() {
        modalElem.classList.add('modal-opening');
        currentOpenModal = modalElem;
        resolve();
      }, 0);
    });
  }

  async function openModalById(modalId) {
    var modalElem = document.querySelector('.modal-dialog.' + modalId);

    if (!modalElem) return;

    if (modalId === 'modal-form-light-exit' && isExitModalShown) return;

    if (currentOpenModal && currentOpenModal !== modalElem) {
      closeModalDirectly(currentOpenModal);
    }

    overlay.classList.add('modal-open');
    modalElem.style.display = 'flex';

    setTimeout(function() {
      modalElem.classList.add('modal-opening');
      currentOpenModal = modalElem;

      if (modalId === 'modal-form-light-exit') {
        isExitModalShown = true;
      } else if (modalId === 'modal-form-light-enter') {
        setSessionStorageItem('enterModalShownInSession', 'true');
        hasEnterModalShownInSession = true;
      }
    }, 10);
  }

  async function closeModal(closeBtn) {
    var modal = closeBtn.closest('.modal-dialog');
    modal.classList.remove('modal-opening');
    modal.classList.add('modal-closing');

    setTimeout(function() {
      modal.classList.remove('modal-closing');
      modal.style.display = 'none';
      overlay.classList.remove('modal-open');
      if (currentOpenModal === modal) currentOpenModal = null;
    }, 500);
  }

  function closeModalDirectly(modalElem) {
    modalElem.classList.remove('modal-opening');
    modalElem.style.display = 'none';
    if (currentOpenModal === modalElem) currentOpenModal = null;
    if (!document.querySelector('.modal-dialog[style*="display: flex"]')) {
      overlay.classList.remove('modal-open');
    }
  }

  function scheduleEnterModal() {
    var wasShownInSession = getSessionStorageItem('enterModalShownInSession');

    if (wasShownInSession === 'true' || hasEnterModalShownInSession) {
      return;
    }

    enterModalTimer = setTimeout(function() {
      if (!hasEnterModalShownInSession && getSessionStorageItem('enterModalShownInSession') !== 'true') {
        openModalById('modal-form-light-enter');
      }
    }, 30000);
  }

  function setupExitModal() {
    if (window.innerWidth > 1024) {
      var showExitTimeout;

      document.addEventListener('mousemove', function(e) {
        if (e.clientY < 10 && !isExitModalShown) {
          if (!showExitTimeout) {
            showExitTimeout = setTimeout(function() {
              openModalById('modal-form-light-exit');
              showExitTimeout = null;
            }, 300);
          }
        } else {
          if (showExitTimeout) {
            clearTimeout(showExitTimeout);
            showExitTimeout = null;
          }
        }
      });
    } else {
      mobileExitTimer = setTimeout(function() {
        if (!isExitModalShown) {
          openModalById('modal-form-light-exit');
        }
      }, 15000);
    }
  }

  function initCookieModal() {
    const cookieAccepted = getCookie('cookieAccepted');
    const cookieModal = document.querySelector('.modal-dialog.modal-cookie');
    const acceptBtn = document.querySelector('.btn-accept');

    if (!cookieAccepted && cookieModal && acceptBtn) {
      setTimeout(() => {
        openModalById('modal-cookie');
      }, 1000);

      acceptBtn.addEventListener('click', function(e) {
        e.preventDefault();
        setCookie('cookieAccepted', 'true', {
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          secure: true,
          samesite: 'strict'
        });

        const closeBtn = cookieModal.querySelector('.modal-close');
        if (closeBtn) {
          closeModal(closeBtn);
        } else {
          closeModalDirectly(cookieModal);
        }
      });
    }
  }

  function init() {
    document.querySelectorAll('.modal-dialog').forEach(function(modal) {
      modal.classList.remove('modal-opening');
      modal.style.display = 'none';
    });

    hasEnterModalShownInSession = getSessionStorageItem('enterModalShownInSession') === 'true';

    scheduleEnterModal();
    setupExitModal();
    initCookieModal();
  }

  modalButtons.forEach(function(modalBtn) {
    modalBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      await openModal(modalBtn);
    });
  });

  closeButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', async function(e) {
      await closeModal(closeBtn);
    });
  });

  document.querySelectorAll('.modal-dialog').forEach(function(item) {
    item.addEventListener('click', async function(e) {
      if (e.target !== e.currentTarget) return;
      await closeModal(this);
    });
  });

  init();
});


document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.small-screens-button');
  const headerNav = document.querySelector('.header-nav');
  const body = document.body;

  function toggleMenu() {
    const isMenuOpen = headerNav.classList.toggle('show');

    mobileMenuBtn.classList.toggle('active', isMenuOpen);

    body.classList.toggle('menu-open', isMenuOpen);
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function(event) {
      event.stopPropagation();
      toggleMenu();
    });
  }

  document.addEventListener('click', function(event) {
    const isMenuOpen = headerNav.classList.contains('show');
    const isClickInsideMenu = headerNav.contains(event.target);
    const isClickOnButton = mobileMenuBtn.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickOnButton) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && headerNav.classList.contains('show')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && headerNav.classList.contains('show')) {
      closeMenu();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const menuItems = document.querySelectorAll('.menu-item-has-children');

  function setupMenu() {
    const isMobile = window.innerWidth <= 1024;

    menuItems.forEach(item => {
      const subMenu = item.querySelector('.sub-menu');
      const link = item.querySelector('a');

      item.classList.remove('accordion-active');

      if (subMenu) {
        if (isMobile) {
          subMenu.style.maxHeight = '0';
        } else {
          subMenu.style.cssText = '';
        }
      }

      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);

      if (isMobile) {
        let clickCount = 0;
        let clickTimer;

        newLink.addEventListener('click', function(e) {
          clickCount++;

          if (clickCount === 1) {
            e.preventDefault();

            const wasActive = item.classList.contains('accordion-active');

            menuItems.forEach(other => {
              if (other !== item) {
                other.classList.remove('accordion-active');
                const otherSub = other.querySelector('.sub-menu');
                if (otherSub) otherSub.style.maxHeight = '0';
              }
            });

            item.classList.toggle('accordion-active');

            if (subMenu) {
              subMenu.style.maxHeight = item.classList.contains('accordion-active')
                  ? subMenu.scrollHeight + 'px'
                  : '0';
            }

            clickTimer = setTimeout(() => {
              clickCount = 0;
            }, 500);
          } else if (clickCount === 2) {
            clearTimeout(clickTimer);
            clickCount = 0;
          }
        });
      }
    });

    if (isMobile) {
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-item-has-children')) {
          menuItems.forEach(item => {
            item.classList.remove('accordion-active');
            const subMenu = item.querySelector('.sub-menu');
            if (subMenu) {
              subMenu.style.maxHeight = '0';
            }
          });
        }
      });
    }
  }

  setupMenu();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupMenu, 250);
  });
});
