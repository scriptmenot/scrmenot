const Domain = require('../models/').domain;


var assert = require('assert');

var createdDomainId;
describe('Test crud options for domain', function () {
    it('should create object with right values', function (done) {
	    Domain.create({
	      isAccepted: true,
	      uri : 'test.uri.com.test',
    	})
	    .then( function (comment) {
	      assert.equal(comment.dataValues.uri, 'test.uri.com.test');
	      assert.equal(comment.dataValues.isAccepted, true);
	      createdDomainId = comment.dataValues.id;
	      done();
    	});
  	})
	it('should return comment with given id', function() {
		Domain.findAll({
            where: {'id' : createdDomainId},
            order: [['createdAt', 'DESC']]
            })
        .then(function(domains){
            for (var i in domains){
            	assert.equal(domains[i].dataValues.uri, 'test.uri.com.test')
            }

        })	
	}) 
	it('should update domain', function(){

		Domain.update(
			{
           	 "isAccepted": false,
       		 },
       		 {returning: true, where: {id: createdDomainId}}
		)
		.then(function(domains){
			assert.equal(domains[1][0].dataValues.isAccepted, false);
		})
	})  
	it('should destroy comment', function(){

		Domain.destroy({where: {id: createdDomainId}})
		.then(function(){
			Domain.findAll({where: {id: createdDomainId}})
			.then(function(domain){
				assert.equal(domain.length, 0);
			})
		})
	})  

});

