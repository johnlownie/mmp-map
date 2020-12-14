import { Deserializable } from './deserializable.model';

export class RepresentativeModel implements Deserializable {
    name: string;
    email: string;
    image: string;
    party: string;
    district: string;
    long: string;
    lat: string;

    deserialize(data: any): this {
        let representative = data.representatives_centroid;

        if (representative !== undefined && representative[0] !== undefined) {
            this.name = representative[0].name;
            this.email = representative[0].email;
            this.image = representative[0].photo_url;
            this.party = representative[0].party_name;
            this.district = representative[0].district_name;
            this.long = data.centroid.coordinates[0];
            this.lat = data.centroid.coordinates[1];

            console.log(this);
        }

        return this;
    }
}