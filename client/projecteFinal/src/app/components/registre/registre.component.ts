import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/serveis/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.scss']
})
export class RegistreComponent implements OnInit {
  fomRegistre: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

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
    return (pass1 === pass2) ? null : { notSame: true } 
  }

  enviar() {

    if (this.fomRegistre.invalid) {return}

    const form = {
      email : this.fomRegistre.controls['email'].value,
      contrasenya: this.fomRegistre.controls['contrasenya'].value,
    }
    
    this.registre(form);
  }

  registre(form):void {
    this.authService.registre(form).subscribe(
    res => {
      alert('')
      this.authService.nouToken(res);
      this.router.navigateByUrl('home');
    }
      
    )
  }
}
