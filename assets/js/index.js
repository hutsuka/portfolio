gsap.registerPlugin(ScrollTrigger);



const size = 30;

function setup() {
  const mosCanvas = document.querySelector('#mos-canvas');
  const canvas = createCanvas(mosCanvas.offsetWidth, mosCanvas.offsetHeight - 1);
  canvas.parent(mosCanvas);
  noStroke();
}
function draw() {
  const xn = ceil(width / size);
  const yn = ceil(height / size);
  background(255);

  for (let y = 0; y < yn; y++) {
    for (let x = 0; x < xn; x++) {
      const v = noise(x / 20, y / 20, frameCount / 200);
      const colorValue = v * 125 + 130;
      const nextX = (x + 1) % xn;
      const nextY = (y + 1) % yn;
      const nextColorValue = noise(nextX / 20, nextY / 20, frameCount / 200) * 55 + 200;
      const c = lerpColor(color(colorValue), color(nextColorValue), 0.5);

      fill(c);
      rect(x * size, y * size, size, size);
    }
  }
}
function windowResized() {
  const canvasContainer = document.querySelector('.container');
  resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
}

document.addEventListener("DOMContentLoaded", () => {
  const split = document.querySelectorAll('.split');

  function isHoverable() {
      return window.matchMedia('(hover: hover)').matches;
  }

  split.forEach(link => {
      const text = link.textContent;
      link.textContent = '';

      [...text].forEach((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.className = 'char';
          link.appendChild(span);
      });

      link.addEventListener('mouseenter', function () {
          if (!isHoverable()) return;

          const chars = this.querySelectorAll('.char');
          const delay = 70;
          const animationType = this.dataset.animation || 'slideColor';

          chars.forEach((char, index) => {
              setTimeout(() => {
                  char.style.animation = `${animationType} 0.1s forwards`;
              }, index * delay);
          });
      });

      link.addEventListener('mouseleave', function () {
          const chars = this.querySelectorAll('.char');
          chars.forEach(char => {
              char.style.animation = '';
          });
      });
  });



document.querySelectorAll('.js-Squiggly').forEach((element) => {
  const SquigglyPath = element.querySelector('.SquigglyPath');
  let enterTimeout;

  element.addEventListener('mouseenter', () => {
      enterTimeout = setTimeout(() => {
          gsap.killTweensOf(SquigglyPath);
          gsap.set(SquigglyPath, {
              attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" }
          });
          gsap.to(SquigglyPath, {
              attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
              ease: "power4.in",
              duration: 0.3
          });
          gsap.to(SquigglyPath, {
              attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
              ease: "power2",
              duration: 0.3,
              delay: 0.3,
          });
      }, 200);
  });

  element.addEventListener('mouseleave', () => {
      clearTimeout(enterTimeout);
      gsap.killTweensOf(SquigglyPath);
      gsap.set(SquigglyPath, {
          attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" }
      });
      gsap.to(SquigglyPath, {
          attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
          ease: "power4.in",
          duration: 0.3
      });
      gsap.to(SquigglyPath, {
          attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
          ease: "power2",
          delay: 0.3,
      });
  });
});



const scroller = document.querySelector('.app-wrapper');
const nav = document.querySelector('.js-nav');
const hamburger = document.querySelector('.js-hamburger');
const SquigglyPath = document.querySelector('.header-nav-SquigglyPath');
const navLinks = document.querySelectorAll('.header-nav ul li a');

gsap.set(SquigglyPath, {
  attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
});
gsap.set(nav, { top: '-100vh' });

hamburger.addEventListener('click', () => {
  const isActive = nav.classList.toggle('active');
  hamburger.classList.toggle('active');

  if (isActive) {
    gsap.to(nav, {
      top: 0,
      duration: 1.2,
      ease: "power4.inOut",
    });

    gsap.to(SquigglyPath, {
      attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
      ease: "power4.in",
      duration: 0.6,
      onComplete: () => {
        gsap.to(SquigglyPath, {
          attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
          ease: "power2",
          duration: 0.8,
        });
      },
    });
  } else {
    closeNav();
  }
});

function closeNav() {
  nav.classList.remove('active');
  hamburger.classList.remove('active');

  gsap.to(nav, {
    top: '-100vh',
    duration: 0.5,
    ease: "power4.inOut",
  });

  gsap.to(SquigglyPath, {
    attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
    ease: "power2.in",
    duration: 0.5,
    onComplete: () => {
      gsap.to(SquigglyPath, {
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
        ease: "power4",
        duration: 0.5,
      });
    },
  });
}


navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
    scroller.scrollTo({
    top: target.offsetTop - scroller.offsetTop,
        });
      }
    }

    closeNav();
  });
});





