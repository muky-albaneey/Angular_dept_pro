import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentType } from '../types/deptType';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent implements OnInit{

  masterServ = inject(MasterService);


  deptList : DepartmentType[] = [];

  newDept:any = {

    "name": ""
  }
  newEdit:any = {
    //  id: '0fbe4fce-cb0a-4033-bc1f-72d946981abe',
    // name: 'Devops'
    "id": "",
    "name":"",
    // "created":""
  }
  ngOnInit(): void {
    this.getDept();
  }

  getDept(){
    this.masterServ.getAllDepartment().subscribe((deptItem:any)=>{
      console.log(deptItem);
      this.deptList = deptItem
    })
  }

  saveDept(){
    this.masterServ.createNewDepartment(this.newDept).subscribe((res:any)=>{
     console.log(res.message);
     console.log(res.result);
     console.log(res.statusCode);

     if(res.statusCode){
      this.getDept();
      alert((res.message))
     }

      // if(res.result){
      //   alert("Dept created success");
      //   this.getDept();
      // }else{
      //   alert(res.message)
      // }
    })
  }

  onEdit(data:any){
    this.newDept = data
    this.newEdit = data

    // this.masterServ.updateDepartment(this.newDept.id);
  }

  updateDept() {
    console.log(this.newEdit);

    this.masterServ.updateDepartment(this.newDept).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        // Handle successful response
      },
      error: (error: any) => {
        console.error('Error:', error);
        // Handle error response
      }
    });
  }
}
