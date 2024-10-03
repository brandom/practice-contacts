import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DataService, Leader } from '../data.service';
import { LeadershipEditDialogComponent } from './leadership-edit-dialog.component';

@Component({
  selector: 'app-leadership',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatDialogModule],
  template: `
    <table mat-table [dataSource]="dataService.getLeaders()" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let leader">{{leader.name}}</td>
      </ng-container>
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let leader">{{leader.title}}</td>
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
export class LeadershipComponent {
  displayedColumns: string[] = ['name', 'title'];
  dataService = inject(DataService);
  private dialog = inject(MatDialog);

  openDialog(leader: Leader) {
    const dialogRef = this.dialog.open(LeadershipEditDialogComponent, {
      width: '400px',
      data: {...leader}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateLeader(result);
      }
    });
  }
}