const loading = document.querySelector(".js-loading");
const mainWorks = document.querySelector(".js-main__works");
const gooTitle = document.querySelector('.goo-title');
const blurAnimation = document.getElementById('blurAnimation');

  setTimeout(() => {
  loading.classList.add("up-hidden");

  setTimeout(() => {
  mainWorks.classList.add("show");
  blurAnimation.beginElement();

    setTimeout(() => {
    gooTitle.style.filter = 'none';
       }, 700);
      }, 100);
    }, 2500);



  const blurAnimationAbout = document.getElementById('blurAnimationAbout');

  setTimeout(() => {
    blurAnimationAbout.beginElement();

  setTimeout(() => {
    gooTitle.style.filter = 'none';
    }, 900);
   }, 100);




  const blur = document.getElementById("js-blur");
  if (blur) {
    setTimeout(() => {
      blur.classList.add("show");
    }, 100);
  }


  const boxes = document.querySelectorAll('.works__box');


  boxes.forEach((box) => {
    ScrollTrigger.create({
      trigger: box,
      start: 'top 80%',
      end: 'bottom 60%',
      toggleClass: {
      targets: box,
      className: 'show'
     },
      once: true,
      scroller: scroller,
      invalidateOnRefresh: true,

    });
  });


  gsap.utils.toArray('.line').forEach((line) => {
    gsap.to(line, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      scrollTrigger: {
      trigger: line,
      start: "top 80%",
      once: true,
      scroller: scroller,
      },
    });
  });


  const lenis = new Lenis({
    wrapper: document.querySelector('.app-wrapper'),
    content: document.querySelector('.app-wrapper'),
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.4,
    touchMultiplier: 1.3,
    smooth: true,
    smoothTouch: true,
    touchMultiplier: 1,

  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);


gsap.to('.main-set__fixed', {
  scrollTrigger: {
      trigger: '.main-set__fixed',
      start: 'top top',
      end: 'bottom bottom',
      endTrigger: '.main__content',
      scroller: '.app-wrapper',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
  }

});

window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});



const contentData = [
  { h3: "IZUKI-lumber-yard", p: "制作範囲：coding, design" },
  { h3: "WIKA-ECsite", p: "制作範囲：coding, design" },
  { h3: "hutsuka's Portfolio", p: "制作範囲：coding, design" },
  { h3: "Senkyu-University", p: "制作範囲：coding, design" },
  { h3: "Banner", p: "制作範囲：design" }
];

const imgBoxes = document.querySelectorAll('.js-scroll-img-box');
const blurBox = document.querySelector('#blur-box');
const blurTitle = blurBox.querySelector('.js-blur-title');
const blurText = blurBox.querySelector('.js-blur-text');

imgBoxes.forEach((box, index) => {
  ScrollTrigger.create({
    trigger: box,
    scroller: '.app-wrapper',
    start: 'top center',
    end: 'bottom center',
    onEnter: () => updateBlurBoxContent(index),
    onEnterBack: () => updateBlurBoxContent(index),
  });
});

function updateBlurBoxContent(index) {
  const data = contentData[index];
  blurTitle.textContent = data.h3;
  blurText.textContent = data.p;
}




    function init() {
        const gooeyElements = document.querySelectorAll('[data-filter]');
        const scroller = document.querySelector('.app-wrapper');
        gooeyElements.forEach((element) => {
            const filterId = element.getAttribute('data-filter');
            const blurFilter = document.querySelector(`#${filterId} feGaussianBlur`);


            element.style.filter = `url(#${filterId})`;
            gsap.set(element, { opacity: 0 });
            let blurValue = { stdDeviation: 30 };

            const tl = gsap.timeline({
                defaults: { duration: 1.5, ease: "expo" },
                scrollTrigger: {
                  trigger: element,
                  start: "center bottom",
                  scroller: scroller,
                },
                onUpdate: () => {
                 blurFilter.setAttribute("stdDeviation", blurValue.stdDeviation);
                },
            });

            tl.to(blurValue, { stdDeviation: 0 }, 0)
              .to(element, { opacity: 1 }, 0)
              .add(() => {
                  setTimeout(() => {
                      element.style.filter = 'none';
                  }, 700);},0);
        });
    }

    init();


});

window.addEventListener("orientationchange", function() {
  location.reload();
});


