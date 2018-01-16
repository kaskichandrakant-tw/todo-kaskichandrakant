const fs = require('fs');
const Todo = require('./todo.js');
class Account {
  constructor(userName) {
    this.userName = userName;
    this.srNo = 0;
    this.totalTodoCount = 0;
    this.todoLists = {};
  }
  addTodoList(todo, description) {
    this.addSrNo();
    this.increaseTodoCount();
    this.todoLists[this.srNo] = new Todo(todo, description);
  }
  removeTodoList(todoNo) {
    this.decreaseTodoCount();
    delete this.todoLists[todoNo];
  }
  changeTitle(todoNo, newTitle) {
    let todoList = this.todoLists[todoNo]
    todoList.changeTitle(newTitle);
  }
  getTitle(todoNo) {
    return this.todoLists[todoNo].getTitle()
    //return todoList.getTitle();
  }
  getDescription(todoNo) {
    let todoList = this.todoLists[todoNo]
    return todoList.getDescription();
  }
  changeDescription(todoNo, newDescription) {
    let todoList = this.todoLists[todoNo]
    todoList.changeDescription(newDescription);
  }
  addTask(todoNo, task) {
    this.todoLists[todoNo].addTask(task)
    //todoList.addTask(task);
  }
  changeTask(todoNo,itemNo,newTask){
    this.todoLists[todoNo].changeTask(itemNo,newTask)
  }
  taskDone(todoNo, taskNo) {
    let todoList = this.todoLists[todoNo]
    todoList.taskDone(taskNo);
  }
  taskNotDone(todoNo, taskNo) {
    let todoList = this.todoLists[todoNo]
    todoList.taskNotDone(taskNo);
  }
  isDone(todoNo, taskNo) {
    let todoList = this.todoLists[todoNo]
    return todoList.isDone(taskNo);
  }
  getTasks(todoNo) {
    return this.todoLists[todoNo].items;
  }
  getSrNo() {
    return this.srNo;
  }
  addSrNo() {
    this.srNo++;
  }
  getAllTodoLists(){
    return this.todoLists;
  }
  increaseTodoCount() {
    this.totalTodoCount++;
  }
  decreaseTodoCount() {
    this.totalTodoCount--;
  }
  getTotalTodoCount() {
    return this.totalTodoCount;
  }
  getTotalTaskCount(todoNo) {
    return this.todoLists[1].getTotalTaskCount();
  }
}
module.exports = Account;
