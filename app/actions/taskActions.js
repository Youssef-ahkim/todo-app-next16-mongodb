'use server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { revalidatePath } from 'next/cache' // ✅ 1. IMPORTED THIS

export async function addTask(formData) {
  const taskText = formData.get('task')
  if (!taskText) return

  try { // ✅ 3. ADDED TRY/CATCH
    const client = await clientPromise
    const db = client.db('todoApp')
    const result = await db.collection('tasks').insertOne({
      task: taskText,
      completed: false,
      createdAt: new Date(),
    })

    revalidatePath('/') // ✅ 2. ADDED REVALIDATION

    return {
      id: result.insertedId.toString(),
      task: taskText,
      completed: false,
    }
  } catch (error) {
    console.error('Error adding task:', error)
    return { error: 'Failed to add task.' }
  }
}

export async function deleteTask(id) {
  if (!id) return

  try { // ✅ 3. ADDED TRY/CATCH
    const client = await clientPromise
    const db = client.db('todoApp')

    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) })

    revalidatePath('/') // ✅ 2. ADDED REVALIDATION

    return result
  } catch (error) {
    console.error('Error deleting task:', error)
    return { error: 'Failed to delete task.' }
  }
}

export async function toggleComplete(id) {
  if (!id) return

  try { // ✅ 3. ADDED TRY/CATCH
    const client = await clientPromise
    const db = client.db('todoApp')
    const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) })

    if (!task) {
        return { error: 'Task not found' }
    }

    const result = await db
      .collection('tasks')
      .updateOne({ _id: new ObjectId(id) }, { $set: { completed: !task.completed } })

    revalidatePath('/') // ✅ 2. ADDED REVALIDATION
    
    return result
  } catch (error) {
    console.error('Error toggling task:', error)
    return { error: 'Failed to toggle task.' }
  }
}


export async function editTask(formData) {
  const taskId = formData.get('id') // get task id
  const taskText = formData.get('task') // get new task text
  if (!taskId || !taskText) return { error: 'Missing task id or text' }

  try {
    const client = await clientPromise
    const db = client.db('todoApp')

    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { task: taskText } }
    )

    revalidatePath('/') // revalidate home page

    if (result.modifiedCount === 1) {
      return { id: taskId, task: taskText }
    } else {
      return { error: 'No task was updated.' }
    }
  } catch (error) {
    console.error('Error editing task:', error)
    return { error: 'Failed to edit task.' }
  }
}
