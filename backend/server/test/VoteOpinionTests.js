const VoteOpinion = require('../models/').voteOpinion;


var assert = require('assert');

var createdVoteOpinionId;
describe('Test crud options for opinion', function () {
    it('should create new VoteOpinion with right values', function (done) {
	    VoteOpinion.create({
	      value : 10,
	      opinionId : 1
    	})
	    .then( function (voteOpinion) {
	      assert.equal(voteOpinion.dataValues.value, 10);
	      assert.equal(voteOpinion.dataValues.opinionId, 1);
	      createdVoteOpinionId = voteOpinion.dataValues.id;
	      done();
    	});
  	})
	it('should return VoteOpinion with given opinionId', function() {
		VoteOpinion.findAll({
            where: {'id' : createdVoteOpinionId},
            order: [['createdAt', 'DESC']]
            })
        .then(function(voteOpinions){
  			assert.equal(voteOpinions[0].dataValues.value, 10);
	     	assert.equal(voteOpinions[0].dataValues.opinionId, 1);
        })	
	}) 
	it('should update voteOpinion', function(){

		VoteOpinion.update(
			{
           	 "value": 11,
       		 },
       		 {returning: true, where: {id: createdVoteOpinionId}}
		)
		.then(function(voteOpinions){
			assert.equal(voteOpinions[1][0].dataValues.value, 11);
		})
	})  
	it('should destroy comment', function(){

		VoteOpinion.destroy({where: {id: createdVoteOpinionId}})
		.then(function(){
			VoteOpinion.findAll({where: {id: createdVoteOpinionId}})
			.then(function(voteOpinions){
				assert.equal(voteOpinions.length, 0);
			})
		})
	})  
});

