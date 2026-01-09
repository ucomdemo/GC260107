<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <!-- Hero Image -->
        <div class="hero-section text-center mb-4">
          <img 
            src="/chrysanthemum-hero.svg" 
            alt="菊花 - 待辦事項管理" 
            class="hero-image rounded shadow-lg mb-3"
          />
          <h1 class="display-4 fw-bold text-chrysanthemum mb-2">🌼 待辦事項清單 🌼</h1>
          <p class="lead text-muted">讓您的任務管理更加優雅高效</p>
        </div>
        
        <!-- Add Todo Form -->
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <form @submit.prevent="handleAddTodo" class="d-flex gap-2">
              <input
                v-model="newTodoText"
                type="text"
                class="form-control"
                placeholder="輸入新的待辦事項..."
                required
              />
              <button type="submit" class="btn btn-chrysanthemum px-4">
                <i class="bi bi-plus-circle"></i> 新增
              </button>
            </form>
          </div>
        </div>

        <!-- Todo List -->
        <div v-if="todoStore.todos.length === 0" class="text-center text-muted py-5">
          <p class="lead">目前沒有待辦事項</p>
          <p>開始新增您的第一個待辦事項吧！</p>
        </div>

        <div v-else class="list-group shadow-sm">
          <div
            v-for="todo in todoStore.todos"
            :key="todo.id"
            class="list-group-item"
          >
            <div class="d-flex align-items-center gap-3">
              <!-- Checkbox -->
              <input
                type="checkbox"
                :checked="todo.completed"
                @change="todoStore.toggleTodo(todo.id)"
                class="form-check-input mt-0 flex-shrink-0"
                style="width: 1.5rem; height: 1.5rem;"
              />

              <!-- Todo Text or Edit Input -->
              <div class="flex-grow-1">
                <div v-if="editingId !== todo.id">
                  <span
                    :class="{ 'text-decoration-line-through text-muted': todo.completed }"
                    class="d-block"
                  >
                    {{ todo.text }}
                  </span>
                  <small class="text-muted">
                    建立時間: {{ formatDate(todo.createdAt) }}
                  </small>
                </div>
                <input
                  v-else
                  v-model="editText"
                  type="text"
                  class="form-control"
                  @keyup.enter="handleUpdateTodo(todo.id)"
                  @keyup.esc="cancelEdit"
                  :ref="el => { if (el && editingId === todo.id) editInputRef = el }"
                />
              </div>

              <!-- Action Buttons -->
              <div class="d-flex gap-2 flex-shrink-0">
                <template v-if="editingId !== todo.id">
                  <button
                    @click="startEdit(todo)"
                    class="btn btn-sm btn-outline-chrysanthemum"
                    title="編輯"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    @click="handleDeleteTodo(todo.id)"
                    class="btn btn-sm btn-outline-danger"
                    title="刪除"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="handleUpdateTodo(todo.id)"
                    class="btn btn-sm btn-success"
                    title="儲存"
                  >
                    <i class="bi bi-check-lg"></i>
                  </button>
                  <button
                    @click="cancelEdit"
                    class="btn btn-sm btn-secondary"
                    title="取消"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div v-if="todoStore.todos.length > 0" class="mt-3 text-center text-muted">
          <small>
            總計: {{ todoStore.todos.length }} 項 | 
            已完成: {{ completedCount }} 項 | 
            未完成: {{ uncompletedCount }} 項
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
const newTodoText = ref('')
const editingId = ref(null)
const editText = ref('')
const editInputRef = ref(null)

const completedCount = computed(() => {
  return todoStore.todos.filter(todo => todo.completed).length
})

const uncompletedCount = computed(() => {
  return todoStore.todos.filter(todo => !todo.completed).length
})

function handleAddTodo() {
  if (newTodoText.value.trim()) {
    todoStore.addTodo(newTodoText.value.trim())
    newTodoText.value = ''
  }
}

function handleDeleteTodo(id) {
  if (confirm('確定要刪除此待辦事項嗎？')) {
    todoStore.removeTodo(id)
  }
}

function startEdit(todo) {
  editingId.value = todo.id
  editText.value = todo.text
  nextTick(() => {
    if (editInputRef.value) {
      editInputRef.value.focus()
    }
  })
}

function handleUpdateTodo(id) {
  if (editText.value.trim()) {
    todoStore.updateTodo(id, editText.value.trim())
    cancelEdit()
  }
}

function cancelEdit() {
  editingId.value = null
  editText.value = ''
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.hero-section {
  animation: fadeIn 0.8s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border: 4px solid #d97706;
}

.text-chrysanthemum {
  color: #d97706;
}

.btn-chrysanthemum {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-chrysanthemum:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
}

.btn-outline-chrysanthemum {
  border: 1px solid #d97706;
  color: #d97706;
  transition: all 0.3s ease;
}

.btn-outline-chrysanthemum:hover {
  background-color: #d97706;
  color: white;
  transform: translateY(-1px);
}

.list-group-item {
  border-left: 4px solid #d97706;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.95);
}

.list-group-item:hover {
  background-color: #fffbeb;
  border-left-color: #f59e0b;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.15);
}

.form-check-input:checked {
  background-color: #d97706;
  border-color: #d97706;
}

.card {
  border: 2px solid #fde68a;
  background-color: rgba(255, 255, 255, 0.95);
}
</style>
