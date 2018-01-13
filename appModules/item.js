class Item {
  constructor(task) {
    this.task=task;
    this.status=false;
  }
  getItem(){
    return this.task;
  }
  markDone(){
    this.status=true;
  }
  markNotDone(){
    this.status=false;
  }
  isDone(){
    return this.status;
  }
  changeTask(newTask){
    this.task=newTask;
  }
}
module.exports=Item;
