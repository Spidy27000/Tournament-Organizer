import React from 'react'
import Brackets from '../component/Brackets'
import SingleElimination from '../component/SingleElimination'
import LadderTournamentCard from '../component/LadderTournamentCard'

const Tournament = () => {

  
  return (
    <div className=' p-9 flex flex-col gap-12'>
      <div>
        <h1 className=" font-extrabold text-[3.5rem]">Public</h1>
      </div>
      <div>
        <h1 className=" font-extrabold text-[3.5rem]">Private</h1>
        <LadderTournamentCard/>
      </div>
    </div>
  )
}

export default Tournament