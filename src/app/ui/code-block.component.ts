import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'prismjs';
import 'prismjs/components/prism-typescript';

@Component({
  selector: 'dotnet-client-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <pre>
      <code class="hljs language-typescript" *ngIf="codeToShow as html" [innerHTML]="html"></code>
    </pre>
  `,
  styles: `
    pre {
      margin: 0;
    }
  `,
})
export class CodeBlockComponent implements AfterViewInit {
  private readonly domSanitizer = inject(DomSanitizer);

  codeToShow: SafeHtml | null = null;

  @Input()
  public set codeText(v: string) {
    this.codeToShow = v ? this.domSanitizer.bypassSecurityTrustHtml(v) : null;
    (window as any).Prism?.highlightAll();
  }

  ngAfterViewInit(): void {
    (window as any).Prism?.highlightAll();
  }
}
