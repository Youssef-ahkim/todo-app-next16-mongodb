'use client'
import React from 'react'
import { addTask } from '@/app/actions/taskActions'

const AddForm = () => {
  return (
    <form
      action={addTask}
      className="my-7 w-full max-w-2xl mx-auto mt-5
        bg-gray-900/80 backdrop-blur-xl border border-gray-700/40 
        p-6 sm:p-8 rounded-3xl shadow-md flex flex-col sm:flex-row 
        items-center gap-5 transition-all duration-300 
        hover:shadow-2xl hover:border-blue-500/50 hover:scale-102"
    >
      <div className="w-full flex-1">
        <label
          htmlFor="task"
          className="block text-gray-200 text-lg font-semibold mb-2 tracking-wide"
        >
          Add a New Task
        </label>

        <div className="flex items-center gap-3">
          <input
            id="task"
            name="task"
            type="text"
            placeholder="What needs to be done?"
            className="flex-1 px-5 py-3 rounded-2xl 
              bg-gray-800/60 text-white placeholder-gray-400 
              shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-70
              transition-all duration-200"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 cursor-pointer
              text-white font-semibold px-6 py-3 rounded-2xl shadow-sm hover:shadow-md 
              transition-all duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddForm
