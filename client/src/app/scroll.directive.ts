import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scrollToTop();
    console.log('scroll')
  }

  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

