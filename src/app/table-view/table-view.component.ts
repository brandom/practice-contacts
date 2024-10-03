import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService, Practice } from '../data.service';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatRippleModule],
  template: `
    <mat-table [dataSource]="dataService.getPractices()" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef>Practice Name</mat-header-cell>
        <mat-cell *matCellDef="let practice">{{practice.name}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="region">
        <mat-header-cell *matHeaderCellDef>Region</mat-header-cell>
        <mat-cell *matCellDef="let practice">{{practice.region}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="address">
        <mat-header-cell *matHeaderCellDef>Address</mat-header-cell>
        <mat-cell *matCellDef="let practice">{{practice.address}}</mat-cell>
      </ng-container>
      <ng-container matColumnDef="hoursOfOperation">
        <mat-header-cell *matHeaderCellDef>Hours of Operation</mat-header-cell>
        <mat-cell *matCellDef="let practice">{{practice.hoursOfOperation}}</mat-cell>
      </ng-container>
      <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
      <mat-row *matRowDef="let practice; columns: displayedColumns;" (click)="viewDetails(practice.id)" matRipple></mat-row>
    </mat-table>
  `,
  styles: [
    `
    table {
      width: 100%;
    }
    .mat-mdc-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
  `,
  ],
})
export class TableViewComponent {
  displayedColumns: string[] = ['name', 'region', 'address', 'hoursOfOperation'];
  dataService = inject(DataService);
  private router = inject(Router);

  viewDetails(id: number) {
    this.router.navigate(['/detail', id]);
  }
}