new Vue({
  el: "#app",
  data: {
    newTodo: "",
    search: "",
    searchFeature: false,
    editTaskCache: "",
    allCompleted: true,
    filter: "all",
    id: 4,
    todos: [
      {
        id: 1,
        task: "Homework",
        completed: true,
        editing: false,
      },
      {
        id: 2,
        task: "Go to School",
        completed: false,
        editing: false,
      },
      {
        id: 3,
        task: "Go to Shopping",
        completed: false,
        editing: false,
      },
    ],
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  computed: {
    remainderTodo() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
    allCompletedTodo() {
      return this.remainderTodo === 0;
    },
    filterTodos() {
      if (this.filter === "active") {
        return this.todos.filter((todo) => !todo.completed);
      }
      if (this.filter === "completed") {
        return this.todos.filter((todo) => todo.completed);
      }
      return this.todos;
    },
    showClearCompleted() {
      return this.todos.filter((todo) => todo.completed).length > 0;
    },
    searchTodos() {
      if (this.search.trim() !== "") {
        return this.filterTodos.filter(
          (todo) =>
            todo.task.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      }
      return this.filterTodos;
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === "") {
        return;
      }
      let todo = {
        id: this.id,
        task: this.newTodo,
        completed: false,
        editing: false,
      };
      this.todos.push(todo);
      this.newTodo = "";
      this.id++;
    },
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      // let index = this.todos.findIndex((todo) => todo.id === id);
      // this.todos.splice(index, 1);
    },
    completedTodo(todo) {
      todo.completed = !todo.completed;
    },
    editTodo(todo) {
      this.editTaskCache = todo.task;
      this.todos.forEach((todo) => {
        todo.editing = false;
      });
      todo.editing = true;
    },
    doneEdit(todo) {
      if (todo.task.trim() === "") {
        todo.task = this.editTaskCache;
      }
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.task = this.editTaskCache;
      todo.editing = false;
    },
    allCompletedTask() {
      if (this.remainderTodo === 0) {
        this.allCompleted = true;
      } else {
        this.allCompleted = false;
      }
      this.todos.forEach((todo) => {
        todo.completed = !this.allCompleted;
      });
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
  },
});
