import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { AutenticacaoService } from 'src/app/autenticacao.service';
import { Usuario } from '../model/usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(public fb: FormBuilder, private autenticacaoService: AutenticacaoService) {}

  @Output() public login: EventEmitter<boolean> = new EventEmitter<boolean>();

  public form: FormGroup;
  public usuario: Usuario;

  ngOnInit(): void {
    this.generateForm();
  }

  public isLogin(): void {
    this.login.emit(false);
  }
  
  public generateForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      nome: ['', Validators.required],
      usuario: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  public cadastrarUsusario(): void {
    this.autenticacaoService.cadastrarUsuario(this.form.value)
      .then(() =>this.isLogin())
      .catch(reject => console.log(reject));
  }
}
