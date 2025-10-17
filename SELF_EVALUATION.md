# Self Evaluation - Task Management Dashboard

## Summary

Implemented a 3-column task board with full drag-and-drop functionality using `@dnd-kit`. Users can add tasks, update their status via dropdown or drag-and-drop. All changes are persisted with a mock API.

## What Went Well

- React component design is modular (TaskCard, TaskColumn, AddTaskModal)
- Drag-and-drop integrated successfully for status updates
- Tasks are persisted using Axios + json-server
- Responsive design using Tailwind CSS

## Challenges Faced

- Ensuring drag-and-drop works seamlessly with API updates
- Maintaining correct state updates after drag events

## Self-Criticism

- Task deletion not implemented
- Could enhance UI animations during drag-and-drop
- Error handling could be more user-friendly

## Improvements

- Add task deletion and editing
- Add better visual feedback while dragging
- Add filtering and search
- Add assigning task

## Technology Rating

- React.js: 9/10
- Tailwind CSS: 8/10
- API Integration: 9/10
- Drag-and-drop (DND Kit): 9/10
- Component Design & State Management: 8/10
