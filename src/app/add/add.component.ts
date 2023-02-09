import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  employeeForm :FormGroup=new FormGroup({
    'empName':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    'empEmail':new FormControl(null,[Validators.required,Validators.email]),
    'empAddress':new FormControl(null,Validators.required),
    'empPhone':new FormControl(null,[Validators.required,Validators.pattern(/^01[012][0-9]{8}$/)])

  })

  constructor(private _AuthService:AuthService ,private _MatDialogRef:MatDialogRef<AddComponent> ) { }

  addEmployee()
  {
    // console.log(this.employeeForm)
    if(this.employeeForm.invalid)
    {
      return;
    }
    this._AuthService.postData(this.employeeForm.value).subscribe({
      next:()=>{
        // alert('Employee details added successfully');
        this.employeeForm.reset();
        this._MatDialogRef.close('save');
      },
      error:()=>{
        alert('error')
      }
    })
    
  }


  ngOnInit(): void {
  }

}
