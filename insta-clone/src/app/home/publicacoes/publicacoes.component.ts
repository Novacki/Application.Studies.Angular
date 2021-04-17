import { Component, Input, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { BdService } from 'src/app/bd.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css'],
  providers:[BdService]
})
export class PublicacoesComponent implements OnInit {

  constructor(private bd: BdService) { }

  public email: string; 
  public publicacoes: Array<any>;
  
  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(user => {
      this.email = user.email;
      this.obterPublicacoes();
    });
  }


  public obterPublicacoes(): void {
    console.log("Aqui 3")
    this.bd.obterPublicacoes(this.email).then(response => {
      this.publicacoes = response;
    });
  }
}
