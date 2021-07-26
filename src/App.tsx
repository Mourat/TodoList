import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";

export type filterType = 'all' | 'completed' | 'active'

export function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
    ])

    let [filter, setFilter] = useState<filterType>('all')
    let tasksForTodolist = tasks
    if (filter === 'active') tasksForTodolist = tasks.filter(t => !t.isDone)
    if (filter === 'completed') tasksForTodolist = tasks.filter(t => t.isDone)

    const removeTask = (taskID: number) => {
        let filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }

    const switchFilter = (value: filterType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasksForTodolist} removeTask={removeTask}
                      switchFilter={switchFilter}/>
        </div>
    );
}