import axios, { AxiosResponse } from 'axios'

interface Part {
    text:string
}
interface Body {
    contents: {
        parts: Part[];
    }[];
}
export async function ApiHook(api:string, model:string, apiKey:string, body:Body){
    // Add if else logic to use the api on the basis of model selected
    // if(model === 'Gemini'){
    //     let response:AxiosResponse = await axios.post(`${api}?key=${apiKey}`, body)
    //     return response
    // }
    console.log(model)
    let response:AxiosResponse = await axios.post(`${api}?key=${apiKey}`, body)
    return response
}
