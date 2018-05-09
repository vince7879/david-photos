import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRecent]'
})
export class RecentDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  span = this.renderer.createElement('span');
  jaRecent = this.renderer.createText('新鋭');
  enRecent = this.renderer.createText('RECENT');

  @HostListener('mouseenter')
  onMouseOver() {
    // console.log(this.elRef.nativeElement.childNodes[1].innerHTML);
    this.elRef.nativeElement.className = 'orange';
    this.renderer.removeChild(this.elRef.nativeElement, this.elRef.nativeElement.childNodes[1]);
    this.renderer.removeChild(this.span, this.jaRecent);
    this.renderer.appendChild(this.span, this.enRecent);
    this.renderer.appendChild(this.elRef.nativeElement, this.span);
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    console.log(this.elRef);
    this.elRef.nativeElement.className = 'white';
    this.renderer.removeChild(this.elRef.nativeElement, this.elRef.nativeElement.childNodes[1]);
    this.renderer.removeChild(this.span, this.enRecent);
    this.renderer.appendChild(this.span, this.jaRecent);
    this.renderer.appendChild(this.elRef.nativeElement, this.span);
  }

}
