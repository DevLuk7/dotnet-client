import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  booleanAttribute,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'dotnet-client-code-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `<div #container></div>`,
  styles: `
    :host {
      display: block;
      height: 100%;
      width: 100%;
    }
    div {
      height: 100%;
      width: 100%;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true,
    },
  ],
})
export class CodeEditorComponent
  implements AfterViewInit, ControlValueAccessor
{
  @Input({ transform: booleanAttribute }) readOnly = false;
  @ViewChild('container') container!: ElementRef;

  private codeText = '';
  private editor!: monaco.editor.IStandaloneCodeEditor;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  ngAfterViewInit() {
    this.editor = monaco.editor.create(this.container.nativeElement, {
      value: [this.codeText].join('\n'),
      language: 'typescript',
      theme: 'hc-black',
      readOnly: this.readOnly,
    });

    this.editor.onDidChangeModelContent(() => {
      this.codeText = this.editor.getValue();
      this.onChange(this.codeText);
    });
  }

  writeValue(value: string): void {
    this.codeText = value;
    this.editor?.setValue(value);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
