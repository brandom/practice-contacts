import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Provider } from '../data.service';

@Component({
  selector: 'app-providers-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule],
  template: `
    <h2 mat-dialog-title>Edit Provider</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Provider</mat-label>
        <input matInput [(ngModel)]="data.provider">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Specialty</mat-label>
        <input matInput [(ngModel)]="data.specialty">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Provider Cell</mat-label>
        <input matInput [(ngModel)]="data.providerCell">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Primary Nurse</mat-label>
        <input matInput [(ngModel)]="data.primaryNurse">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Primary Nurse #</mat-label>
        <input matInput [(ngModel)]="data.primaryNurseNumber">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Primary MA</mat-label>
        <input matInput [(ngModel)]="data.primaryMA">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Primary MA #</mat-label>
        <input matInput [(ngModel)]="data.primaryMANumber">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Notes</mat-label>
        <textarea matInput [(ngModel)]="data.notes"></textarea>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Source Sheet</mat-label>
        <input matInput [(ngModel)]="data.sourceSheet">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Surgery Scheduler</mat-label>
        <input matInput [(ngModel)]="data.surgeryScheduler">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Surgery Scheduler #</mat-label>
        <input matInput [(ngModel)]="data.surgerySchedulerNumber">
      </mat-form-field>
      <mat-form-field>
        <mat-label>2nd Nurse</mat-label>
        <input matInput [(ngModel)]="data.secondNurse">
      </mat-form-field>
      <mat-form-field>
        <mat-label>2nd Nurse #</mat-label>
        <input matInput [(ngModel)]="data.secondNurseNumber">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class ProvidersEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProvidersEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Provider
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data);
  }
}