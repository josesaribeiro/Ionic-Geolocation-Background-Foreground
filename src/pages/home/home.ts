import { Component, OnDestroy } from '@angular/core';
import { NavController,Platform, LoadingController, Loading, AlertController } from 'ionic-angular';

import { LocationTrackerProvider } from './../../providers/location-tracker/location-tracker';
import { Localizacao } from '../../models/localizacao.model';
import { OperacoesRastreamentoProvider } from '../../providers/operacoes-rastreamento/operacoes-rastreamento';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    LocationTrackerProvider
  ]
})
export class HomePage implements OnDestroy {

  public localizacoes: Localizacao[] = []
  public title:string
  public refresher;
  public isRefresing: boolean = false;

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    public locationTracker: LocationTrackerProvider,
    public loadingCtrl: LoadingController,
    private operacoes: OperacoesRastreamentoProvider
  ) {
    this.platform.ready().then(() => {
      this.obterLocalizacaoAtual()
    })

  }

  ionViewDidEnter() {

  }

  ionViewDidLoad(){
    this.carregarLocalizacoes()
  }

  ngOnDestroy(): void {
    this.stop()
  }

  //methods

  obterLocalizacaoAtual() {
    this.start()

  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefresing = true;
    this.carregarLocalizacoes();
  }


  start(){
    this.locationTracker.iniciarRastreamento();
  }

  stop(){
    this.locationTracker.pararRastreamento();
  }

  carregarLocalizacoes() {
    let load = this.showLoading('Carregando ...')
    load.present()
    this.operacoes.getAll()
      .then((localizacoes: Localizacao[]) => {
        this.localizacoes = localizacoes;

        if(this.isRefresing) {
          this.refresher.complete();
          this.isRefresing = false;
       }

        load.dismiss()
      }).catch((err) => {
        console.log(err);

        load.dismiss()
      });
  }

  private showLoading(message?: string): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: message || 'Por favor aguarde...'
    });
    loading.present();
    return loading;
  }




}


