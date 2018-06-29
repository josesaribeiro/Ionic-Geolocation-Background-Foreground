import { OperacoesRastreamentoProvider } from './../operacoes-rastreamento/operacoes-rastreamento';
import { Localizacao } from './../../models/localizacao.model';
import {Injectable, NgZone} from '@angular/core';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';

@Injectable()
export class LocationTrackerProvider {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;

  constructor(
    public zone: NgZone,
    private backgroundGeolocation: BackgroundGeolocation,
    private operacoes: OperacoesRastreamentoProvider
  ) {}


  iniciarRastreamento() {

    // Background Tracking

      let config = {
        desiredAccuracy: 0,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: false,
        interval: 3000
      };

      this.backgroundGeolocation.configure(config).subscribe((location) => {

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = location.latitude;
          this.lng = location.longitude;

          let localizacao: Localizacao = new Localizacao(this.lat, this.lng, new Date())

          console.log(localizacao);

          this.operacoes.create(localizacao)

        });

      }, (err) => {

        console.log(err);

      });

      // Turn ON the background-geolocation system.
      this.backgroundGeolocation.start();



  }

  pararRastreamento() {
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

}
