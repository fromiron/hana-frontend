import {PetInterface} from "@/interfaces/petInterface";
import exp from "constants";

export interface CustomerInterface {
    id: number;
    attributes: {
        kana: string;
        kanji: string;
        email: string;
        address: string;
        createdAt: string;
        updatedAt: string;
        note: string;
        phone: string;
        zipcode: string;
        sex: { data: SexInterface },
        age_group: { data: AgeGroupInterface },
        pets: { data: PetInterface[] }
    }
}

export interface SexInterface {
    id: number;
    attributes: {
        sex: string;
    }
}

export interface AgeGroupInterface {
    id: number;
    attributes: {
        group: string;
    }
}



export interface CustomersResponse {
    customers: [CustomerInterface];
}

export interface SexFilterInterface extends KeyValuePairInterface {
    male: boolean;
    female: boolean;
    other: boolean;
}

export interface KeyValuePairInterface {
    [key: string]: any;
}
export interface CustomerCountInterface{
    age_group_id:number,
    group:string,
    count:number
}