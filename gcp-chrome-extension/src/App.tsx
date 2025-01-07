import { useState } from 'react'
import './App.css'

function App() {
  const [selectedModal, setSelectedModal] = useState("")
  const [apikey, setApiKey] = useState(null)

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setSelectedModal(e.target.value)
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
            selectedModal=='Gemini' || selectedModal == 'OpenAI'?(<input placeholder={`Enter your ${selectedModal} API key`} />):""
          }
        </div>
        {
          selectedModal=='Gemini' || selectedModal == 'OpenAI'?<button className=''>Submit</button>:""
        }
        
      </div>
      
    </div>
  )
}

export default App
