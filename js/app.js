/*  Type Writer  */
const typeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

// type method //
typeWriter.prototype.type = function () {
  // current index of words//
  const current = this.wordIndex % this.words.length;
  // full text of current word //
  const fullTxt = this.words[current];

  // check if isDeleting = true //
  if (this.isDeleting) {
    // Remove Char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // add a char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // inset var txt into txt-element (span) //
  this.txtElement.innerHTML = `<span class = 'txt'> ${this.txt} </span>`;

  // init type speed //
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed = typeSpeed / 2;
  }

  // if word is complete//
  if (!this.isDeleting && this.txt === fullTxt) {
    // make a pause at end //
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.wordIndex++;
    typeSpeed = 500;
  }
  this.txtElement;
  setTimeout(() => {
    this.type();
  }, typeSpeed);
};
// Init on dom load //
document.addEventListener('DOMContentLoaded', init);
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // init typewriter
  new typeWriter(txtElement, words, wait);
}

/*   Type Writer End */

/* Scrolling to top of page when arrow-up button is clicked */
function scrollingTop() {
  const hero = document.querySelector('.hero-section');
  const topArrow = document.querySelector('.fa-arrow-up');
  topArrow.onclick = () => {
    hero.scrollIntoView();
  };
}
scrollingTop();

/* Intro Section Animation */
function introAnimation() {
  const introBtn = document.querySelector('.intro-btn');
  introBtn.onclick = () => {
    const intro = document.querySelector('.intro');
    intro.style.transform = 'translateY(2000px)';
  };
}
introAnimation();

/* Animation On Scroll */
const animated = document.querySelectorAll('.animated');
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.animation = `opacity 4s forwards ease-out `;
    } else {
      entry.target.style.animation = 'none';
    }
  });
});

animated.forEach((anim) => {
  observer.observe(anim);
});

// /* Updating date automatically */
const dateValue = document.querySelector('.copyright span');
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
dateValue.innerHTML = currentYear;
console.log(currentDate);
