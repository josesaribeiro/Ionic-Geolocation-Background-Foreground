import { Localizacao } from './localizacao.model';
export class PojoRastreio {

  constructor(
    public photo:string,
    public localizacoes: Localizacao[]
  ) {}

}
