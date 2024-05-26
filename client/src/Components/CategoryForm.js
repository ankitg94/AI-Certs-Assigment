import React from 'react'

const CategoryForm = ({handleSubmit,value,setvalue}) => {
  return (
    <>
    <form onClick={handleSubmit}>
        <input 
        value={value}
        onChange={(e)=>setvalue(e.target.value)}        
        />
        <button type="submit" className='btn-btn-primary'>Submit</button>
    </form>
    </>
  )
}
export default CategoryForm
