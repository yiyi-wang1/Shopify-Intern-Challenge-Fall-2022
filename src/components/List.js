import React, {useState,useEffect} from 'react'
import Item from './Item'

function List() {
    const [input, setInput] = useState('')
    const [engine, setEngine] = useState('text-curie-001')
    const [items, setItems] = useState([])

    const handleChange = e => {
        setInput(e.target.value);
    }

    const handleSelectChange = e => {
        setEngine(e.target.value);
    }

    useEffect(() => {
        }, [engine]);
      
    const handleSubmit = e => {
        e.preventDefault();
        // fetchData(input);

        const data = {
            prompt: `${input}`,
            temperature: 0.5,
            max_tokens: 64,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        };

        setIsLoading(true);
        fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
            body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
                const newItem = {
                    text: input,
                    result: data.choices[0].text
                }
                setIsLoading(false);
                const newList = [newItem, ...items]
                setItems(newList);})

        setInput('')
    };


  return (
    <div>
        <h1>Enter prompt</h1>
        <form className='form' onSubmit={handleSubmit}>
            <input type='text' 
            placeholder='Enter prompt' 
            value={input}
            name='text'
            className= 'form-input'
            onChange={handleChange}
            />
            <select value={engine} onChange ={handleSelectChange} className ='select'>
                <option value = 'text-curie-001'>text-curie-001</option>
                <option value = 'text-davinci-002'>text-davinci-002</option>
                <option value = 'text-babbage-001'>text-babbage-001</option>
                <option value = 'text-ada-001'>text-ada-001</option>
            </select>
            <button className='submit-button'>Submit Prompt</button>
 
        </form>
        <Item
            items ={items} 
        ></Item>
    </div>
  )
}

export default List