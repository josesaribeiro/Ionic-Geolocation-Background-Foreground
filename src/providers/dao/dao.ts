import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Localizacao } from '../../models/localizacao.model';
import { OperacoesRastreamentoProvider } from '../operacoes-rastreamento/operacoes-rastreamento';

@Injectable()
export class DaoProvider {
  private baseApiPath  = "http://intelipost.agenciamk3.com.br/servico.php";

  public localizacoes: Localizacao[] = []

  constructor(
    public http: HttpClient,
    public operacoes: OperacoesRastreamentoProvider
  ) {}

  salvarInformacoes() {
      this.operacoes.getAll().then((localizacoes: Localizacao[]) => {
        this.localizacoes = localizacoes;
      });


  }

}
