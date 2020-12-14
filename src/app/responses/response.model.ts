import { Deserializable } from '../models/deserializable.model';

export class ResponseModel implements Deserializable {
    id: number;
    representative: string;
    answer: string;
    lat: number;
    long: number;

    deserialize(data: any): this {
        Object.assign(this, data);

        return this;
    }
}