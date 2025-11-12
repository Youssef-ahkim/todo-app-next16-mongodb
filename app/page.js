// app/page.js
import AddForm from '@/components/AddForm'
import TaskClient from '@/components/Task'
import clientPromise from '@/lib/mongodb'

export default async function Page() {
  const client = await clientPromise
  const db = client.db('todoApp')
  const tasks = await db.collection('tasks').find().toArray()

  const tasksForClient = tasks.map(t => ({
    id: t._id.toString(),
    task: t.task,
    completed: t.completed,
    created: t.createdAt,
  }))

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center p-8">
      {/* Header */}
      <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
        Todo App
      </h1>


      {/* Form */}
      <div className="w-full max-w-2xl mb-8">
        <AddForm />
      </div>

      {/* Tasks */}
      <div className="w-full max-w-2xl space-y-4">
        {tasksForClient.map(t => (
          <TaskClient key={t.id} taskObj={t} />
        ))}
      </div>
    </div>
  )
}
