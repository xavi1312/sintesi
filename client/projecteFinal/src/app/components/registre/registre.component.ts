import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {
  formRegistre: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formRegistre = this.formBuilder.group({
      email: [Validators.required, Validators.email],
      contrasenya: [Validators.required],
      contrasenya2: [Validators.required],
      politica: [Validators.required]
    }, {
        validator: this.comparePass('password', 'confirmPassword')
    });
  }

  comparePass(pass1, pass2){
    return (pass1 === pass2) ? true : false
  }
}
