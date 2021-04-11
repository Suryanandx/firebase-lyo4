import { Card, Container, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useState } from 'react'
import { Doughnut, Pie } from 'react-chartjs-2';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';

const JobGraph = () => {
    const [pending, setPending] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(() => {
        db.collection('jobData').where('status', '==', false).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setPending(data)
        })

        db.collection('jobData').where('status', '==', true).onSnapshot(doc => {
            const data = firebaseLooper(doc)
            setCompleted(data)
        })
    },[])

    const data = {
  labels: [
    'Completed',
    'Pending',
    
  ],
  datasets: [
    {
      
      fill: false,
      lineTension: 0.1,
      backgroundColor: [
      'green',
      '#FAAC0F'
    ],
    hoverOffset: 4,
      borderColor: 'white',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'white',
      pointBackgroundColor: 'white',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#ff7a00',
      pointHoverBorderColor: '#7868e6',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [completed.length, pending.length]
    },
    
  ]
};

    return (
        <Card>
            <Typography variant='h1' align='center'><b>Job Data</b></Typography>
            <Doughnut data={data}/>
            <br/>
            <Alert severity='warning'>Pending Jobs</Alert>
            <br/>
            <Alert severity='success'>Completed Jobs</Alert>
        </Card>
    )
}

export default JobGraph
