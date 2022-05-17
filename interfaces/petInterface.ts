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
        },
        customer: CustomerUnderPetInterface | null
    }
}

export interface CustomerUnderPetInterface {
    data: {
        id: number,
        attributes: {
            kana: string,
            kanji: string,
        }
    }
}

export interface PetTypeInterface {
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

export interface PetsPageProps {
    petTypes: PetTypeInterface[];
}