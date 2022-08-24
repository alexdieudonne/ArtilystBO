
export function getEnumValues(val: object): Array<Option> {
    const types = (Object.keys(val) as Array<keyof typeof val>).map((key) => {
        const selects = {
            label: val[key],
            value: key
        }
        return selects
    })
    return types
}

type Option = {
    label: string,
    value: string
  }