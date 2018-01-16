let Account = require('./account.js')
class TodoApp {
  constructor() {
    this.allAccount = [];
    this.totalAccounts = 0;
  }
  addAccount(userName) {
    this.totalAccounts++;
    this.allAccount.push(new Account(userName));
  }
  getAccount(userName){
    return this.allAccount.find((u)=>u.userName==userName);
  }
  addTodoList(userName, title, description) {
    this.getAccount(userName).addTodoList(title, description)
  }
  removeTodoList(userName, todoNo) {
    delete this.getAccount(userName).removeTodoList(todoNo);
  }
  changeTitle(userName, todoNo, newTitle) {
    this.getAccount(userName).changeTitle(todoNo,newTitle);
  }
  changeDescription(userName,todoNo,newDescription) {
    this.getAccount(userName).changeDescription(todoNo,newDescription);
  }
  addTask(userName,todoNo,task) {
    this.getAccount(userName).addTask(todoNo,task);
  }
  taskDone(userName,todoNo, taskNo) {
    this.getAccount(userName).taskDone(todoNo,taskNo);
  }
  taskNotDone(userName,todoNo, taskNo) {
    this.getAccount(userName).taskNotDone(todoNo,taskNo);
  }
  changeTask(userName,todoNo,taskNo){
    this.getAccount(userName).changeTask(todoNo,taskNo);
  }
  isDone(userName,todoNo, taskNo) {
    return this.getAccount(userName).isDone(todoNo,taskNo);
  }
  getAllTodoLists(userName){
    return this.getAccount(userName).getAllTodoLists();
  }
  getTasks(userName,todoNo) {
    return this.getAccount(userName).getTasks(todoNo);
  }
  getTotalTodoCount(userName) {
    return this.getAccount(userName).getTotalTodoCount();
  }
  getTotalTaskCount(userName,todoNo) {
    return this.getAccount(userName).getTotalTaskCount(todoNo);
  }
  getTotalAccounts(){
    return this.totalAccounts;
  }
  getTitle(userName,todoNo) {
    return this.getAccount(userName).getTitle(todoNo);
  }
  getDescription(userName,todoNo) {
    return this.getAccount(userName).getDescription(todoNo);
  }
  getAllAccounts(){
    return this.allAccount;
  }
}
module.exports=TodoApp;
