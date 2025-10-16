
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-full mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
              <p className="text-gray-600 mt-1">Organize and track your tasks efficiently</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              + Add Task
            </button>
          </div>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 flex-wrap">
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