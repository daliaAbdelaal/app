import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  employeeForm :FormGroup=new FormGroup({
    'empName':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    'empEmail':new FormControl(null,[Validators.required,Validators.email]),
    'empAddress':new FormControl(null,Validators.required),
    'empPhone':new FormControl(null,[Validators.required,Validators.pattern(/^01[012][0-9]{8}$/)])

  })
  constructor( private _AuthService:AuthService ,private _MatDialogRef:MatDialogRef<EditComponent> , @Inject(MAT_DIALOG_DATA) public editData:any) { }
  
  editEmployee()
  {
   
        this._AuthService.updateData(this.employeeForm.value).subscribe({

          next:()=>{
            alert('Employee details edited successfully');
            this.employeeForm.reset();
            this._MatDialogRef.close('update');
          },
          error:()=>{
            alert('error')
          }
        })
  }

  ngOnInit(): void {
    if(this.editData)
    {
      this.employeeForm.controls['empName'].setValue(this.editData.empName);
      this.employeeForm.controls['empEmail'].setValue(this.editData.empEmail);
      this.employeeForm.controls['empAddress'].setValue(this.editData.empAddress);
      this.employeeForm.controls['empPhone'].setValue(this.editData.empPhone);
    }
   
  }

 
}


