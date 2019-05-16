import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {
  fomRegistre: FormGroup;
  enviat: Boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.fomRegistre = this.formBuilder.group({
      'email': ['', Validators.required, Validators.email],
      'contrasenya': ['', Validators.required, Validators.minLength(5)],
      'contrasenya2': ['', Validators.required, Validators.minLength(5)],
      'politica': ['', Validators.required],
    },
    {
      validator: this.comparePass
    })
  }

  comparePass(group: FormGroup) {
    const pass1 = group.controls.contrasenya.value;
    const pass2 = group.controls.contrasenya2.value;
    return (pass1 === pass2) ? null : { notSame: true } 
  }

  enviar() {
    this.enviat = true;

    if (this.fomRegistre.invalid) {
      alert('ha fallat')
      return;
    }

    alert("tot okay")
  }
}
