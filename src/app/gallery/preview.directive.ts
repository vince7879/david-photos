import { Directive, ElementRef, HostListener, Renderer2  } from '@angular/core';

@Directive({
  selector: '[appPreview]'
})
export class PreviewDirective {

  title: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  // img = this.renderer.createElement('img');

  // @HostListener('mouseover')
  // onMouseOver() {
  //   // console.log(this.elRef);
  //   this.renderer.setAttribute(this.img, 'src', this.elRef.nativeElement.src);
  //   this.renderer.setAttribute(this.img, 'id', 'preview');
  //   this.renderer.setStyle(this.img, 'display', 'block');
  //   this.renderer.setStyle(this.img, 'top', '70px');
  //   this.renderer.setStyle(this.img, 'left', '900px');
  //   this.renderer.appendChild(this.elRef.nativeElement.offsetParent, this.img);
  // }
  // @HostListener('mouseleave')
  // onMouseLeave() {
  //     this.renderer.removeChild(this.elRef.nativeElement.offsetParent, this.img);
  // }
  // @HostListener('click')
  // onClick() {
  //     this.renderer.removeChild(this.elRef.nativeElement.offsetParent, this.img);
  // }

}
