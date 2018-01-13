let Todo=require('../appModules/todo.js');
let assert=require('chai').assert;


describe('#todo',function(){
  describe('#taskDone',function(){
    it('should should change the task status as done default is not done',function(){
      let todo = new Todo('something','to do something');
      todo.addTask('do something');
      assert.isNotOk(todo.isDone('do something'));
      todo.taskDone('do something');
      assert.isOk(todo.isDone('do something'));
    })
  })
  describe('#taskNotDone',function(){
    it('should change the task status as not done',function(){
      let todo = new Todo('something','to do something');
      todo.addTask('do something');
      todo.taskDone('do something');
      assert.isOk(todo.isDone('do something'));
      todo.taskNotDone('do something');
      assert.isNotOk(todo.isDone('do something'));
    })
  })
  describe('#getTasks',function(){
    it('should return the all tasks from todo',function(){
      let todo = new Todo('something','to do something');
      todo.addTask('do something');
      let actual=todo.getTasks()['do something'];
      let expected={task:'do something',status:false};
      assert.deepEqual(actual,expected);
      todo.addTask('do one more thing');
      actual=todo.getTasks()['do one more thing'];
      expected={task:'do one more thing',status:false};
      assert.deepEqual(actual,expected);
    })
  })
  describe('#chnageTask',function(){
    it('should be able to change the task of todo',function(){
      let todo=new Todo('something','to complete something');
      todo.addTask('something')
      assert.equal(todo.getTasks()['something'].task,'something')
      todo.changeTask('do something','do somethingElse')
      assert.equal(todo.getTasks()['do somethingElse'].task,'do somethingElse')
    })
  })
  describe('#chnageTitle',function(){
    it('should be able to change the title of todo',function(){
      let todo=new Todo('something','to complete something');
      assert.equal(todo.getTitle(),'something');
      todo.changeTitle('somethingElse');
      assert.equal(todo.getTitle(),'somethingElse');
    })
  })
})
