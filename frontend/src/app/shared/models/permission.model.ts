import { Deserializable } from './deserializable.model';

export class Permission implements Deserializable {
  id?: string;
  module_id?: string;
  name?: string;
  nome?: string;
  active?: boolean;
  tabela?: string;
  operacao?: string;
  description?: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

}