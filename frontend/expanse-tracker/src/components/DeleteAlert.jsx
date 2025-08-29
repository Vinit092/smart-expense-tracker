import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <>
      <div>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end mt-6'>
            <button
            type='button'
            className='add-btn add-btn-fill hover:bg-purple-900 duration-300'
            onClick={onDelete}
            >
                Delete
            </button>
        </div>
      </div>
    </>
  )
}

export default DeleteAlert
