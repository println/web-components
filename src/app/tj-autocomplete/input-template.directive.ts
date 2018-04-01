import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[inputTemplate]'
})
export class InputTemplateDirective {

  constructor(public template: TemplateRef<any>) {}

}
