import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DataService, Practice } from '../data.service';
import { LeadershipComponent } from '../leadership/leadership.component';
import { ProvidersComponent } from '../providers/providers.component';

@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    LeadershipComponent,
    ProvidersComponent
  ],
  template: `
    <div class="container">
      <button mat-mini-fab color="primary" (click)="goBack()" class="back-button flat-fab">
        <mat-icon>chevron_left</mat-icon>
      </button>
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ practice()?.name || 'Practice' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ng-container *ngIf="!isEditing()">
            <p><strong>Region:</strong> {{practice()?.region}}</p>
            <p><strong>Address:</strong> {{practice()?.address}}</p>
            <p><strong>Hours of Operation:</strong> {{practice()?.hoursOfOperation}}</p>
          </ng-container>
          <form *ngIf="isEditing()" [formGroup]="practiceForm">
            <mat-form-field>
              <mat-label>Practice Name</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>
            <mat-form-field>
              <mat-label>Region</mat-label>
              <input matInput formControlName="region">
            </mat-form-field>
            <mat-form-field>
              <mat-label>Address</mat-label>
              <input matInput formControlName="address">
            </mat-form-field>
            <mat-form-field>
              <mat-label>Hours of Operation</mat-label>
              <input matInput formControlName="hoursOfOperation">
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" (click)="toggleEdit()">
            {{ isEditing() ? 'Cancel' : 'Edit' }}
          </button>
          <button mat-button color="accent" *ngIf="isEditing()" (click)="saveChanges()">Save</button>
        </mat-card-actions>
      </mat-card>
      
      <mat-card class="detail-tabs-card">
        <mat-tab-group>
          <mat-tab label="Leadership">
            <app-leadership></app-leadership>
          </mat-tab>
          <mat-tab label="Providers">
            <app-providers></app-providers>
          </mat-tab>
        </mat-tab-group>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      position: relative;
      max-width: 1200px;
      margin: 20px auto;
      padding: 0 20px 0 60px;
    }
    mat-card {
      width: 100%;
      margin-bottom: 20px;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
    .back-button {
      position: absolute;
      left: 10px;
      top: 0;
    }
    .detail-tabs-card {
      padding: 0;
    }
    ::ng-deep .detail-tabs-card .mat-mdc-tab-body-wrapper {
      padding: 0;
    }
    .flat-fab {
      box-shadow: none !important;
      border-radius: 4px !important;
      transition: background-color 0.3s ease;
    }
    .flat-fab:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `]
})
export class DetailViewComponent implements OnInit {
  practice = signal<Practice | null>(null);
  isEditing = signal(false);
  practiceForm: FormGroup;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);
  private fb = inject(FormBuilder);

  constructor() {
    this.practiceForm = this.fb.group({
      name: ['', Validators.required],
      region: ['', Validators.required],
      address: ['', Validators.required],
      hoursOfOperation: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const practiceData = this.dataService.getPractice(id);
    if (practiceData) {
      this.practice.set(practiceData);
      this.practiceForm.patchValue(practiceData);
    }
  }

  toggleEdit() {
    this.isEditing.update(value => !value);
    if (this.isEditing()) {
      this.practiceForm.patchValue(this.practice()!);
    }
  }

  saveChanges() {
    if (this.practiceForm.valid) {
      const updatedPractice: Practice = {
        ...this.practice()!,
        ...this.practiceForm.value
      };
      this.dataService.updatePractice(updatedPractice);
      this.practice.set(updatedPractice);
      this.isEditing.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}