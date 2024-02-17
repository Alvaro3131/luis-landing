import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import AOS from 'aos';
import {
  FormArray,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
  UntypedFormArray,
  UntypedFormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: `./login.component.html`,
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  form=new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private router:Router) { }


  ngOnInit() {
    if(sessionStorage.getItem('validate')=='true'){
      this.router.navigate(['/acceso/configuracion']);
    }
  }
  validate(){
   let object= this.form.value;
   if(object.username=='admin' && object.password=='avicolaThiago123'){
    sessionStorage.setItem('validate', 'true');
    this.router.navigate(['/acceso/configuracion']);
  }
}

 }
