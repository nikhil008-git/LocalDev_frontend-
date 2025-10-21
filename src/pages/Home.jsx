import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    
   <div className="flex flex-col space-y-4">
  <Link to="/android">Android Beta</Link>
  <Link to="/apora">Apora</Link>
  <Link to="/ios">iOS Beta</Link>
  <Link to="/perplexiy">Perplexiy</Link>
  <Link to="/summary">Summary</Link>
</div>
</>

  ) 
}

export default Home