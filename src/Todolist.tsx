import React from "react";
import {filterType} from "./App";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskID: number) => void
    switchFilter: (value: filterType) => void
}

export const Todolist = ({title, tasks, removeTask, switchFilter}: PropsType) => {

    const tasksJSX = tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => removeTask(t.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={() => switchFilter('all')}>All</button>
                <button onClick={() => switchFilter('active')}>Active</button>
                <button onClick={() => switchFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}