/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 145:
/***/ (() => {

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
    prevEl: ".products-section .swiper-button-prev"
  },
  breakpoints: {
    320: {
      slidesPerView: 1.10,
      spaceBetween: 10
    },
    601: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1025: {
      slidesPerView: 4,
      spaceBetween: 10
    }
  }
});
var swiper2 = new Swiper(".work-videos-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".work-videos-section .swiper-button-next",
    prevEl: ".work-videos-section .swiper-button-prev"
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    601: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    1025: {
      slidesPerView: 2.02,
      spaceBetween: 10
    }
  }
});
class CustomVideoPlayer {
  constructor(container) {
    this.container = container;
    this.video = container.querySelector('video');
    this.playButton = container.querySelector('.btn-play-video');
    this.init();
  }
  init() {
    this.video.removeAttribute('controls');
    this.video.setAttribute('playsinline', '');
    this.video.setAttribute('webkit-playsinline', '');
    this.video.setAttribute('preload', 'metadata');
    this.bindEvents();
  }
  bindEvents() {
    this.playButton.addEventListener('click', e => {
      e.preventDefault();
      this.play();
    });
    this.video.addEventListener('play', () => this.onPlay());
    this.video.addEventListener('pause', () => this.onPause());
    this.video.addEventListener('ended', () => this.onEnded());
    this.video.addEventListener('click', () => this.togglePlay());
  }
  play() {
    if (this.video.paused) {
      this.video.play().catch(error => {
        this.video.setAttribute('controls', '');
        this.playButton.style.display = 'none';
        setTimeout(() => {
          this.video.play();
        }, 100);
      });
      this.container.classList.add('playing');
    }
  }
  pause() {
    if (!this.video.paused) {
      this.video.pause();
      this.container.classList.remove('playing');
    }
  }
  togglePlay() {
    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
  onPlay() {
    this.playButton.style.display = 'none';
    this.video.removeAttribute('controls');
    this.container.classList.add('playing');
  }
  onPause() {
    this.playButton.style.display = 'block';
    this.container.classList.remove('playing');
  }
  onEnded() {
    this.playButton.style.display = 'block';
    this.container.classList.remove('playing');
  }
}
document.addEventListener('DOMContentLoaded', function () {
  const videoContainers = document.querySelectorAll('.video-js');
  videoContainers.forEach(container => {
    new CustomVideoPlayer(container);
  });
});
document.addEventListener('DOMContentLoaded', function () {
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
      setTimeout(function () {
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
    setTimeout(function () {
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
    document.querySelectorAll('.modal-dialog').forEach(function (modal) {
      modal.classList.remove('modal-opening');
      modal.style.display = 'none';
    });
    var backButtons = document.querySelectorAll('.btn-back[data-dismiss="modal"]');
    backButtons.forEach(function (backBtn) {
      backBtn.addEventListener('click', async function (e) {
        var modal = backBtn.closest('.modal-dialog');
        if (modal) {
          await closeModal(backBtn);
        }
      });
    });
  }
  modalButtons.forEach(function (modalBtn) {
    modalBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      await openModal(modalBtn);
    });
  });
  closeButtons.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', async function (e) {
      await closeModal(closeBtn);
    });
  });
  document.querySelectorAll('.modal-dialog').forEach(function (item) {
    item.addEventListener('click', async function (e) {
      if (e.target !== e.currentTarget) return;
      await closeModal(this);
    });
  });
  init();
});
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.small-screens-button');
  const headerNav = document.querySelector('.header-nav');
  const body = document.body;
  function toggleMenu() {
    const isMenuOpen = headerNav.classList.toggle('show');
    mobileMenuBtn.classList.toggle('active', isMenuOpen);
    body.classList.toggle('menu-open', isMenuOpen);
  }
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      toggleMenu();
    });
  }
  document.addEventListener('click', function (event) {
    const isMenuOpen = headerNav.classList.contains('show');
    const isClickInsideMenu = headerNav.contains(event.target);
    const isClickOnButton = mobileMenuBtn.contains(event.target);
    if (isMenuOpen && !isClickInsideMenu && !isClickOnButton) {
      closeMenu();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && headerNav.classList.contains('show')) {
      closeMenu();
    }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024 && headerNav.classList.contains('show')) {
      closeMenu();
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
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
        newLink.addEventListener('click', function (e) {
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
              subMenu.style.maxHeight = item.classList.contains('accordion-active') ? subMenu.scrollHeight + 'px' : '0';
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
      document.addEventListener('click', function (e) {
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
document.addEventListener('DOMContentLoaded', function () {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      e.preventDefault();
      const currentPath = window.location.pathname;
      const linkPath = this.pathname;
      if (linkPath !== '' && linkPath !== currentPath) {
        const url = linkPath + targetId;
        window.location.href = url;
      } else {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const windowHeight = window.innerHeight;
        const elementHeight = targetElement.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - windowHeight / 2 + elementHeight / 2;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        history.pushState(null, null, targetId);
      }
    });
  });
});
window.addEventListener('load', function () {
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const yOffset = -headerHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + yOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 500);
  }
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
    this.header.addEventListener('click', e => {
      e.stopPropagation();
      this.toggle();
    });
    this.options.forEach(option => {
      option.addEventListener('click', e => {
        e.stopPropagation();
        this.selectOption(option);
        this.close();
      });
    });
    document.addEventListener('click', e => {
      if (!this.container.contains(e.target)) {
        this.close();
      }
    });
    document.addEventListener('keydown', e => {
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
      detail: {
        value: selectedText,
        element: option
      }
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
document.addEventListener('DOMContentLoaded', function () {
  const filterItems = document.querySelectorAll('.filter-item');
  filterItems.forEach(item => {
    new CustomSelect(item);
  });
});
var swiper3 = new Swiper(".gallery-slider-thumbs", {
  spaceBetween: 10,
  slidesPerView: "auto",
  watchSlidesProgress: true
});
var swiper4 = new Swiper(".gallery-slider-main", {
  loop: true,
  spaceBetween: 10,
  effect: "fade",
  navigation: {
    nextEl: ".gallery-slider-main .swiper-button-next",
    prevEl: ".gallery-slider-main .swiper-button-prev"
  },
  thumbs: {
    swiper: swiper3
  }
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
    const offset = isInFooter || window.innerWidth < 768 ? 0 : 0;
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
    const offset = isInFooter || window.innerWidth < 768 ? 0 : 0;
    if (rect.top <= windowHeight - offset && rect.bottom >= 0) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}
window.addEventListener('load', function () {
  checkVisibility();
  setTimeout(checkAllBlocks, 500);
});
window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', function () {
  setTimeout(checkAllBlocks, 100);
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(145);
/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_script__WEBPACK_IMPORTED_MODULE_0__);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFlLENBQUMsQ0FBQztFQUNqQjdHLFVBQVUsQ0FBQ3dILGNBQWMsRUFBRSxHQUFHLENBQUM7QUFDakMsQ0FBQyxDQUFDO0FBRUZoSyxNQUFNLENBQUNLLGdCQUFnQixDQUFDLFFBQVEsRUFBRWdKLGVBQWUsQ0FBQztBQUVsRHJKLE1BQU0sQ0FBQ0ssZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVc7RUFDM0NtQyxVQUFVLENBQUN3SCxjQUFjLEVBQUUsR0FBRyxDQUFDO0FBQ2pDLENBQUMsQ0FBQzs7Ozs7O1VDcGxCRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0Ly4vc291cmNlL2pzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrLXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3dlYnBhY2stcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFjay1wcm9qZWN0Ly4vc291cmNlL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG5cclxuaWYgKGhlYWRlcikge1xyXG4gIGNvbnN0IHRvZ2dsZVNjcm9sbGVkQ2xhc3MgPSAoKSA9PiB7XHJcbiAgICBpZiAod2luZG93LnNjcm9sbFkgPiAwKSB7XHJcbiAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGVkJyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRvZ2dsZVNjcm9sbGVkQ2xhc3MpO1xyXG4gIHRvZ2dsZVNjcm9sbGVkQ2xhc3MoKTtcclxufVxyXG5cclxuXHJcblxyXG52YXIgc3dpcGVyMSA9IG5ldyBTd2lwZXIoXCIucHJvZHVjdHMtc2xpZGVyXCIsIHtcclxuICBvYnNlcnZlcjogdHJ1ZSxcclxuICBvYnNlcnZlUGFyZW50czogdHJ1ZSxcclxuICBvYnNlcnZlU2xpZGVDaGlsZHJlbjogdHJ1ZSxcclxuICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG4gIG5hdmlnYXRpb246IHtcclxuICAgIG5leHRFbDogXCIucHJvZHVjdHMtc2VjdGlvbiAuc3dpcGVyLWJ1dHRvbi1uZXh0XCIsXHJcbiAgICBwcmV2RWw6IFwiLnByb2R1Y3RzLXNlY3Rpb24gLnN3aXBlci1idXR0b24tcHJldlwiLFxyXG4gIH0sXHJcbiAgYnJlYWtwb2ludHM6IHtcclxuICAgIDMyMDoge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLjEwLFxyXG4gICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgfSxcclxuICAgIDYwMToge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgfSxcclxuICAgIDEwMjU6IHtcclxuICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgIH0sXHJcbiAgfVxyXG59KTtcclxuXHJcbnZhciBzd2lwZXIyID0gbmV3IFN3aXBlcihcIi53b3JrLXZpZGVvcy1zbGlkZXJcIiwge1xyXG4gIG9ic2VydmVyOiB0cnVlLFxyXG4gIG9ic2VydmVQYXJlbnRzOiB0cnVlLFxyXG4gIG9ic2VydmVTbGlkZUNoaWxkcmVuOiB0cnVlLFxyXG4gIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXHJcbiAgbmF2aWdhdGlvbjoge1xyXG4gICAgbmV4dEVsOiBcIi53b3JrLXZpZGVvcy1zZWN0aW9uIC5zd2lwZXItYnV0dG9uLW5leHRcIixcclxuICAgIHByZXZFbDogXCIud29yay12aWRlb3Mtc2VjdGlvbiAuc3dpcGVyLWJ1dHRvbi1wcmV2XCIsXHJcbiAgfSxcclxuICBicmVha3BvaW50czoge1xyXG4gICAgMzIwOiB7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICB9LFxyXG4gICAgNjAxOiB7XHJcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICB9LFxyXG4gICAgMTAyNToge1xyXG4gICAgICBzbGlkZXNQZXJWaWV3OiAyLjAyLFxyXG4gICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgfSxcclxuICB9XHJcbn0pO1xyXG5cclxuY2xhc3MgQ3VzdG9tVmlkZW9QbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICB0aGlzLnZpZGVvID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XHJcbiAgICB0aGlzLnBsYXlCdXR0b24gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmJ0bi1wbGF5LXZpZGVvJyk7XHJcblxyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy52aWRlby5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XHJcbiAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XHJcbiAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xyXG4gICAgdGhpcy52aWRlby5zZXRBdHRyaWJ1dGUoJ3ByZWxvYWQnLCAnbWV0YWRhdGEnKTtcclxuXHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIGJpbmRFdmVudHMoKSB7XHJcbiAgICB0aGlzLnBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgKCkgPT4gdGhpcy5vblBsYXkoKSk7XHJcbiAgICB0aGlzLnZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgKCkgPT4gdGhpcy5vblBhdXNlKCkpO1xyXG4gICAgdGhpcy52aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHRoaXMub25FbmRlZCgpKTtcclxuICAgIHRoaXMudmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSk7XHJcbiAgfVxyXG5cclxuICBwbGF5KCkge1xyXG4gICAgaWYgKHRoaXMudmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgIHRoaXMudmlkZW8ucGxheSgpLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICB0aGlzLnZpZGVvLnNldEF0dHJpYnV0ZSgnY29udHJvbHMnLCAnJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGF1c2UoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgIHRoaXMudmlkZW8ucGF1c2UoKTtcclxuICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdG9nZ2xlUGxheSgpIHtcclxuICAgIGlmICh0aGlzLnZpZGVvLnBhdXNlZCkge1xyXG4gICAgICB0aGlzLnBsYXkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uUGxheSgpIHtcclxuICAgIHRoaXMucGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgdGhpcy52aWRlby5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgfVxyXG5cclxuICBvblBhdXNlKCkge1xyXG4gICAgdGhpcy5wbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gIH1cclxuXHJcbiAgb25FbmRlZCgpIHtcclxuICAgIHRoaXMucGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICBjb25zdCB2aWRlb0NvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudmlkZW8tanMnKTtcclxuXHJcbiAgdmlkZW9Db250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcclxuICAgIG5ldyBDdXN0b21WaWRlb1BsYXllcihjb250YWluZXIpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICB2YXIgbW9kYWxCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9wZW4tbW9kYWwtZGlhbG9nJyksXHJcbiAgICBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLFxyXG4gICAgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1vZGFsLWRpYWxvZyAubW9kYWwtY2xvc2UnKTtcclxuXHJcbiAgdmFyIGN1cnJlbnRPcGVuTW9kYWwgPSBudWxsO1xyXG5cclxuICBhc3luYyBmdW5jdGlvbiBvcGVuTW9kYWwobW9kYWxCdG4pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgdmFyIG1vZGFsSWQgPSBtb2RhbEJ0bi5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3JjJyksXHJcbiAgICAgICAgbW9kYWxFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWRpYWxvZy4nICsgbW9kYWxJZCk7XHJcblxyXG4gICAgICBpZiAoY3VycmVudE9wZW5Nb2RhbCAmJiBjdXJyZW50T3Blbk1vZGFsICE9PSBtb2RhbEVsZW0pIHtcclxuICAgICAgICBjbG9zZU1vZGFsRGlyZWN0bHkoY3VycmVudE9wZW5Nb2RhbCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnbW9kYWwtb3BlbicpO1xyXG4gICAgICBtb2RhbEVsZW0uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbW9kYWxFbGVtLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW9wZW5pbmcnKTtcclxuICAgICAgICBjdXJyZW50T3Blbk1vZGFsID0gbW9kYWxFbGVtO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGNsb3NlTW9kYWwoY2xvc2VCdG4pIHtcclxuICAgIHZhciBtb2RhbCA9IGNsb3NlQnRuLmNsb3Nlc3QoJy5tb2RhbC1kaWFsb2cnKTtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW9wZW5pbmcnKTtcclxuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNsb3NpbmcnKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1jbG9zaW5nJyk7XHJcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtb3BlbicpO1xyXG4gICAgICBpZiAoY3VycmVudE9wZW5Nb2RhbCA9PT0gbW9kYWwpIGN1cnJlbnRPcGVuTW9kYWwgPSBudWxsO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsb3NlTW9kYWxEaXJlY3RseShtb2RhbEVsZW0pIHtcclxuICAgIG1vZGFsRWxlbS5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1vcGVuaW5nJyk7XHJcbiAgICBtb2RhbEVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGlmIChjdXJyZW50T3Blbk1vZGFsID09PSBtb2RhbEVsZW0pIGN1cnJlbnRPcGVuTW9kYWwgPSBudWxsO1xyXG4gICAgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZGlhbG9nW3N0eWxlKj1cImRpc3BsYXk6IGZsZXhcIl0nKSkge1xyXG4gICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW9wZW4nKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubW9kYWwtZGlhbG9nJykuZm9yRWFjaChmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1vcGVuaW5nJyk7XHJcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgYmFja0J1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLWJhY2tbZGF0YS1kaXNtaXNzPVwibW9kYWxcIl0nKTtcclxuICAgIGJhY2tCdXR0b25zLmZvckVhY2goZnVuY3Rpb24oYmFja0J0bikge1xyXG4gICAgICBiYWNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBtb2RhbCA9IGJhY2tCdG4uY2xvc2VzdCgnLm1vZGFsLWRpYWxvZycpO1xyXG4gICAgICAgIGlmIChtb2RhbCkge1xyXG4gICAgICAgICAgYXdhaXQgY2xvc2VNb2RhbChiYWNrQnRuKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBtb2RhbEJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbihtb2RhbEJ0bikge1xyXG4gICAgbW9kYWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgYXdhaXQgb3Blbk1vZGFsKG1vZGFsQnRuKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBjbG9zZUJ1dHRvbnMuZm9yRWFjaChmdW5jdGlvbihjbG9zZUJ0bikge1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGF3YWl0IGNsb3NlTW9kYWwoY2xvc2VCdG4pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2RhbC1kaWFsb2cnKS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSByZXR1cm47XHJcbiAgICAgIGF3YWl0IGNsb3NlTW9kYWwodGhpcyk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgaW5pdCgpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICBjb25zdCBtb2JpbGVNZW51QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNtYWxsLXNjcmVlbnMtYnV0dG9uJyk7XHJcbiAgY29uc3QgaGVhZGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlci1uYXYnKTtcclxuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcclxuICAgIGNvbnN0IGlzTWVudU9wZW4gPSBoZWFkZXJOYXYuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xyXG5cclxuICAgIG1vYmlsZU1lbnVCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgaXNNZW51T3Blbik7XHJcblxyXG4gICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdtZW51LW9wZW4nLCBpc01lbnVPcGVuKTtcclxuICB9XHJcblxyXG4gIGlmIChtb2JpbGVNZW51QnRuKSB7XHJcbiAgICBtb2JpbGVNZW51QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIHRvZ2dsZU1lbnUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgY29uc3QgaXNNZW51T3BlbiA9IGhlYWRlck5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKTtcclxuICAgIGNvbnN0IGlzQ2xpY2tJbnNpZGVNZW51ID0gaGVhZGVyTmF2LmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XHJcbiAgICBjb25zdCBpc0NsaWNrT25CdXR0b24gPSBtb2JpbGVNZW51QnRuLmNvbnRhaW5zKGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgaWYgKGlzTWVudU9wZW4gJiYgIWlzQ2xpY2tJbnNpZGVNZW51ICYmICFpc0NsaWNrT25CdXR0b24pIHtcclxuICAgICAgY2xvc2VNZW51KCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgJiYgaGVhZGVyTmF2LmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XHJcbiAgICAgIGNsb3NlTWVudSgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiAxMDI0ICYmIGhlYWRlck5hdi5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICBjbG9zZU1lbnUoKTtcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nKTtcclxuXHJcbiAgZnVuY3Rpb24gc2V0dXBNZW51KCkge1xyXG4gICAgY29uc3QgaXNNb2JpbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCA8PSAxMDI0O1xyXG5cclxuICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICBjb25zdCBzdWJNZW51ID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuc3ViLW1lbnUnKTtcclxuICAgICAgY29uc3QgbGluayA9IGl0ZW0ucXVlcnlTZWxlY3RvcignYScpO1xyXG5cclxuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY2NvcmRpb24tYWN0aXZlJyk7XHJcblxyXG4gICAgICBpZiAoc3ViTWVudSkge1xyXG4gICAgICAgIGlmIChpc01vYmlsZSkge1xyXG4gICAgICAgICAgc3ViTWVudS5zdHlsZS5tYXhIZWlnaHQgPSAnMCc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHN1Yk1lbnUuc3R5bGUuY3NzVGV4dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbmV3TGluayA9IGxpbmsuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICBsaW5rLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0xpbmssIGxpbmspO1xyXG5cclxuICAgICAgaWYgKGlzTW9iaWxlKSB7XHJcbiAgICAgICAgbGV0IGNsaWNrQ291bnQgPSAwO1xyXG4gICAgICAgIGxldCBjbGlja1RpbWVyO1xyXG5cclxuICAgICAgICBuZXdMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgY2xpY2tDb3VudCsrO1xyXG5cclxuICAgICAgICAgIGlmIChjbGlja0NvdW50ID09PSAxKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdhc0FjdGl2ZSA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY2NvcmRpb24tYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChvdGhlciA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKG90aGVyICE9PSBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBvdGhlci5jbGFzc0xpc3QucmVtb3ZlKCdhY2NvcmRpb24tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvdGhlclN1YiA9IG90aGVyLnF1ZXJ5U2VsZWN0b3IoJy5zdWItbWVudScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG90aGVyU3ViKSBvdGhlclN1Yi5zdHlsZS5tYXhIZWlnaHQgPSAnMCc7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWNjb3JkaW9uLWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN1Yk1lbnUpIHtcclxuICAgICAgICAgICAgICBzdWJNZW51LnN0eWxlLm1heEhlaWdodCA9IGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY2NvcmRpb24tYWN0aXZlJylcclxuICAgICAgICAgICAgICAgID8gc3ViTWVudS5zY3JvbGxIZWlnaHQgKyAncHgnXHJcbiAgICAgICAgICAgICAgICA6ICcwJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2xpY2tUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNsaWNrQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChjbGlja0NvdW50ID09PSAyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbGlja1RpbWVyKTtcclxuICAgICAgICAgICAgY2xpY2tDb3VudCA9IDA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChpc01vYmlsZSkge1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoIWUudGFyZ2V0LmNsb3Nlc3QoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykpIHtcclxuICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjY29yZGlvbi1hY3RpdmUnKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ViTWVudSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnN1Yi1tZW51Jyk7XHJcbiAgICAgICAgICAgIGlmIChzdWJNZW51KSB7XHJcbiAgICAgICAgICAgICAgc3ViTWVudS5zdHlsZS5tYXhIZWlnaHQgPSAnMCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXR1cE1lbnUoKTtcclxuXHJcbiAgbGV0IHJlc2l6ZVRpbWVyO1xyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICBjbGVhclRpbWVvdXQocmVzaXplVGltZXIpO1xyXG4gICAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KHNldHVwTWVudSwgMjUwKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgYW5jaG9yTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWZePVwiI1wiXScpO1xyXG5cclxuICBhbmNob3JMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xyXG4gICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgY29uc3QgdGFyZ2V0SWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG5cclxuICAgICAgaWYgKHRhcmdldElkID09PSAnIycgfHwgdGFyZ2V0SWQgPT09ICcnKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRJZCk7XHJcbiAgICAgIGlmICghdGFyZ2V0RWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgY29uc3QgY3VycmVudFBhdGggPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XHJcbiAgICAgIGNvbnN0IGxpbmtQYXRoID0gdGhpcy5wYXRobmFtZTtcclxuXHJcbiAgICAgIGlmIChsaW5rUGF0aCAhPT0gJycgJiYgbGlua1BhdGggIT09IGN1cnJlbnRQYXRoKSB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gbGlua1BhdGggKyB0YXJnZXRJZDtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBoZWFkZXJIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpLm9mZnNldEhlaWdodCA6IDA7XHJcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRIZWlnaHQgPSB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuXHJcbiAgICAgICAgY29uc3QgZWxlbWVudFBvc2l0aW9uID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0UG9zaXRpb24gPSBlbGVtZW50UG9zaXRpb24gKyB3aW5kb3cucGFnZVlPZmZzZXQgLSAod2luZG93SGVpZ2h0IC8gMikgKyAoZWxlbWVudEhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgdG9wOiBvZmZzZXRQb3NpdGlvbixcclxuICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0YXJnZXRJZCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XHJcbiAgY29uc3QgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gIGlmIChoYXNoKSB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGFzaCk7XHJcbiAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJykgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKS5vZmZzZXRIZWlnaHQgOiAwO1xyXG4gICAgICAgIGNvbnN0IHlPZmZzZXQgPSAtaGVhZGVySGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBlbGVtZW50UG9zaXRpb24gPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcclxuICAgICAgICBjb25zdCBvZmZzZXRQb3NpdGlvbiA9IGVsZW1lbnRQb3NpdGlvbiArIHdpbmRvdy5wYWdlWU9mZnNldCArIHlPZmZzZXQ7XHJcblxyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICB0b3A6IG9mZnNldFBvc2l0aW9uLFxyXG4gICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0sIDUwMCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbmNsYXNzIEN1c3RvbVNlbGVjdCB7XHJcbiAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgIHRoaXMuaGVhZGVyID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXItaXRlbS1oZWFkZXInKTtcclxuICAgIHRoaXMuZHJvcGRvd24gPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmZpbHRlci1pdGVtLWRyb3Bkb3duJyk7XHJcbiAgICB0aGlzLm9wdGlvbnMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmZpbHRlci1pdGVtLW9wdGlvbicpO1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIHRoaXMuc2V0SW5pdGlhbFZhbHVlKCk7XHJcbiAgfVxyXG5cclxuICBiaW5kRXZlbnRzKCkge1xyXG4gICAgdGhpcy5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLnRvZ2dsZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuICAgICAgb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKG9wdGlvbik7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCkpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZSgpIHtcclxuICAgIHRoaXMuaXNPcGVuID8gdGhpcy5jbG9zZSgpIDogdGhpcy5vcGVuKCk7XHJcbiAgfVxyXG5cclxuICBvcGVuKCkge1xyXG4gICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpIHtcclxuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNlbGVjdE9wdGlvbihvcHRpb24pIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IG9wdGlvbi50ZXh0Q29udGVudDtcclxuICAgIHRoaXMuaGVhZGVyLnRleHRDb250ZW50ID0gc2VsZWN0ZWRUZXh0O1xyXG5cclxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdzZWxlY3QtY2hhbmdlJywge1xyXG4gICAgICBkZXRhaWw6IHsgdmFsdWU6IHNlbGVjdGVkVGV4dCwgZWxlbWVudDogb3B0aW9uIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5jb250YWluZXIuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgfVxyXG5cclxuICBzZXRJbml0aWFsVmFsdWUoKSB7XHJcbiAgICBjb25zdCBmaXJzdE9wdGlvbiA9IHRoaXMub3B0aW9uc1swXTtcclxuICAgIGlmIChmaXJzdE9wdGlvbikge1xyXG4gICAgICB0aGlzLnNlbGVjdE9wdGlvbihmaXJzdE9wdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRWYWx1ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmhlYWRlci50ZXh0Q29udGVudDtcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICBjb25zdCBmaWx0ZXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItaXRlbScpO1xyXG5cclxuICBmaWx0ZXJJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgbmV3IEN1c3RvbVNlbGVjdChpdGVtKTtcclxuICB9KTtcclxufSk7XHJcblxyXG5cclxudmFyIHN3aXBlcjMgPSBuZXcgU3dpcGVyKFwiLmdhbGxlcnktc2xpZGVyLXRodW1ic1wiLCB7XHJcbiAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICBzbGlkZXNQZXJWaWV3OiBcImF1dG9cIixcclxuICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG59KTtcclxuXHJcbnZhciBzd2lwZXI0ID0gbmV3IFN3aXBlcihcIi5nYWxsZXJ5LXNsaWRlci1tYWluXCIsIHtcclxuICBsb29wOiB0cnVlLFxyXG4gIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgZWZmZWN0OiBcImZhZGVcIixcclxuICBuYXZpZ2F0aW9uOiB7XHJcbiAgICBuZXh0RWw6IFwiLmdhbGxlcnktc2xpZGVyLW1haW4gLnN3aXBlci1idXR0b24tbmV4dFwiLFxyXG4gICAgcHJldkVsOiBcIi5nYWxsZXJ5LXNsaWRlci1tYWluIC5zd2lwZXItYnV0dG9uLXByZXZcIixcclxuICB9LFxyXG4gIHRodW1iczoge1xyXG4gICAgc3dpcGVyOiBzd2lwZXIzLFxyXG4gIH0sXHJcbn0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGNoZWNrVmlzaWJpbGl0eSgpIHtcclxuICBjb25zdCBibG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW5pbWF0ZS1ibG9jaycpO1xyXG5cclxuICBibG9ja3MuZm9yRWFjaChibG9jayA9PiB7XHJcbiAgICBpZiAoYmxvY2suaGFzQXR0cmlidXRlKCdkYXRhLWFuaW1hdGVkJykpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlY3QgPSBibG9jay5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvLyDQn9GA0L7QstC10YDRj9C10LwsINC90LDRhdC+0LTQuNGC0YHRjyDQu9C4INCx0LvQvtC6INCyINGE0YPRgtC10YDQtVxyXG4gICAgY29uc3QgaXNJbkZvb3RlciA9IGJsb2NrLmNsb3Nlc3QoJ2Zvb3RlcicpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKGlzSW5Gb290ZXIgfHwgd2luZG93LmlubmVyV2lkdGggPCA3NjgpID8gMCA6IDA7XHJcblxyXG4gICAgY29uc3QgaXNWaXNpYmxlID0gcmVjdC50b3AgPD0gd2luZG93SGVpZ2h0IC0gb2Zmc2V0ICYmIHJlY3QuYm90dG9tID49IDA7XHJcblxyXG4gICAgaWYgKGlzVmlzaWJsZSkge1xyXG4gICAgICBjb25zdCBkZWxheSA9IGJsb2NrLmdldEF0dHJpYnV0ZSgnZGF0YS1kZWxheScpIHx8IDA7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGJsb2NrLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGVkJyk7XHJcbiAgICAgICAgYmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLWFuaW1hdGVkJywgJ3RydWUnKTtcclxuICAgICAgfSwgcGFyc2VJbnQoZGVsYXkpKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tBbGxCbG9ja3MoKSB7XHJcbiAgY29uc3QgYmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFuaW1hdGUtYmxvY2snKTtcclxuXHJcbiAgYmxvY2tzLmZvckVhY2goYmxvY2sgPT4ge1xyXG4gICAgaWYgKGJsb2NrLmhhc0F0dHJpYnV0ZSgnZGF0YS1hbmltYXRlZCcpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZWN0ID0gYmxvY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgaXNJbkZvb3RlciA9IGJsb2NrLmNsb3Nlc3QoJ2Zvb3RlcicpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKGlzSW5Gb290ZXIgfHwgd2luZG93LmlubmVyV2lkdGggPCA3NjgpID8gMCA6IDA7XHJcblxyXG4gICAgaWYgKHJlY3QudG9wIDw9IHdpbmRvd0hlaWdodCAtIG9mZnNldCAmJiByZWN0LmJvdHRvbSA+PSAwKSB7XHJcbiAgICAgIGNvbnN0IGRlbGF5ID0gYmxvY2suZ2V0QXR0cmlidXRlKCdkYXRhLWRlbGF5JykgfHwgMDtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgYmxvY2suY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZWQnKTtcclxuICAgICAgICBibG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtYW5pbWF0ZWQnLCAndHJ1ZScpO1xyXG4gICAgICB9LCBwYXJzZUludChkZWxheSkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xyXG4gIGNoZWNrVmlzaWJpbGl0eSgpO1xyXG4gIHNldFRpbWVvdXQoY2hlY2tBbGxCbG9ja3MsIDUwMCk7XHJcbn0pO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrVmlzaWJpbGl0eSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgc2V0VGltZW91dChjaGVja0FsbEJsb2NrcywgMTAwKTtcclxufSk7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJcbmltcG9ydCAnLi9zY3JpcHQnO1xuIl0sIm5hbWVzIjpbImhlYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRvZ2dsZVNjcm9sbGVkQ2xhc3MiLCJ3aW5kb3ciLCJzY3JvbGxZIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN3aXBlcjEiLCJTd2lwZXIiLCJvYnNlcnZlciIsIm9ic2VydmVQYXJlbnRzIiwib2JzZXJ2ZVNsaWRlQ2hpbGRyZW4iLCJ3YXRjaFNsaWRlc1Byb2dyZXNzIiwibmF2aWdhdGlvbiIsIm5leHRFbCIsInByZXZFbCIsImJyZWFrcG9pbnRzIiwic2xpZGVzUGVyVmlldyIsInNwYWNlQmV0d2VlbiIsInN3aXBlcjIiLCJDdXN0b21WaWRlb1BsYXllciIsImNvbnN0cnVjdG9yIiwiY29udGFpbmVyIiwidmlkZW8iLCJwbGF5QnV0dG9uIiwiaW5pdCIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImJpbmRFdmVudHMiLCJlIiwicHJldmVudERlZmF1bHQiLCJwbGF5Iiwib25QbGF5Iiwib25QYXVzZSIsIm9uRW5kZWQiLCJ0b2dnbGVQbGF5IiwicGF1c2VkIiwiY2F0Y2giLCJlcnJvciIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJwYXVzZSIsInZpZGVvQ29udGFpbmVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwibW9kYWxCdXR0b25zIiwib3ZlcmxheSIsImNsb3NlQnV0dG9ucyIsImN1cnJlbnRPcGVuTW9kYWwiLCJvcGVuTW9kYWwiLCJtb2RhbEJ0biIsIlByb21pc2UiLCJyZXNvbHZlIiwibW9kYWxJZCIsImdldEF0dHJpYnV0ZSIsIm1vZGFsRWxlbSIsImNsb3NlTW9kYWxEaXJlY3RseSIsImNsb3NlTW9kYWwiLCJjbG9zZUJ0biIsIm1vZGFsIiwiY2xvc2VzdCIsImJhY2tCdXR0b25zIiwiYmFja0J0biIsIml0ZW0iLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwibW9iaWxlTWVudUJ0biIsImhlYWRlck5hdiIsImJvZHkiLCJ0b2dnbGVNZW51IiwiaXNNZW51T3BlbiIsInRvZ2dsZSIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwiY29udGFpbnMiLCJpc0NsaWNrSW5zaWRlTWVudSIsImlzQ2xpY2tPbkJ1dHRvbiIsImNsb3NlTWVudSIsImtleSIsImlubmVyV2lkdGgiLCJtZW51SXRlbXMiLCJzZXR1cE1lbnUiLCJpc01vYmlsZSIsInN1Yk1lbnUiLCJsaW5rIiwibWF4SGVpZ2h0IiwiY3NzVGV4dCIsIm5ld0xpbmsiLCJjbG9uZU5vZGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwiY2xpY2tDb3VudCIsImNsaWNrVGltZXIiLCJ3YXNBY3RpdmUiLCJvdGhlciIsIm90aGVyU3ViIiwic2Nyb2xsSGVpZ2h0IiwiY2xlYXJUaW1lb3V0IiwicmVzaXplVGltZXIiLCJhbmNob3JMaW5rcyIsInRhcmdldElkIiwidGFyZ2V0RWxlbWVudCIsImN1cnJlbnRQYXRoIiwibG9jYXRpb24iLCJwYXRobmFtZSIsImxpbmtQYXRoIiwidXJsIiwiaHJlZiIsImhlYWRlckhlaWdodCIsIm9mZnNldEhlaWdodCIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0IiwiZWxlbWVudEhlaWdodCIsImVsZW1lbnRQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsIm9mZnNldFBvc2l0aW9uIiwicGFnZVlPZmZzZXQiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsImhhc2giLCJ5T2Zmc2V0IiwiQ3VzdG9tU2VsZWN0IiwiZHJvcGRvd24iLCJvcHRpb25zIiwiaXNPcGVuIiwic2V0SW5pdGlhbFZhbHVlIiwib3B0aW9uIiwic2VsZWN0T3B0aW9uIiwiY2xvc2UiLCJvcGVuIiwic2VsZWN0ZWRUZXh0IiwidGV4dENvbnRlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsInZhbHVlIiwiZWxlbWVudCIsImRpc3BhdGNoRXZlbnQiLCJmaXJzdE9wdGlvbiIsImdldFZhbHVlIiwiZmlsdGVySXRlbXMiLCJzd2lwZXIzIiwic3dpcGVyNCIsImxvb3AiLCJlZmZlY3QiLCJ0aHVtYnMiLCJzd2lwZXIiLCJjaGVja1Zpc2liaWxpdHkiLCJibG9ja3MiLCJibG9jayIsImhhc0F0dHJpYnV0ZSIsInJlY3QiLCJpc0luRm9vdGVyIiwib2Zmc2V0IiwiaXNWaXNpYmxlIiwiYm90dG9tIiwiZGVsYXkiLCJwYXJzZUludCIsImNoZWNrQWxsQmxvY2tzIl0sInNvdXJjZVJvb3QiOiIifQ==