export default function calculator() {
    function percent(value: number, totalValue: number) {
        return (value / totalValue * 100).toFixed(1);
    }

    return {percent}
}
