const Item = require('./item.js');
class todo {
  constructor(title,description) {
    this.title=title;
    this.description=description;
    this.items={};
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  addTask(task) {
    this.items[task]=new Item(task);
  }
  changeTitle(newTitle){
    this.title=newTitle;
  }
  changeDescription(newDes){
    this.description=newDes;
  }
  removeItem(task){
    delete this.items[task]
  }
  taskDone(task){
    let currentTask=this.items[task];
    currentTask.markDone();
  }
  taskNotDone(task){
    let currentTask=this.items[task];
    currentTask.markNotDone();
  }
  isDone(task){
    let currentTask=this.items[task];
    return currentTask.isDone();
  }
  getTasks(){
    return this.items
  }
}

module.exports=todo;
