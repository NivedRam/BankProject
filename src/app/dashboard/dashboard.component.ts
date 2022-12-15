import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
//
// psw=''
// amnt=''
// acno1=''
// psw1=''
// amnt1=''
user=''
acno:any
dateandtime:any

constructor(private ds:DataService,private fb:FormBuilder,private router:Router ){

  this.dateandtime=new Date()

  //Access user name
this.user=this.ds.currentuser


}

depositForm=this.fb.group({acno:['',[Validators.required,Validators.pattern('[0-9]')]],psw:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]')]],amnt:['',[Validators.required,Validators.pattern('[0-9]')]]})
withdrawForm=this.fb.group({acno1:['',[Validators.required,Validators.pattern('[0-9]')]],psw1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]')]],amnt1:['',[Validators.pattern('[0-9]')]]})

ngOnInit():void{
if(!localStorage.getItem("currentacno")){
  alert("please login first")
  this.router.navigateByUrl('')
}
}


deposit(){
  var acno=this.depositForm.value.acno
  var psw=this.depositForm.value.psw
  var amnt=this.depositForm.value.amnt
  const result=this.ds.deposit(acno,psw,amnt)
  if(result){
    alert(`${amnt} credited to you account and the available balance is ${result}`)
  }
  else{
    alert("incurrect username or password")
  }

}
wihtdraw(){
  var acno1=this.withdrawForm.value.acno1
  var psw1=this.withdrawForm.value.psw1
  var amnt1=this.withdrawForm.value.amnt1

  const result=this.ds.withdraw(acno1,psw1,amnt1)
  if(result){
    alert(`${amnt1} debited from your account and the available balance is ${result}`)
  }


}
logout(){
  localStorage.removeItem("currentuser")
  localStorage.removeItem("currentacno")
 this.router.navigateByUrl("")
}
deleteconfirm(){
this.acno=JSON.parse(localStorage.getItem('currentacno')||"")
}
}

