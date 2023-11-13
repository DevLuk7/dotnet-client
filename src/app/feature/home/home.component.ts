import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from 'src/app/ui/button.component';
import { CodeBlockComponent } from 'src/app/ui/code-block.component';

@Component({
  selector: 'dotnet-client-home',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tsCode = `
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
