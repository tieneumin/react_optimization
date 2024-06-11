import React, { useState, useMemo, memo } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(false);

  const addTask = () => {
    // can't useMemo if useState setX inside function
    // // Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
    setTasks(
      // why does .push cause error?
      tasks.concat({
        id: tasks.length + 1,
        title,
        completed: false,
      })
    );
    setTitle("");
  };

  const toggleTask = (id) => {
    setTasks(
      // why does forEach cause error?
      tasks.map((t) => {
        if (t.id === id) return { ...t, completed: !t.completed };
        return t;
      })
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => t.completed === filterCompleted);
  }, [tasks, filterCompleted]);

  const completedTasks = () => {
    let count = 0;
    tasks.forEach((t) => (t.completed ? count++ : null));
    return count;
  };

  const List = memo(({ toggle, items }) => (
    <ul>
      {items.map((i) => (
        <li key={i.id}>
          {i.title} - {i.completed ? "Completed" : "Pending"}
          {toggle ? (
            <button onClick={() => toggleTask(i.id)}>Toggle</button>
          ) : null}
        </li>
      ))}
    </ul>
  ));

  return (
    <>
      <h1>Task List</h1>
      <List toggle items={tasks} />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task Title"
      />
      <button onClick={addTask}>Add Task</button>
      <h2>{filterCompleted ? "Completed" : "Pending"} Tasks</h2>
      <List items={filteredTasks} />
      <h2>Completed Tasks Count: {completedTasks()}</h2>
      <button onClick={() => setFilterCompleted(!filterCompleted)}>
        Toggle Filter Completed
      </button>
    </>
  );
}
