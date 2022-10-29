export const getColorValueBased = (value: number, danger: number, warning: number) => {
    if (value <= danger)
        return '#E53A3A'
    if (value < warning)
        return '#F9A51A'
    if (value >= warning)
        return '#0B9764'
}