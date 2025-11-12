'use client'
import React, { useState } from 'react'
import { FiTrash2, FiCheck, FiEdit, FiX } from 'react-icons/fi'
import { deleteTask, toggleComplete, editTask } from '@/app/actions/taskActions'

const TaskClient = ({ taskObj }) => {
  const [isEditing, setIsEditing] = useState(false) // Track if the task is being edited
  const [taskText, setTaskText] = useState(taskObj.task) // Local state for the task text

  // --- COMPLETE TASK ---
  const handleComplete = async () => {
    if (isEditing) return // Disable completing while editing
    await toggleComplete(taskObj.id) // Call server action to toggle completion
  }

  // --- DELETE TASK ---
  const handleDelete = async () => {
    if (isEditing) return // Disable deleting while editing
    await deleteTask(taskObj.id) // Call server action to delete
  }

  // --- CANCEL EDIT ---
  const handleCancelEdit = () => {
    setIsEditing(false) // Exit edit mode
    setTaskText(taskObj.task) // Revert text to original
  }

  // --- SUBMIT EDIT ---
  const handleEditSubmit = async () => {
    if (taskText.trim() === '' || taskText === taskObj.task) {
      setTaskText(taskObj.task) // Revert if empty or unchanged
      setIsEditing(false)
      return
    }

    const formData = new FormData()
    formData.append('id', taskObj.id)
    formData.append('task', taskText)

    const result = await editTask(formData) // Call server action to edit
    if (result?.error) {
      alert(result.error) // Show error if failed
      setTaskText(taskObj.task) // Revert text
    }
    setIsEditing(false)
  }

  // Format the task creation date
  const formattedDate = new Date(taskObj.created).toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div 
      className={`w-full max-w-2xl mx-auto flex justify-between items-center 
        bg-gray-900/80 backdrop-blur-xl p-5 rounded-3xl shadow-md
        border border-gray-700/40 hover:shadow-2xl hover:border-blue-500/50
        hover:scale-102 transition-all duration-300 mb-4`}
    >
      {/* --- TASK TEXT / INPUT --- */}
      <div className="flex-1 mr-4">
        {isEditing ? (
          // Input field when editing
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()} // Submit on Enter
            autoFocus
            className="w-full bg-gray-800/60 text-white text-lg font-semibold p-3 rounded-2xl
              shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-70
              transition-all duration-200"
          />
        ) : (
          // Display task text
          <div 
            className={`text-white text-lg font-semibold ${taskObj.completed ? 'line-through text-gray-500' : ''} 
              transition-all duration-200 cursor-text`}
            onClick={() => !taskObj.completed && setIsEditing(true)} // Click to edit
          >
            {taskText}
          </div>
        )}
        {/* Task creation date */}
        {taskObj.created && (
          <div className="text-gray-400 text-xs italic mt-1">
            {formattedDate}
          </div>
        )}
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="flex gap-3">
        {/* COMPLETE BUTTON */}
        <button 
          onClick={handleComplete} 
          disabled={isEditing}
          className={`p-3 rounded-xl cursor-pointer
            ${taskObj.completed ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-700/60 hover:bg-green-500 text-gray-300 hover:text-white'}
            transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <FiCheck size={20} />
        </button>

        {/* DELETE BUTTON */}
        <button 
          onClick={handleDelete} 
          disabled={isEditing}
          className="p-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiTrash2 size={20} />
        </button>

        {/* EDIT / SAVE / CANCEL BUTTONS */}
        {isEditing ? (
          <>
            {/* CANCEL EDIT */}
            <button
              onClick={handleCancelEdit}
              className="p-3 rounded-xl bg-gray-600 hover:bg-gray-700 text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <FiX size={20} />
            </button>

            {/* SAVE EDIT */}
            <button
              onClick={handleEditSubmit}
              className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <FiCheck size={20} />
            </button>
          </>
        ) : (
          // EDIT BUTTON
          <button
            onClick={() => setIsEditing(true)}
            className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
          >
            <FiEdit size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default TaskClient
