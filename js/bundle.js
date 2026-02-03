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

class CustomVideoPlayer {
  constructor(container) {
    this.container = container;
    this.video = container.querySelector('video');
    this.playButton = container.querySelector('.btn-play-video');
    this.pauseButton = container.querySelector('.btn-pause-video');

    this.init();
  }

  init() {
    this.video.removeAttribute('controls');
    this.pauseButton.style.display = 'none';

    this.bindEvents();
  }

  bindEvents() {
    this.playButton.addEventListener('click', () => this.play());
    this.pauseButton.addEventListener('click', () => this.pause());
    this.video.addEventListener('play', () => this.onPlay());
    this.video.addEventListener('pause', () => this.onPause());
    this.video.addEventListener('ended', () => this.onEnded());
  }

  play() {
    if (this.video.paused) {
      this.video.play();
      this.container.classList.add('playing');
    }
  }

  pause() {
    if (!this.video.paused) {
      this.video.pause();
      this.container.classList.remove('playing');
    }
  }

  onPlay() {
    this.playButton.style.display = 'none';
    this.pauseButton.style.display = 'block';
    this.container.classList.add('playing');
  }

  onPause() {
    this.playButton.style.display = 'block';
    this.pauseButton.style.display = 'none';
    this.container.classList.remove('playing');
  }

  onEnded() {
    this.playButton.style.display = 'block';
    this.pauseButton.style.display = 'none';
    this.container.classList.remove('playing');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const videoContainers = document.querySelectorAll('.custom-video');

  videoContainers.forEach(container => {
    new CustomVideoPlayer(container);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var modalButtons = document.querySelectorAll('.open-modal-dialog'),
      overlay = document.querySelector('body'),
      closeButtons = document.querySelectorAll('.modal-dialog .modal-close');

  var currentOpenModal = null;

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

  function init() {
    document.querySelectorAll('.modal-dialog').forEach(function(modal) {
      modal.classList.remove('modal-opening');
      modal.style.display = 'none';
    });

    var backButtons = document.querySelectorAll('.btn-back[data-dismiss="modal"]');
    backButtons.forEach(function(backBtn) {
      backBtn.addEventListener('click', async function(e) {
        var modal = backBtn.closest('.modal-dialog');
        if (modal) {
          await closeModal(backBtn);
        }
      });
    });
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

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const yOffset = -200;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });
});

class CustomSelect {
  constructor(container) {
    this.container = container;
    this.header = container.querySelector('.filter-item-header');
    this.dropdown = container.querySelector('.filter-item-dropdown');
    this.options = container.querySelectorAll('.filter-item-option');
    this.isOpen = false;

    this.init();
  }

  init() {
    this.bindEvents();
    this.setInitialValue();
  }

  bindEvents() {
    this.header.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    this.options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        this.selectOption(option);
        this.close();
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.container.classList.add('active');
    this.isOpen = true;
  }

  close() {
    this.container.classList.remove('active');
    this.isOpen = false;
  }

  selectOption(option) {
    const selectedText = option.textContent;
    this.header.textContent = selectedText;

    const event = new CustomEvent('select-change', {
      detail: { value: selectedText, element: option }
    });
    this.container.dispatchEvent(event);
  }

  setInitialValue() {
    const firstOption = this.options[0];
    if (firstOption) {
      this.selectOption(firstOption);
    }
  }

  getValue() {
    return this.header.textContent;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const filterItems = document.querySelectorAll('.filter-item');

  filterItems.forEach(item => {
    new CustomSelect(item);
  });
});


var swiper3 = new Swiper(".gallery-slider-thumbs", {
  spaceBetween: 10,
  slidesPerView: "auto",
  watchSlidesProgress: true,
});

var swiper4 = new Swiper(".gallery-slider-main", {
  loop: true,
  spaceBetween: 10,
  effect: "fade",
  navigation: {
    nextEl: ".gallery-slider-main .swiper-button-next",
    prevEl: ".gallery-slider-main .swiper-button-prev",
  },
  thumbs: {
    swiper: swiper3,
  },
});


function checkVisibility() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Проверяем, находится ли блок в футере
    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 100;

    const isVisible = rect.top <= windowHeight - offset && rect.bottom >= 0;

    if (isVisible) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

function checkAllBlocks() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 100;

    if (rect.top <= windowHeight - offset && rect.bottom >= 0) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

window.addEventListener('load', function() {
  checkVisibility();
  setTimeout(checkAllBlocks, 500);
});

window.addEventListener('scroll', checkVisibility);

window.addEventListener('resize', function() {
  setTimeout(checkAllBlocks, 100);
});
