import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ProgressoService } from './progresso.service';

@Injectable()
export class BdService {

  constructor(private progressoService: ProgressoService) { }

  public publicar(publicacao: any): Promise<any> {

    return firebase.default.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then(response => {

        firebase.default.storage().ref()
          .child(`imagens/${response.key}`)
          .put(publicacao.imagem)
          .on(firebase.default.storage.TaskEvent.STATE_CHANGED,
            resultValue => {
              this.progressoService.status.next('Andamento');
              this.progressoService.estado.next(resultValue);
            },
            error => {
              this.progressoService.status.next('Erro');
              this.progressoService.estado.next(error);
            },
            () => {
              this.progressoService.status.next('Concluido');
            });
      });
  }


  public obterPublicacoes(email: string): Promise<any> {

    return firebase.default.database().ref(`publicacoes/${btoa(email)}`)
      .orderByKey()
      .once('value')
      .then(response => {
        let publicacoes = [];


        response.forEach(res => {
          let publicacao = res.val().titulo;
          publicacao.key = res.key;

          publicacoes.push(publicacao);

        });

        return publicacoes.reverse();

      }).then(publicacoes => {
        publicacoes.forEach(publicacao => {
          firebase.default.storage().ref()
            .child(`imagens/${publicacao.key}`)
            .getDownloadURL().then(resUrl => {
              publicacao.imagemUrl = resUrl;

              firebase.default.database().ref(`usuario_detalhes/${btoa(email)}`).once('value').then(resultUser => {
                publicacao.nomeUsuario = resultUser.val().usuario;
                publicacoes.push(publicacao);
              });
            });
        });

        return publicacoes;
      });
  }
}


