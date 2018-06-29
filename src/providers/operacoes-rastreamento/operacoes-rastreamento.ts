import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

import { Localizacao } from '../../models/localizacao.model';
import { SqliteHelperProvider } from '../sqlite-helper/sqlite-helper';

@Injectable()
export class OperacoesRastreamentoProvider {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;

  constructor(
    public sqliteHelperService: SqliteHelperProvider,
  ) {}

  private getDb(): Promise<SQLiteObject> {
    if (this.isFirstCall) {

      this.isFirstCall = false;

      return this.sqliteHelperService.getDb('rastreamento.db')
        .then((db: SQLiteObject) => {

          this.db = db;

          this.db.executeSql('CREATE TABLE IF NOT EXISTS localizacoes (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude INTEGER, longitude INTEGER, urlImg TEXT, data DATE)', {})
            .then((success) => {

              console.log('Tabela de localizacoes criada com sucesso!', success)

            }).catch((error: Error) => {
              console.log('Erro ao criar a tabela de localizacoes!', error)

            });

          return this.db;

        });

    }
    return this.sqliteHelperService.getDb();
  }

  getAll(orderBy?: string): Promise<Localizacao[]> {
    return this.getDb()
      .then((db: SQLiteObject) => {

        return <Promise<Localizacao[]>>this.db.executeSql(`SELECT * FROM localizacoes ORDER BY id ${orderBy || 'DESC'}`, {})
          .then(resultSet => {

            let list: Localizacao[] = [];

            for (let i = 0; i < resultSet.rows.length; i++) {
              list.push(resultSet.rows.item(i));
            }

            return list;
          }).catch((error: Error) => {
            console.log('Erro ao executar o método!', error)

          });

      });
  }

  create(localizacao: Localizacao): Promise<Localizacao> {
    return this.db.executeSql('INSERT INTO localizacoes (latitude,longitude, data) VALUES (?,?,?)', [localizacao.latitude, localizacao.longitude, localizacao.data])
      .then(resultSet => {
        localizacao.id = resultSet.insertId;

        return resultSet.rows.item(0)

      }).catch((error: Error) => {
        console.log("Erro ao salvar a localização.", error)

      });
  }

  getById(id: number): Promise<Localizacao> {
    return this.db.executeSql('SELECT * FROM localizacoes WHERE id=?', [id])
      .then(resultSet => resultSet.rows.item(0))
      .catch((error: Error) => console.log("Erro ao obter a localizacão.", error));
  }

}
