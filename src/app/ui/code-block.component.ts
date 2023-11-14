import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'prismjs';

@Component({
  selector: 'dotnet-client-code-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <pre>
      <code class="hljs language-ts" *ngIf="codeToShow as html">
          {{ html }}
      </code>
    </pre>
  `,
  styles: `
    pre {
      margin: 0;
    }
  `,
})
export class CodeBlockComponent {
  private readonly domSanitizer = inject(DomSanitizer);

  codeToShow: SafeHtml | null = null;

  @Input()
  public set codeText(v: string) {
    this.codeToShow = v ? this.domSanitizer.bypassSecurityTrustHtml(v) : null;
  }
}
