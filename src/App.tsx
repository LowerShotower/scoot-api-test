import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const App = () => {

  const [familyTree, setFamilyTree] = useState<any[]>([])
  useEffect(() => {
    const fetch = async() => {
      const res = await axios.get('https://mockend.com/LowerShotower/scoot-api-test/users')
      
      console.log(JSON.stringify(res.data))
      console.log(res.data)

    }
    fetch()
  }, [])

  return (
    <div className="">
      <h3>hello</h3>
      {familyTree?.map(({name})=>{
        return <h3>{name}</h3>
      })}
      </div>
  );
}

export default App;
