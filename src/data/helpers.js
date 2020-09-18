export const createObjFromData = (newData, array) => {
    return array.reduce((acc, cur) => {
        if (cur.parent === 0) {
            acc[cur.name] = newData[cur.name]
        } else {
            const parent = array.find(item => item.id === cur.parent).name
            const newObj = { [cur.name]: newData[cur.name] }
            acc[parent] = { ...acc[parent], ...newObj }
        }
        return acc
    }, {})
}