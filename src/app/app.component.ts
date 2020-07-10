import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
signUpForm: FormGroup;
  genders = ['male', 'female'];
  forbiddenUserNames= ['dog', 'donkey'];

  ngOnInit():void{
    this.signUpForm= new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this))
      }),
      'gender': new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    });


    this.signUpForm.valueChanges.subscribe((val)=>console.log(val));
    this.signUpForm.statusChanges.subscribe((val)=>console.log(val));

    this.signUpForm.setValue({
      'userData':{
        'username':'Max',
        'email':'max@test.com'
      },
      'gender':'male',
      'hobbies':[]
    });

    this.signUpForm.patchValue({
      'userData':{
        'username':'Max'
      }
    });
  }


  onSubmit(): void{
    console.log(this.signUpForm);
    this.signUpForm.reset();
  };

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  onAddHobbies(){
    const control= new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl):{[s:string]:boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true}
    }
    return null;
  }

  forbiddenEmails(controls:FormControl):Promise<any>|Observable<any>{
    const promise = new Promise((resolve,reject)=>{
      setTimeout(() => {
        if(controls.value == 'test@test.com'){
          resolve({'emailIsForbidden':true});
        }else{
          resolve(null)
        }
      }, 1500);
    });
    return promise;
  }
}
