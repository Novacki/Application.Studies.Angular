import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder, private autenticacoService: AutenticacaoService) { 
    this.form = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }
  public form: FormGroup;
  
  @Output() public register: EventEmitter<boolean> = new EventEmitter<boolean>()

  ngOnInit(): void {
  }

  public login(){
    this.autenticacoService.autenticar(this.form.value.email, this.form.value.senha);
  }

  public isRegister(): void {
    this.register.emit(true);
  }
}
