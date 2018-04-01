import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: "interpolation-container",
  template: '<ng-container #target></ng-container>',
})
export class InterpolationComponent {
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
}

@Injectable()
export class InterpolationService implements OnDestroy {

  private componentRef: ComponentRef<InterpolationComponent>;
  private isInitialized: boolean = false;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }

  ngAfterViewInit() {
    this.initialize();
  }

  initialize() {
    if (this.isInitialized) { return; }
    this.componentRef = this.resolver.resolveComponentFactory(InterpolationComponent).create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
    this.isInitialized = true;
  }

  ngOnDestroy(): void {
    if (!this.isInitialized) { return; }
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.isInitialized = false;
  }

  interpolationToString(template: TemplateRef<any>, context: Object): Promise<string> {
    if (!this.isInitialized) {
      this.initialize();
    }
    return this.generateDisplayValue(template, context);
  }

  private async generateDisplayValue(template: TemplateRef<any>, context: Object) {
    let viewRef: EmbeddedViewRef<HTMLElement> = this.componentRef.instance.target.createEmbeddedView(template, { $implicit: context }, 0);
    let element = viewRef.rootNodes[0];
    let text;
    while ((text = element.wholeText.trim()) == "") {
      await this.delay(3);
    }
    viewRef.destroy();
    return text;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

