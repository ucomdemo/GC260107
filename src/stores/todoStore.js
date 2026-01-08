import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const nextId = ref(1)

  function addTodo(text) {
    todos.value.push({
      id: nextId.value++,
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    })
  }

  function removeTodo(id) {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  function updateTodo(id, newText) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.text = newText
    }
  }

  function toggleTodo(id) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  return {
    todos,
    addTodo,
    removeTodo,
    updateTodo,
    toggleTodo
  }
})
