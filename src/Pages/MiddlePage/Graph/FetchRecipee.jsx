import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import { firebaseLooper } from '../../../utils/tools'
import TestData from '../../Tests/TestData'
import GraphData from './GraphData'
import GraphDataRecipee from './GraphDataRecipee'

const FetchRecipee = ({title}) => {
   
    const [rData, setRData] = useState([])
   const  rid =`${title}`
    console.log(rid)
    useEffect(() => {
        db.collection('recipeeData').where('rid', '==', rid).onSnapshot(doc => {
            const data = firebaseLooper(doc)
           setRData(data)
           
        })
    },[])
   
  
    return (
        <div>
          <h1>{rid}</h1>
           <GraphData data={rData}/>
        </div>
    )
}

export default FetchRecipee
