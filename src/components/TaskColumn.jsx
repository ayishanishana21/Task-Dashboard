import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, onStatusChange }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const getColumnStyles = () => {
    const baseStyles = "flex-1 min-w-[320px] rounded-2xl border-2 p-6 transition-all duration-300 ";
    
    if (isOver) {
      return baseStyles + "scale-105 shadow-2xl border-dashed ";
    }

    switch (title) {
      case "To Do":
        return baseStyles + "bg-gradient-to-b from-slate-50 to-slate-100/80 border-slate-200/60 shadow-sm hover:shadow-md";
      case "In Progress":
        return baseStyles + "bg-gradient-to-b from-blue-50/80 to-blue-100/60 border-blue-200/60 shadow-sm hover:shadow-md";
      case "Done":
        return baseStyles + "bg-gradient-to-b from-green-50/80 to-green-100/60 border-green-200/60 shadow-sm hover:shadow-md";
      default:
        return baseStyles + "bg-gradient-to-b from-gray-50 to-gray-100/80 border-gray-200/60 shadow-sm hover:shadow-md";
    }
  };

  const getHeaderStyles = () => {
    const baseStyles = "text-lg font-bold ";
    switch (title) {
      case "To Do":
        return baseStyles + "text-slate-700";
      case "In Progress":
        return baseStyles + "text-blue-700";
      case "Done":
        return baseStyles + "text-green-700";
      default:
        return baseStyles + "text-gray-700";
    }
  };

  const getCountBadgeStyles = () => {
    switch (title) {
      case "To Do":
        return "bg-slate-500 text-white";
      case "In Progress":
        return "bg-blue-500 text-white";
      case "Done":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={getColumnStyles()}
    >

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/60">
        <div className="flex items-center gap-3">
          <h2 className={getHeaderStyles()}>{title}</h2>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCountBadgeStyles()}`}>
            {tasks.length}
          </span>
        </div>
        <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4 min-h-[200px]">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      </SortableContext>
   
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm font-medium">No tasks yet</p>
          <p className="text-gray-400 text-xs mt-1">Drag tasks here or create new ones</p>
        </div>
      )}
    </div>
  );
};

export default TaskColumn;