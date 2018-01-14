let Account = require('./account.js')
class TodoApp {
  constructor() {
    this.allAccount = {};
    this.totalAccounts = 0;
  }
  addAccount(userName) {
    this.totalAccounts++;
    this.allAccount[userName] = new Account(userName);
  }
  addTodoList(userName, title, description) {
    this.allAccount[userName].addTodoList(title, description)
  }
  removeTodoList(userName, todoNo) {
    delete this.allAccount[userName].removeTodoList(todoNo);
  }
  changeTitle(userName, todoNo, newTitle) {
    this.allAccount[userName].changeTitle(todoNo,newTitle);
  }
  getDescription(userName,todoNo) {
    return this.allAccount[userName].getDescription(todoNo);
  }
  changeDescription(userName,todoNo,newDescription) {
    this.allAccount[userName].changeDescription(todoNo,newDescription);
  }
  addTask(userName,todoNo,task) {
    this.allAccount[userName].addTask(todoNo,task);
  }
  taskDone(userName,todoNo, taskNo) {
    this.allAccount[userName].taskDone(todoNo,taskNo);
  }
  taskNotDone(userName,todoNo, taskNo) {
    this.allAccount[userName].taskNotDone(todoNo,taskNo);
  }
  isDone(userName,todoNo, taskNo) {
    return this.allAccount[userName].isDone(todoNo,taskNo);
  }
  changeTask(userName,todoNo,taskNo){
    this.allAccount[userName].changeTask(todoNo,taskNo);
  }
  getTasks(userName,todoNo) {
    return this.allAccount[userName][todoNo].items;
  }
  getTotalTodoCount(userName) {
    return this.allAccount[userName].getTotalTodoCount();
  }
  getTotalTaskCount(userName,todoNo) {
    return this.allAccount[userName].getTotalTaskCount(todoNo);
  }
  getTotalAccounts(){
    return this.totalAccounts;
  }
  getTitle(userName,todoNo) {
    return this.allAccount[userName].getTitle(todoNo);
  }
}

module.exports=TodoApp;
