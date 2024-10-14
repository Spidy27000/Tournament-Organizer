import React from 'react'
import { SingleElimination } from '../component/brackets'
const Tournament = () => {

  
  return (
    <div className=' p-9 flex flex-col gap-12'>
      <div>
        <h1 className=" font-extrabold text-[3.5rem]">Public</h1>
      </div>
      <div>
        <h1 className=" font-extrabold text-[3.5rem]">
          Private
          {/*testing bracket generation*/}
          <SingleElimination/>
        </h1>
      </div>
    </div>
  )
}

export default Tournament