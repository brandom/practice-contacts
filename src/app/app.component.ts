import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Practice Contacts</span>
      <div class="search-container">
        <mat-icon class="search-icon">search</mat-icon>
        <input 
          type="text" 
          placeholder="Search" 
          [ngModel]="searchTerm()"
          (ngModelChange)="searchTerm.set($event)"
          (keyup.enter)="onSearch()"
        >
      </div>
    </mat-toolbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
    mat-toolbar {
      display: flex;
      align-items: center;
    }
    .search-container {
      display: flex;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      padding: 0 10px;
      margin-left: 20px;
      flex-grow: 1;
      height: 40px;
    }
    .search-icon {
      color: rgba(255, 255, 255, 0.7);
      margin-right: 10px;
    }
    input {
      background: transparent;
      border: none;
      color: white;
      padding: 8px;
      font-size: 16px;
      width: 100%;
      height: 100%;
    }
    input::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    input:focus {
      outline: none;
    }
    .content {
      padding: 20px;
    }
  `,
  ],
})
export class App {
  searchTerm = signal('');

  onSearch() {
    console.log('Searching for:', this.searchTerm());
    // Implement search functionality here
  }
}