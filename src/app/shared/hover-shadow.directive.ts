import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverShadow]'
})
export class HoverShadowDirective {
  @Input() hoverScale: number = 1.03;
  @Input() hoverShadow: string = '0 4px 12px rgba(0,0,0,0.2)';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.2s ease-in-out');
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.hoverScale})`);
    this.renderer.setStyle(this.el.nativeElement, 'boxShadow', this.hoverShadow);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
    this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
  }
}