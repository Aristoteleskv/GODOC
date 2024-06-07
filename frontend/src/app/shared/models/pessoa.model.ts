import { Deserializable } from './deserializable.model';

export class Pessoa implements Deserializable {
  id?: string;
  nome_completo?: string;
  email?: string;
  user_id?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;


  deserialize(input: any): this {
    // Assign input to our object BEFORE deserialize our  to prevent already deserialized  from being overwritten.
    // Atribua entrada ao nosso objeto ANTES de desserializar nossos Objects para impedir que object já desserializados sejam substituídos.
    Object.assign(this, input);
    return this;
  }
}
