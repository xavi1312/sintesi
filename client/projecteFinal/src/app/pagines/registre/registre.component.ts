import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/serveis/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Globals } from 'src/app/variablesGlobals';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {
  fomRegistre: FormGroup;
  hidePass: Boolean;
  hidePass2: Boolean;
  tempsAvis: number;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar, public globals: Globals) {
    this.tempsAvis = this.globals.tempsNotificacions;
  }

  ngOnInit() {
    this.fomRegistre = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contrasenya: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      contrasenya2: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      politica: ['', Validators.required],
    },
    {
      validator: this.comparePass
    })
  }

  comparePass(group: FormGroup) {
    const pass1 = group.controls.contrasenya.value;
    const pass2 = group.controls.contrasenya2.value;
    const match = (pass1 === pass2) ? null : { notSame: true }
    console.log(match)
    if(match != null) 
    return match;
  }

  enviar() {

    if (this.fomRegistre.invalid) {return}

    const form = {
      email : this.fomRegistre.controls['email'].value,
      contrasenya: this.fomRegistre.controls['contrasenya'].value,
    }
    console.log(this.fomRegistre.invalid)
    //this.registre(form);
  }

  registre(form):void {
    this.authService.registre(form).subscribe(
    res => {
      this.authService.nouToken(res);
      this.router.navigateByUrl('');
    }
      
    )
  }
  openSnackBar(missatge: string, accio?: string) {
    if(!accio) accio = 'Dacord'
    if(missatge || missatge != '') {
      this._snackBar.open(missatge, accio, {
        duration: this.tempsAvis,
      });
    }
  }

  getEmailErrors() {
    return this.fomRegistre.controls['email'].hasError('email') ? 'Format email necessari' :
            this.fomRegistre.controls['email'].hasError('required') ? 'Email requerit' : ''
  }
  getContra1Errors() {
    return this.fomRegistre.controls['contrasenya'].hasError('minlength') ? 'Contrasenya massa curta' :
            this.fomRegistre.controls['contrasenya'].hasError('required') ? 'Contrasenya requerida' : ''
  }
  getContra2Errors() {
    return this.fomRegistre.controls['contrasenya2'].hasError('minlength') ? 'Contrasenya massa curta' :
            this.fomRegistre.controls['contrasenya2'].hasError('required') ? 'Contrasenya requerida' : ''
  }
  getPoliticaErrors() {
    return this.fomRegistre.controls['politica'].hasError('required') ? 'Política requerida' : ''
  }
}
