const Opinion = require('../models/').opinion;


var assert = require('assert');

var createdOpinonId;
describe('Test crud options for opinion', function () {
    it('should create object with right values', function (done) {
	    Opinion.create({
	      title: 'tytul',
	      content : 'testContent',
	      domainId : 1,
	      isSafe : false
    	})
	    .then( function (comment) {
	      assert.equal(comment.dataValues.title, 'tytul');
	      assert.equal(comment.dataValues.isSafe, false);
	       assert.equal(comment.dataValues.domainId, 1);
	      assert.equal(comment.dataValues.content, 'testContent');
	      createdOpinonId = comment.dataValues.id;
	      done();
    	});
  	})
	it('should return opinion with given id', function() {
		Opinion.findAll({
            where: {'id' : createdOpinonId},
            order: [['createdAt', 'DESC']]
            })
        .then(function(opinions){
 
            	assert.equal(opinions[0].dataValues.title, 'tytul');
		     	assert.equal(opinions[0].dataValues.isSafe, false);
		       	assert.equal(opinions[0].dataValues.domainId, 1);
		      	assert.equal(opinions[0].dataValues.content, 'testContent');
		     
        })	
	}) 
	it('should update opinion', function(){

		Opinion.update(
			{
           	 "isSafe": true,
       		 },
       		 {returning: true, where: {id: createdOpinonId}}
		)
		.then(function(opinions){
			assert.equal(opinions[1][0].dataValues.isSafe, true);
		})
	})  
	it('should destroy comment', function(){

		Opinion.destroy({where: {id: createdOpinonId}})
		.then(function(){
			Opinion.findAll({where: {id: createdOpinonId}})
			.then(function(opinions){
				assert.equal(opinions.length, 0);
			})
		})
	})  
});

