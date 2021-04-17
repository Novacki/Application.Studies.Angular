import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { BdService } from 'src/app/bd.service';
import { ProgressoService } from 'src/app/progresso.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css'],
  providers:[BdService]
})
export class IncluirPublicacaoComponent implements OnInit {

  public form: FormGroup;
  public email: string;
  public imagem: any;

  public progressoPublicacao: string;
  public porcentagemUpload: number;
  @Output() public atualizarTimeLine: EventEmitter<boolean> = new EventEmitter(false);

  constructor( private fb: FormBuilder, private bdService: BdService, private progressoService: ProgressoService ) {
    this.form = fb.group({
      titulo: [ '', Validators.required ]
    })
  }

  ngOnInit(): void {
    firebase.default.auth().onAuthStateChanged(user => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bdService.publicar( { titulo: this.form.value, email: this.email, imagem: this.imagem[0] } )
      .finally(() => {
        setTimeout(() => {
          this.atualizarTimeLine.emit(true);
        }, 3000);
      })

    this.progressoService.estado.subscribe(value => {
      this.porcentagemUpload = Math.round((value.bytesTransferred / value.totalBytes) * 100);
    });

    this.progressoService.status.subscribe(value => {
      this.progressoPublicacao = value;
    });
  }

  public preparaImagemUpload(event : Event) : void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
