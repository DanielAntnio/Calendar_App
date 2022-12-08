export function TwoDigitFormat(value: number | string) {
    return value.toLocaleString("pt", {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
}