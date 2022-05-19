import {ChartDataInterface} from "@/components/PetTypeChart";

export default function calculator() {
    function percent(value: number, totalValue: number) {
        console.log(value, totalValue)
        console.log((value / totalValue * 100).toFixed(1))
        return (value / totalValue * 100).toFixed(1);
    }

    return {percent}
}
