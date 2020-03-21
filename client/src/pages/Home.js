import React,{useState} from 'react'
import CardContainer from '../component/CardContainer'
import cards from '../Temp/cards'
const Home = props => {

  const [sideOpen, setSideOpen]= useState(false)
 const handleSide=()=>{
	setSideOpen(!sideOpen)
 }
  return (
    <div className={`${sideOpen&&"active"}`} id="main-wrapper">
     
      <div id="main-content">
        <div className="container-fluid">
          <h4 className="text-white mt-4">Tablero</h4>
          <div className="container-fluid">
            <CardContainer cards={cards} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
