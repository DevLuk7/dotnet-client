import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { finalize, map } from 'rxjs';
import { OpenAiService } from 'src/app/data-access/open-ai.service';
import { ButtonComponent } from 'src/app/ui/button.component';
import { CodeBlockComponent } from 'src/app/ui/code-block.component';
import { SpinnerComponent } from 'src/app/ui/spinner.component';

@Component({
  selector: 'dotnet-client-home',
  standalone: true,
  imports: [
    CommonModule,
    CodeBlockComponent,
    ButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly openAiService = inject(OpenAiService);

  tsCode = `
    import { CommonModule } from '@angular/common';
    import { Component, inject } from '@angular/core';
    import { OpenAiService } from 'src/app/data-access/open-ai.service';
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
      private readonly openAiService = inject(OpenAiService);
    
      tsCode = '';
    
      unitTestCode = '';
    
      generateUnitTest() {
        this.openAiService
          .getUnitTest(this.tsCode)
          .subscribe((res) => (this.unitTestCode = res));
      }
    }
  `;

  unitTestCode = '';

  loading = false;

  generateUnitTest() {
    this.loading = true;
    this.openAiService
      .getUnitTest(this.tsCode)
      .pipe(
        map((res) =>
          res
            .replace('```javascript', '')
            .replace('```typescript', '')
            .replace('```', '')
            .replace('```', '')
        ),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        this.unitTestCode = res;
      });
  }
}
