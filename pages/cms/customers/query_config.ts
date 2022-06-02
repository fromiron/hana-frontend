import qs from "qs";
import {SexFilterInterface} from "@/interfaces/customerInterface";

export const CUSTOMER_DEFAULT_PAGE_SIZE = 10;
export const CUSTOMER_DEFAULT_PAGE_NUMBER = 1;
export const CUSTOMER_DEFAULT_QUERY = {
    populate: {
        age_group: {
            fields: ['group'],
        },
        sex: {
            fields: ['sex'],
        },
        pets: {
            populate: {
                type: {
                    fields: ['type'],
                    populate: '*'
                },
            },

        }
    },
    filters: {
        sex: {
            sex: {$eq: ['male', 'female', 'other']}
        },
        deleted_at: {
            $null: true,
        },
    },
    pagination: {
        page: CUSTOMER_DEFAULT_PAGE_NUMBER,
        pageSize: CUSTOMER_DEFAULT_PAGE_SIZE,
    },
    sort: ['id:desc']
}

export const CUSTOMER_DEFAULT_QUERY_STRING = qs.stringify(CUSTOMER_DEFAULT_QUERY, {
    encodeValuesOnly: true,
})


export const CUSTOMER_DEFAULT_SEX_FILTER_OPTIONS: SexFilterInterface = {
    male: true,
    female: true,
    other: true
}
export const CUSTOMER_SORT_LIST = [
    ['id:desc', 'ID降順'],
    ['id:asc', 'ID昇順'],
    ['age_group.id:desc', '年齢降順'],
    ['age_group.id:asc', '年齢昇順'],
]
export const CUSTOMER_PAGE_SIZE_LIST = [
    10, 20, 50
]