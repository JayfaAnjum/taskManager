import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import "tailwindcss";
import { fetchTasks, addTask, deleteTask, updateTask } from '../features/taskSlice';
import type { Task } from '../features/taskSlice';

const TaskManager = () => {
  const [form, setForm] = useState<Task>({ title: '', description: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const dispatch = useAppDispatch();
 const tasks = useAppSelector(state => state.tasks.tasks);


  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateTask({ ...form, id: editId }));
      setEditId(null);
    } else {
      dispatch(addTask(form));
    }
    setForm({ title: '', description: '' });
  };

  const handleEdit = (task: Task) => {
    setForm({ title: task.title, description: task.description });
    setEditId(task.id!);
  };

 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4">
  <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-10 border border-gray-100">
    <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
      <span>📝</span> Task Manager
    </h1>

    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        placeholder="Task Title"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Task Description"
        rows={3}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
      >
        {editId ? '✅ Update Task' : '➕ Add Task'}
      </button>
    </form>

   <ul className="mt-10 space-y-3">
  {tasks.map(task => (
    <li
      key={task.id}
      className="bg-gray-100 border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all px-6 py-4 flex items-center justify-between"
    >
      {/* Left side: Task content */}
      <div className="flex-1">
        <div className="mb-1">
          <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">Title</span>
          <h2 className="text-lg font-bold text-gray-800 mt-1">{task.title}</h2>
        </div>
        <div className="mt-3">
          <span className="text-xs font-semibold text-green-500 uppercase tracking-wide">Description</span>
          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
        </div>
      </div>

      {/* Right side: Action buttons */}
      <div className="flex flex-col-2 gap-2 ml-6 shrink-0 items-center">
        <button
          onClick={() => handleEdit(task)}
          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1.5 rounded-lg transition-all shadow-sm"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => dispatch(deleteTask(task.id!))}
          className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg transition-all shadow-sm"
        >
          🗑 Delete
        </button>
      </div>
    </li>
  ))}
</ul>



  </div>
</div>
 );
}
export default TaskManager;
