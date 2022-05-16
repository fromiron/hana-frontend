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

export interface PetInterface {
    id: number;
    attributes: {
        name: string,
        birth: string,
        createdAt: string,
        updatedAt: string,
        note: string,
        dead: boolean,
        type: {
            data: {
                id: number,
                attributes: {
                    type: string,
                    icon: {
                        data: {
                            attributes: {
                                url: string
                            }
                        }
                    }
                }
            }
        }
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