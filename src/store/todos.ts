import { type Todo } from "../interfaces/Todo";

interface TodoState {
  items: Todo[]
}

const TODO_ADD = "todos/add";
const TODO_TOGGLE = "todos/toggle";
const TODO_DELETE = "todos/delete";
const TODO_CLEAR_COMPLETED = "todos/clearCompleted"

export const actions = {
  addTodo: (text: string) => { return { type: TODO_ADD, payload: text } as const; },
  toggleTodo: (id: number) => { return { type: TODO_TOGGLE, payload: id } as const; },
  deleteTodo: (id: number) => { return { type: TODO_DELETE, payload: id } as const; },
  clearCompletedTodos: () => {return {type: TODO_CLEAR_COMPLETED} as const } 
}

type TodoAction =
  | ReturnType<typeof actions.addTodo>
  | ReturnType<typeof actions.deleteTodo>
  | ReturnType<typeof actions.toggleTodo>
  | ReturnType<typeof actions.clearCompletedTodos>

export const initialState: TodoState = {
  items: [],
};

let nextTodoId = 0;

export function todoReducer(state: TodoState = initialState, action: TodoAction): TodoState {
  switch (action.type) {
    case TODO_ADD: 
      return {
        ...state,
        items: [
          ...state.items,
          {id: nextTodoId++, text: action.payload, completed: false}
        ]
      }
    case TODO_TOGGLE: 
      return {
        ...state,
        items: state.items.map(item => {
          return item.id === action.payload ? {...item, completed: !item.completed} : item
        })
      }
    case TODO_DELETE: 
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case TODO_CLEAR_COMPLETED:
      return {
        ...state,
        items: state.items.filter(item => item.completed !== true)
      }
    default: 
      return state
  }
}
