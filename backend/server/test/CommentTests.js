const Comment = require('../models/').comment;
const commentController = require('../controllers').Comment;

var assert = require('assert');

var createdComemntId;
describe('Test crud options for comment', function () {
    it('should create object with right values', function (done) {
	    Comment.create({
	      opinionId: 1,
	      content : 'its ok',
    	})
	    .then( function (comment) {
	      assert.equal(comment.dataValues.content.length, 6);
	      assert.equal(comment.dataValues.opinionId, 1);
	      createdComemntId = comment.dataValues.id;
	      done();
    	});
  	});
	it('should return comment with given opinionid', function() {
		Comment.findAll({
            where: {'opinionId' : 1},
            order: [['createdAt', 'DESC']]
            })
        .then(function(comments){
            for (var i in comments){
            	assert.equal(comments[i].dataValues.opinionId, 1)
            }

        })	
	}) 
	it('should update comment', function(){

		Comment.update(
			{
           	 "content": "new content",
       		 },
       		 {returning: true, where: {id: createdComemntId}}
		)
		.then(function(comment){
			assert.equal(comment[1][0].dataValues.content,  "new content");
		})
	})  
	it('should destroy comment', function(){

		Comment.destroy({where: {id: createdComemntId}})
		.then(function(){
			Comment.findAll({where: {id: createdComemntId}})
			.then(function(comment){
				assert.equal(comment.length, 0);
			})
		})
	})  

});

