
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, onStatusChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ 
    id: task.id,
    data: { type: "Task" }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  const handleChange = (e) => {
    onStatusChange(task.id, e.target.value);
  };

  return (
    <div 
      ref={setNodeRef} 
      {...attributes} 
      {...listeners} 
      style={style} 
      className="bg-white rounded-lg border border-gray-200 p-4 mb-3 hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      )}
      <select
        value={task.status}
        onChange={handleChange}
        className="text-sm border border-gray-300 rounded-md px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
    </div>
  );
};

export default TaskCard;