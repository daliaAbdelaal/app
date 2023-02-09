import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';
import { AuthService } from '../auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['empName', 'empEmail', 'empAddress', 'empPhone', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog:MatDialog, private _AuthService:AuthService) { }
  

  getAllEmp()
  {
    this._AuthService.getData().subscribe((data)=>{

      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      // console.log(data)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog(){
    this.dialog.open(AddComponent, {
      width:'40%'
    }).afterClosed().subscribe(val=>{ //to sense after add data

      if(val==='save')
      {
        this.getAllEmp()
      }
    }) 
  }
  openEditDialog(row:any)
  {
    this.dialog.open(EditComponent, {
      width:'40%',
      data:row
    }).afterClosed().subscribe(val=>{ //to sense after update data

      if(val==='update')
      {
        this.getAllEmp()
      }
    }) 
  }
  deleteEmp(id:number)
  {
    this._AuthService.deleteData(id).subscribe(()=>{
      this.getAllEmp();
    })
   
  }


  ngOnInit(): void {
    this.getAllEmp();
  }

}
