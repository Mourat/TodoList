import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filterType} from "./App";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: string) => void
    switchFilter: (value: filterType) => void
    addTask: (title: string) => void
}

export const Todolist = ({title, tasks, removeTask, switchFilter, addTask}: PropsType) => {

    // New task's title in local state
    const [newTitle, setNewTitle] = useState("")

    // Prepare tasks list
    const tasksJSX = tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => removeTask(t.id)}>x</button>
            </li>
        )
    })

    // Send new task to global state in App component
    const addNewTask = () => {
        addTask(newTitle)
        setNewTitle('')
    }

    // Filters
    const showAllTasks = () => { switchFilter('all') }
    const showActiveTasks = () => { switchFilter('active') }
    const showCompletedTasks = () => { switchFilter('completed') }

    // Copy characters from input to local state
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    // Add new task on Enter
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addNewTask()
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={changeTitle} onKeyPress={onKeyPressAddTask} value={newTitle}/>
                <button onClick={addNewTask}>+</button>
            </div>
            <ul>{tasksJSX}</ul>
            <div>
                <button onClick={showAllTasks}>All</button>
                <button onClick={showActiveTasks}>Active</button>
                <button onClick={showCompletedTasks}>Completed</button>
            </div>
        </div>
    )
}