import {
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { FilterService } from './filter.service';
import { InputTemplateDirective } from './input-template.directive';
import { InterpolationService } from './interpolation.service';

export const TJ_AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TjAutocompleteComponent),
    multi: true
};

@Component({
    selector: 'tj-autocomplete',
    templateUrl: './tj-autocomplete.component.html',    
    providers: [TJ_AUTOCOMPLETE_VALUE_ACCESSOR, InterpolationService, FilterService]
})
export class TjAutocompleteComponent implements ControlValueAccessor {

    @Output() completeMethod: EventEmitter<any> = new EventEmitter();

    @Input()
    set suggestions(data: Object[]) {
        this.filterService.setSupersetData(data);
    }
    get suggestions() {
        return this.filterService.suggestions;
    }

    @Input()
    set field(field: string) {
        this.filterService.fieldName = field;
    }
    get field(): string {
        if (this.hasRandomField()) {
            return this.randomFieldName;
        }
        return this.filterService.fieldName;
    }

    @Input()
    set filter(isActive: boolean) {
        this.filterService.isActive = typeof (isActive) == typeof (true) ? isActive : `${isActive}` == 'true';
    }
    get filter(): boolean {
        return this.filterService.isActive;
    }

    @Input('filter-key')
    set filterKey(fieldKeyName: string) {
        this.filterService.fieldKeyName = fieldKeyName;
    }
    get filterKey(): string {
        return this.filterService.fieldKeyName;
    }

    @Input() size: number;
    @Input() placeholder: string
    @Input() minLength: number = 3;
    @Input() maxLength: number;
    @Input() minKeyLength: number;
    @Input() disabled: boolean;
    @Input() required: boolean;

    @ContentChildren(InputTemplateDirective, { read: TemplateRef }) private inputDirectiveTemplates: QueryList<any>
    @ContentChildren(TemplateRef) private allTemplates: QueryList<any>
    private inputTemplate: TemplateRef<any>;
    private suggestionsTemplate: TemplateRef<any>;

    private onModelChange: Function = () => { };
    private onModelTouched: Function = () => { };

    private innerMinLength: number;
    private innerValue: any;
    private randomFieldName: string;

    get value(): any {
        return this.innerValue;
    };

    set value(v: any) {
        this.writeValue(v);
    }

    constructor(
        private autocompleteService: InterpolationService,
        private filterService: FilterService) { }

    ngAfterContentInit() {
        this.initTemplates();
        this.innerMinLength = this.getMinLength();
    }

    ngAfterViewInit() {
        this.autocompleteService.initialize();
    }

    ngOnDestroy() {
        this.autocompleteService.ngOnDestroy();
    }

    onCompleteMethod(event) {
        if (!this.hasMinLengthCondition(event.query)) { return; }
        if (this.filterService.canFilter(event.query)) {
            this.filterService.filter(event.query);
            return;
        }
        this.filterService.setPreviousQuery(event.query);
        this.completeMethod.emit(event);
    }

    async writeValue(value: any) {
        if (this.innerValue === value) { return; }
        if (this.shouldUseInterpolation(value)) {
            if (this.isRandomFieldRequired()) {
                this.defineRandomFieldName(value);
            }
            if (this.hasRandomField()) {
                value[this.randomFieldName] = await this.autocompleteService.interpolationToString(this.inputTemplate, value);
                this.value = (Object.assign({}, value));
                return;
            }
        }
        this.innerValue = value;
        this.onModelChange(this.innerValue);
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    setDisabledState(val: boolean): void {
        this.disabled = val;
    }

    onBlur(event) {
        //this.filterService.clean();
    }

    onClear(event) {
        this.filterService.clean();
    }

    onSelect(value) {
        this.filterService.clean();
    }

    private defineRandomFieldName(obj: object) {
        if (!this.isRandomFieldRequired()) { return; }
        let randomName: string;
        do {
            randomName = Math.random().toString(36).substring(7);
        } while (obj[randomName] != null);
        this.randomFieldName = randomName;
    }

    private hasRandomField() {
        return this.randomFieldName != null
            && this.inputTemplate != null;
    }

    private isRandomFieldRequired() {
        return this.randomFieldName == null
            && this.inputTemplate != null;
    }

    private shouldUseInterpolation(value: any) {
        return this.inputTemplate != null
            && value instanceof Object
            && value[this.randomFieldName] == null;
    }

    private initTemplates() {
        /**
         * Uma template com diretiva: funciona para os dois casos
         * Duas templates, uma com diretiva e outra sem: funciona uma para cada caso
         */
        if (this.inputDirectiveTemplates.length == 0
            && this.allTemplates.length == 0) {
            return;
        }
        if (this.inputDirectiveTemplates.length > 0) {
            this.inputTemplate = this.inputDirectiveTemplates.first;
        }
        if (this.allTemplates.length == this.inputDirectiveTemplates.length) {
            this.suggestionsTemplate = this.inputTemplate;
        }
        if (this.allTemplates.length > this.inputDirectiveTemplates.length) {
            this.suggestionsTemplate = this.allTemplates.filter(
                item => this.inputDirectiveTemplates.find(i => i === item) == null)[0];
        }
    }

    private getMinLength(): number {
        return this.minKeyLength == null ? this.minLength : this.minKeyLength;
    }

    private hasMinLengthCondition(query): boolean {
        if (this.minKeyLength == null) { return true; }
        if (!isNaN(query)) {
            if (query.length >= this.minKeyLength) {
                return true;
            }
        } else {
            if (query.length >= this.minLength) {
                return true;
            }
            this.suggestions = [];//remove o icone de carregamento do input
        }
        return false;
    }
}
