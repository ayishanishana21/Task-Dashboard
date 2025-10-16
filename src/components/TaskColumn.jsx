
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, onStatusChange }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  const getColumnStyles = () => {
    switch (title) {
      case "To Do":
        return "bg-slate-50 border-slate-200";
      case "In Progress":
        return "bg-blue-50 border-blue-200";
      case "Done":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getHeaderStyles = () => {
    switch (title) {
      case "To Do":
        return "text-slate-700";
      case "In Progress":
        return "text-blue-700";
      case "Done":
        return "text-green-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[300px] rounded-lg border-2 ${getColumnStyles()} p-4`}
    >
      <div className="mb-4">
        <h2 className={`text-lg font-semibold ${getHeaderStyles()}`}>
          {title}
        </h2>
        <span className="text-sm text-gray-500">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
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
        <div className="text-center py-8 text-gray-400 text-sm">
          No tasks yet
        </div>
      )}
    </div>
  );
};

export default TaskColumn;