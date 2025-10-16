import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, onStatusChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: task.id,
    data: { type: "Task" }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.6 : 1,
  };

  const handleChange = (e) => {
    onStatusChange(task.id, e.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "border-l-slate-400";
      case "In Progress":
        return "border-l-blue-400";
      case "Done":
        return "border-l-green-400";
      default:
        return "border-l-gray-400";
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      {...attributes} 
      {...listeners} 
      style={style} 
      className={`group bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/60 p-5 mb-2 hover:shadow-lg transition-all duration-300 border-l-4 ${getStatusColor(task.status)} ${
        isDragging ? "shadow-2xl scale-105" : "hover:scale-[1.02]"
      }`}
    >

      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight pr-2">{task.title}</h3>
      </div>
      

      {task.description && (
        <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3 bg-gray-50/50 rounded-lg p-3">
          {task.description}
        </p>
      )}
      

      <div className="relative">
        <select
          value={task.status}
          onChange={handleChange}
          className="w-full text-sm border border-gray-300/80 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 bg-white/80 backdrop-blur-sm transition-all duration-200 appearance-none cursor-pointer hover:bg-white hover:border-gray-400"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400 font-medium">
          {new Date().toLocaleDateString()}
        </span>
        <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
      </div>
    </div>
  );
};

export default TaskCard;