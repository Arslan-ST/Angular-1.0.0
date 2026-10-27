import { Component, signal, ElementRef, viewChild, computed } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.html',
  styleUrl: './slider.css',
})
export class Slider {
  slides = signal<string[]>(['https://www.exportleftovers.com/cdn/shop/files/Woman_posing_in_camo_jacket_4K_20261012162724.jpg?crop=center&height=600&v=1791804705&width=1800'
    , 'https://www.exportleftovers.com/cdn/shop/files/zoom_out_4K_20261017151729_accecc34-8090-458d-acb7-4e61418daafe.jpg?crop=center&height=600&v=1792737631&width=1800',
    'https://www.exportleftovers.com/cdn/shop/files/Generated-Image-October-20_-2026---10_12AM_f2d094a4-a67b-40bb-978f-4bd9222f0795.jpg?crop=center&height=630&v=1792737364&width=1890'
  ]);
  posts = computed(() => {
    const s = this.slides();          // read the source signal, not posts
    return s.length < 2 ? s : [s[s.length - 1], ...s, s[0]];
  });
  slider = viewChild<ElementRef<HTMLDivElement>>('slider');
  isDragging = signal(true);
  scrollStart = 0;
  startX = 0;
  moveX = 0;
  startY = 0;
  isDown = false;
  ngAfterViewInit() {
    const el = this.slider()?.nativeElement;
    if (!el) return;
    el.scrollLeft = el.offsetWidth;

    console.log('After assignment:', el.scrollLeft);
  }

  mouseDown(e: MouseEvent) {
    e.preventDefault();
    this.isDown = true;
    const sliderElement = this.slider()?.nativeElement;
    if (sliderElement) {
      this.scrollStart = sliderElement.scrollLeft;
      this.startX = e.clientX;
    }
  }
  mouseUp(e: MouseEvent) {
    this.isDown = false;
    this.isDragging.set(false)
    const slider = this.slider()?.nativeElement;
    if (slider) {
      const scrollLeft = slider.scrollLeft;
      const endX = e.pageX;
      const distance = endX - this.startX;
      const slideWidth = slider.offsetWidth
      let index;
      if (Math.abs(distance) > slideWidth / 4) {
        if (distance < 0) {
          index = Math.floor(scrollLeft / slideWidth) + 1;
        } else {
          index = Math.ceil(scrollLeft / slideWidth) - 1;
        }
      } else {
        index = Math.round(scrollLeft / slideWidth);
      }

      slider.scrollTo({
        left: index * slideWidth,
        behavior: "smooth",
      });
    }
  }
  mouseMove(e: MouseEvent) {
    e.preventDefault();
    if (!this.isDown) return;
    this.isDragging.set(true)
    const sliderElement = this.slider()?.nativeElement;
    let x = e.pageX;
    if (sliderElement) {
      sliderElement.scrollLeft = this.scrollStart - (x - this.startX)
    }
  }

}
