import React, { useEffect, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import TaskColumn from "./components/TaskColumn";
import AddTaskModal from "./components/AddTaskModal";
import { fetchTasks, addTask, updateTask } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadTasks = async () => {
    try {
      const res = await fetchTasks();
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const res = await addTask(task);
      setTasks([...tasks, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateTask(id, { status });
      setTasks(tasks.map((t) => (t.id === id ? { ...t, status } : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const columns = ["To Do", "In Progress", "Done"];

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const destinationColumnId = over.id;

    if (columns.includes(destinationColumnId)) {
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.status !== destinationColumnId) {
        await handleStatusChange(taskId, destinationColumnId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-green-200 to-cyan-200 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-full mx-auto p-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-white/60 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#003E64] to-[#005a8c]"></div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Task Management
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Organize and track your tasks efficiently</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative px-6 py-3 bg-gradient-to-r from-[#003E64] to-[#005a8c] hover:from-[#003E64] hover:to-[#005a8c] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
            >
              <span className="relative z-10">+ Add Task</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 flex-wrap lg:flex-nowrap">
            {columns.map((col) => (
              <SortableContext key={col} items={tasks.filter((t) => t.status === col).map((t) => t.id)}>
                <TaskColumn
                  title={col}
                  tasks={tasks.filter((t) => t.status === col)}
                  onStatusChange={handleStatusChange}
                />
              </SortableContext>
            ))}
          </div>
        </DndContext>

        <AddTaskModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  );
}

export default App;