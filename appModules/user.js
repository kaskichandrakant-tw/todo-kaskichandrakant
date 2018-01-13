const fs = require('fs');
const tode = require('./tode.js');
class user {
  constructor(userInfoSrc) {
    this.userInfoSrc=userInfoSrc;
    this.allUsers={};
  }
  loadAllUsers(){
    let userInfo=fs.readFileSync(this.userInfoSrc);
    this.allUsers=JSON.parse(userInfo);
  }
  getUserInfo(userName){
    return this.allUsers[userName]
  }
  addTodoList(userName,title,description){
    let userInfo=this.allUsers[userName]
    let todo=new todo(title,description)
    userInfo[title]=todo;
  }
  removeTodoList(userName,title){
    let userInfo=this.allUsers[userName];
    delete userInfo[title];
  }
  changeTitle(userName,currentTitle,newTitle){
    let todoInfo=this.allUsers[userName][currentTitle];
    todoInfo.changeTitle(newTitle);
    delete this.allUsers[userName][currentTitle];
  }
  changeDescription(userName,title,newDescription){
    let todoInfo=this.allUsers[userName][currentTitle];
    todoInfo.changeDescription(newDescription)
  }
  addTask(userName,title,task){
    let todoInfo=this.allUsers[userName][title];
    todoInfo.addTask(task);
  }
  getTasks(userName,title){
    let todoInfo=this.allUsers[userName][title]
    return todoInfo.getTasks();
  }
}
module.exports=user;
