import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CodeBlockComponent } from 'src/app/ui/code-block.component';

@Component({
  selector: 'dotnet-client-home',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
