const Item = require('./item.js');
class Todo {
  constructor(title,description) {
    this.title=title;
    this.description=description;
    this.srNo=0;
    this.totalItems=0;
    this.items={};
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  addTask(task) {
    this.addSrNo()
    this.increaseTaskCount();
    this.items[this.srNo]=new Item(task);
  }
  changeTitle(newTitle){
    this.title=newTitle;
  }
  changeDescription(newDes){
    this.description=newDes;
  }
  changeTask(srNo,newTask){
    this.items[srNo].changeTask(newTask);
  }
  removeTask(srNo){
    this.decreaseTaskCount();
    delete this.items[srNo]
  }
  taskDone(srNo){
    let currentTask=this.items[srNo];
    currentTask.markDone();
  }
  taskNotDone(srNo){
    let currentTask=this.items[srNo];
    currentTask.markNotDone();
  }
  isDone(srNo){
    let currentTask=this.items[srNo];
    return currentTask.isDone();
  }
  getTasks(){
    return this.items
  }
  addSrNo(){
    this.srNo++;
  }
  increaseTaskCount(){
    this.totalItems++;
  }
  decreaseTaskCount(){
    this.totalItems--;
  }
  getTotalTaskCount(){
    return this.totalItems;
  }
}

module.exports=Todo;
