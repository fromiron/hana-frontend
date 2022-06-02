export default function dateConvertor() {

    function datetimeToString(dateTimeString: string|null) {
        if(!dateTimeString){
            return ''
        }
        const a = dateTimeString.split('T');
        const date = a[0];
        const time = a[1].split('.')[0]
        return `${date} ${time}`
    }

    return {datetimeToString}
}