window.onload = () => {

    // listen to burger menu click
    document.querySelector('.navbar-burger.burger').addEventListener('click', ({ target: { classList } }) => {
        classList.toggle('is-active')
        document.getElementById('navbaritems').classList.toggle('is-active');
    })

    // animate hero banner form 
    const heroForm = document.querySelector('.container.hero-form');
    const heroBanner = document.querySelector('.hero.home');
    if (heroForm && heroBanner) new AnimateElements([heroForm, heroBanner]);

    const form = new Form();
    form.defaultDate(document.getElementById('checkin'));
    form.defaultDate(document.getElementById('checkout'), { plus: 1});
}

class Form {
    constructor() { }

    defaultDate(dateElm, opt = {plus: 0}) {
        let date = new Date();
        if(opt.plus) date = date.setDate(date.getDate() + 1);
        dateElm.valueAsNumber = date.valueOf();
    }
}

class AnimateElements {
    constructor(elements) {
        elements.forEach(this.appendAnimateCSS)
    }

    appendAnimateCSS(element) {
        element.classList.add('animate')
    }
}