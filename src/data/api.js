import { typeOfData } from "./data"

export const fetchData = async ( type ) => {
    try {
        const response = await fetch(typeOfData.find(item => item.name === type).url)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}