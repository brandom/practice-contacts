import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataService, Provider } from '../data.service';
import { ProvidersEditDialogComponent } from './providers-edit-dialog.component';

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDialogModule, ProvidersEditDialogComponent],
  template: `
    <table mat-table [dataSource]="dataService.getProviders()" class="mat-elevation-z8">
      <ng-container matColumnDef="provider">
        <th mat-header-cell *matHeaderCellDef>Provider</th>
        <td mat-cell *matCellDef="let provider">{{provider.provider}}</td>
      </ng-container>
      <ng-container matColumnDef="specialty">
        <th mat-header-cell *matHeaderCellDef>Specialty</th>
        <td mat-cell *matCellDef="let provider">{{provider.specialty}}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="openDialog(row)"></tr>
    </table>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .mat-mdc-row:hover {
      background-color: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
  `]
})
export class ProvidersComponent {
  displayedColumns: string[] = ['provider', 'specialty'];
  dataService = inject(DataService);
  private dialog = inject(MatDialog);

  openDialog(provider: Provider) {
    const dialogRef = this.dialog.open(ProvidersEditDialogComponent, {
      width: '400px',
      data: {...provider}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateProvider(result);
      }
    });
  }
}