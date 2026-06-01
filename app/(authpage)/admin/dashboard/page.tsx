import React from 'react'
import ChartBarCategory from './category'
import CustomizeLabels from './price-distribution'

const Dashboard = () => {
  return (
    <div>
        <CustomizeLabels/>
        <ChartBarCategory/>

    </div>
  )
}

export default Dashboard