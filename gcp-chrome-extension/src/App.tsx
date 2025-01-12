import { useRef, useState } from 'react'
import prompt from './configs/prompt.json'
import bodyObject from './configs/body.json'
import './App.css'
import config from './configs/config.json'
import {ApiHook} from './ApiCalls/ApiHook'

interface Part {
  text:string
}

interface BodyObject {
  contents: {
    parts: Part[];
  }[];
}
function App() {
  const [selectedModal, setSelectedModal] = useState("")
  const [partsData, setPartsData] = useState<Part[]>([prompt])
  const [body, setBody] = useState(bodyObject)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  let apiKey = useRef<string>("")

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setSelectedModal(e.target.value)
  }

  const handleSubmitClicked = async(e:React.FormEvent) => {
    e.preventDefault()
    console.log("Clciked")
    const updatedParts:BodyObject = bodyObject
    updatedParts.contents[0].parts = partsData
    let resp = await ApiHook(config.GEMINI_API, selectedModal, apiKey.current, body)
    console.log(resp, "resp")
    if(resp.status == 200){
      setIsAuthenticated(true)
      let data = resp.data.candidates[0].content.parts[0]
      setPartsData([...partsData,data])
      console.log(resp)
      console.log(isAuthenticated)
      setBody(bodyObject)
    }
  }

  return (
    <div className='apikey-modal'>
      <p className="header">
        GCP Guide
      </p>
      <div className="dropdown-input">
        <select
          value={selectedModal}
          onChange={handleChange}
        >
          <option value="">Select the Modal</option>
          <option value="Gemini">Gemini</option>
          <option value="OpenAI">OpenAI</option>
        </select>

        <div className='apikey-holder'>
          {
            selectedModal=='Gemini' || selectedModal == 'OpenAI'?
            (
              <form onSubmit={handleSubmitClicked}>
                <input type='text' placeholder={`Enter your ${selectedModal} API key`} onChange={(e)=> apiKey.current=e.target.value} />
                <button type='submit' className=''>Submit</button>
              </form>
            ):""
          }
        </div>
       
        
      </div>
      
    </div>
  )
}

export default App
