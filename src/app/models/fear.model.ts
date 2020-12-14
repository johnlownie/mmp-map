import { Deserializable } from './deserializable.model';

export class FearModel implements Deserializable {
    id: number;
    representative: string;
    answer: string;
    long: number;
    lat: number;

    deserialize(data: any): this {
        Object.assign(this, data);

        return this;
    }
}