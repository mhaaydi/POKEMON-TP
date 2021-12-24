import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pkmnBorderCard]'
})
export class BorderCardDirective{

    private defaultColor : string = '#009688';
    private defaultHeight: number = 200;
    private initialColor: string = '#F5F5F5';

    constructor(private el: ElementRef){
      this.setBorder(this.initialColor);
      this.setHeight(this.defaultHeight);
      this.borderColor = '#009688';
    }

    @Input('pkmnBorderCard') borderColor : string;

    @HostListener('mouseenter') onMouseEnter(){
      this.setBorder(this.borderColor || this.defaultColor);
    }

    @HostListener('mouseleave') onMouseLeave(){
      this.setBorder(this.initialColor);
    }

    private setBorder(color: string){
      let border = 'solid 4px ' + color;
      this.el.nativeElement.style.border = border;
    }

    private setHeight(height: number){
      this.el.nativeElement.style.height = height + 'px';
    }

}