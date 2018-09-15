(() => {
  class Accordiong {
    constructor(container, time) {
      this.container = container;
      this.heading = this.container.querySelector('[data-accordion-heading]');
      this.content = this.container.querySelector('[data-accordion-content]');
      this.time = time;

      this.calculateHeight();

      this.status = this.container.dataset.accordion;

      this.heading.addEventListener('click', this.listener);
    }

    calculateHeight() {
      const node = this.content.cloneNode(true);
      node.setAttribute('style', 'position:fixed; left: -9999px; display: block');

      const body = document.querySelector('body');

      body.appendChild( node );

      this.height = node.offsetHeight;

      node.remove();

      return this;
    }

    listener = (ev) => {
      ev.preventDefault();

      this.toggle();

      return this;
    }

    getContentHeight() {
      return this.height;
    }

    collapse() {
      if(this.isStatus('collapse')) return;

      this.setStatus('collapse');

      return this;
    }

    show() {
      if(this.isStatus('show')) return;

      this.setStatus('show');

      return this;
    }

    toggle() {
      return this.isStatus('collapse') ? this.show() : this.collapse();
    }

    setStatus(name) {
      this.status = name;

      this.container.dataset.accordion = name;

      return;
    }


    isStatus(name) {
      const compare = (status) => name? status === name : status;

      switch (this.status) {
        case 'collapse':
          return compare('collapse');
        case 'collapsing':
          return compare('collapsing');
        case 'show':
          return compare('show');
      }
    }
  }

  const accordions = Array.from( document.querySelectorAll('[data-accordion]') ).map(a => new Accordiong(a, 350));
  console.log(accordions)
})()
