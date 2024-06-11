// Instructions:
// Analyze the Code: Look at the provided code and identify the parts that are not efficient in terms of time and space complexity.
// Optimize the Code: Rewrite the parts of the code that you identified as inefficient. Make sure to improve the time and/or space complexity.
// Present Your Changes: Comment your optimized code to explain what changes you made and why.

import React, { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(false);

  const addTask = () => {
    const updatedTasks = tasks.concat({
      id: tasks.length + 1,
      title: newTaskTitle,
      completed: false,
    });
    setTasks(updatedTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const filterTasks = () => {
    const filtered = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === filterCompleted) {
        filtered.push(tasks[i]);
      }
    }
    return filtered;
  };

  const countCompletedTasks = () => {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].completed) {
        count++;
      }
    }
    return count;
  };

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Pending"}
            <button onClick={() => toggleTask(task.id)}>Toggle</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="New Task Title"
      />
      <button onClick={addTask}>Add Task</button>
      <h2>Filtered Tasks (Completed: {filterCompleted.toString()}):</h2>
      <ul>
        {filterTasks().map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Pending"}
          </li>
        ))}
      </ul>
      <h2>Completed Tasks Count: {countCompletedTasks()}</h2>
      <button onClick={() => setFilterCompleted(!filterCompleted)}>
        Toggle Filter Completed
      </button>
    </div>
  );
};

export default App;
