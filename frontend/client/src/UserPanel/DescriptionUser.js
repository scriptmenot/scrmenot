import React from 'react';
import '../LandingPage/PageParts/DescriptionUser.scss';
import { withRouter } from "react-router";
const moment = require('moment');

class DescriptionUser extends React.Component {

    
  render() {
    return (
<div className="DescriptionUser">
<link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
      
     
	<div class="row">
		<div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
    	 <div class="well profile">
            <div class="col-sm-12">
                <div class="col-xs-12 col-sm-8">
                    <h2>{localStorage.getItem('username')}</h2>
                    <p><strong>Joined: </strong> {moment(localStorage.getItem('date')).fromNow()} </p>
                    <p><strong>Latest activity: </strong> {moment(localStorage.getItem('dateActive')).fromNow()} </p>
                </div>             
                <div class="col-xs-12 col-sm-4 text-center">
                    <figure>
                        <figcaption class="ratings">
                            <p>
                            <a href="#">
                                <span class="fa fa-star"></span>
                            </a>
                            <a href="#">
                                <span class="fa fa-star"></span>
                            </a>
                            <a href="#">
                                <span class="fa fa-star"></span>
                            </a>
                            <a href="#">
                                <span class="fa fa-star-o"></span>
                            </a>
                            <a href="#">
                                 <span class="fa fa-star-o"></span>
                            </a> 
                            </p>
                        </figcaption>
                    </figure>
                </div>
            </div>            
            <div class="col-xs-12 divider text-center">
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong> 0 </strong></h2>                    
                    <p><small>Added domains</small></p>
                    <button class="btn btn-success btn-block"><span class="fa fa-plus-circle"></span> Show domains </button>
                </div>
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>0</strong></h2>                    
                    <p><small>Added opinions</small></p>
                    <button class="btn btn-info btn-block"><span class="fa fa-plus-circle"></span> Show opinions </button>
                </div>
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>0</strong></h2>                    
                    <p><small>Added comments</small></p>
                    <div class="btn-group dropup btn-block">
                      <button type="button" class="btn btn-info btn-block"><span class="fa fa-plus-circle"></span> Show comments </button>
                    
                      <ul class="dropdown-menu text-left" role="menu">
                        <li><a href="#"><span class="fa fa-envelope pull-right"></span> Send an email </a></li>
                        <li><a href="#"><span class="fa fa-list pull-right"></span> Add or remove from a list  </a></li>
                        <li class="divider"></li>
                        <li><a href="#"><span class="fa fa-warning pull-right"></span>Report this user for spam</a></li>
                        <li class="divider"></li>
                        <li><a href="#" class="btn disabled" role="button"> Unfollow </a></li>
                      </ul>
                    </div>
                </div>
            </div>
    	 </div>                 
		</div>
	</div>
</div>
    )
  }
}

export default DescriptionUser;