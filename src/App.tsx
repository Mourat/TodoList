import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";
import {v1} from "uuid";

export type filterType = 'all' | 'completed' | 'active'

export function App() {
    // Tasks local state
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
    ])

    // Filter's local state
    const [filter, setFilter] = useState<filterType>('all')
    // Show all tasks by default
    let tasksForTodolist = tasks
    // Show only tasks with isDone false
    if (filter === 'active') tasksForTodolist = tasks.filter(t => !t.isDone)
    // Show only tasks with isDone true
    if (filter === 'completed') tasksForTodolist = tasks.filter(t => t.isDone)

    // Remove task from state by ID
    const removeTask = (taskID: string) => {
        let filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    // Change filter's state
    const switchFilter = (value: filterType) => {
        setFilter(value)
    }

    // Add new task received from Todolist component
    const addTask = (title:string) => {
        // New task
        let task: TaskType = { id: v1(), title: title, isDone: false }
        // Create new state from current state & new task
        let newTasks = [task, ...tasks]
        // Send to state
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                switchFilter={switchFilter}
                addTask={addTask}
            />
        </div>
    );
}