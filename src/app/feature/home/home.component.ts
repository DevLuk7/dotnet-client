import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { finalize, map } from 'rxjs';
import { OpenAiService } from 'src/app/data-access/open-ai.service';
import { ButtonComponent } from 'src/app/ui/button.component';
import { CodeBlockComponent } from 'src/app/ui/code-block.component';
import { CodeEditorComponent } from 'src/app/ui/code-editor.component';
import { SpinnerComponent } from 'src/app/ui/spinner.component';
import { SvgJestComponent } from 'src/app/ui/svg-jest.component';

@Component({
  selector: 'dotnet-client-home',
  standalone: true,
  imports: [
    CommonModule,
    CodeBlockComponent,
    ButtonComponent,
    SpinnerComponent,
    CodeEditorComponent,
    FormsModule,
    ReactiveFormsModule,
    SvgJestComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly openAiService = inject(OpenAiService);

  tsCode = `@Component({
  standalone: true,
  selector: 'todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.css',
})
export class TodoListItem {
  taskTitle = '';
  isComplete = false;

  completeTask() {
    this.isComplete = true;
  }
  
  updateTitle(newTitle: string) {
    this.taskTitle = newTitle;
  }
}`;

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
