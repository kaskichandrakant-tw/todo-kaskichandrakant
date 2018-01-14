let Todo=require('../appModules/todo.js');
let assert=require('chai').assert;


describe('#todo',function(){
  describe('#taskDone',function(){
    it('should should change the task status as done default is not done',function(){
      let todo = new Todo('something','to do something');
      todo.addTask('do something');
      assert.isNotOk(todo.isDone(1));
      todo.taskDone(1);
      assert.isOk(todo.isDone(1));
    })
  })
  describe('#taskNotDone',function(){
    it('should change the task status as not done',function(){
      let todo = new Todo('something','to do something');
      todo.addTask('do something');
      todo.taskDone(1);
      assert.isOk(todo.isDone(1));
      todo.taskNotDone(1);
      assert.isNotOk(todo.isDone(1));
    })
  })
  describe('#getTasks',function(){
    it('should return the all tasks from todo',function(){
      let todo = new Todo('something','to do something');
      todo.addTask('do something');
      let actual=todo.getTasks()[1];
      let expected={task:'do something',status:false};
      assert.deepEqual(actual,expected);
      todo.addTask('do one more thing');
      actual=todo.getTasks()[2];
      expected={task:'do one more thing',status:false};
      assert.deepEqual(actual,expected);
    })
  })
  describe('#chnageTask',function(){
    it('should be able to change the task of todo',function(){
      let todo=new Todo('something','to complete something');
      todo.addTask('something')
      assert.equal(todo.getTasks()[1].task,'something')
      todo.changeTask(1,'do somethingElse')
      assert.equal(todo.getTasks()[1].task,'do somethingElse')
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
