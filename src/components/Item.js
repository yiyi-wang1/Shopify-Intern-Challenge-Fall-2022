import React from 'react'

function Item({items}) {
  return items.map((item, index) =>(
      <div className= 'item' key ={index}>
          <div className= 'subtitle'>Prompt: </div>
          <div>
              {item.text}
          </div>
          <br />
          <div className= 'subtitle'>Response: </div>
          <div>
              {item.result}
          </div>
      </div>
  ))
}

export default Item