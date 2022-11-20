export function TwoDigitFormat(num: number) {
    return num.toLocaleString("pt", { 
        minimumIntegerDigits: 2,
        useGrouping: false
     })
}