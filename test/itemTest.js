let Item=require('../appModels/item.js');
let assert=require('chai').assert;

describe('Item',function(){
  describe('markDone',function(){
    it('should should change the task status as done default is not done',function(){
      let item = new Item('hello');
      assert.isNotOk(item.isDone());
      item.markDone();
      assert.isOk(item.isDone());
    })
  })
  describe('markNotDone',function(){
    it('should change the task status as not done',function(){
      let item = new Item('hello');
      item.markDone();
      assert.isOk(item.isDone());
      item.markNotDone();
      assert.isNotOk(item.isDone());
    })
  })
  describe('getItem',function(){
    it('should return the task tobe done',function(){
      let task = new Item('do somthing');
      assert.equal(task.getItem(),'do somthing');
      let onMoreTask=new Item('do one more thing')
      assert.equal(onMoreTask.getItem(),'do one more thing');
    })
  })
  describe('changeTask',function(){
    it('should be able to changeTask of the taskInfo',function(){
      let task = new Item('do somthing');
      assert.equal(task.getItem(),'do somthing');
      task.changeTask('actually do somthing else')
      assert.equal(task.getItem(),'actually do somthing else');
    })
  })

})
