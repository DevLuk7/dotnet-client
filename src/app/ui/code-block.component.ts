import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import 'prismjs';

@Component({
  selector: 'dotnet-client-code-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
})
export class CodeBlockComponent {
  codeText = `
    import { CommonModule } from '@angular/common';
    import { Component } from '@angular/core';

    @Component({
        selector: 'dotnet-client-code-block',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './code-block.component.html',
        styleUrls: ['./code-block.component.scss'],
    })
    export class CodeBlockComponent {}
  `;
}
