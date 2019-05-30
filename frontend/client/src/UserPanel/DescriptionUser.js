import React from 'react';
import '../LandingPage/PageParts/DescriptionUser.scss';
import Loader from '../DomainLists/Loader.js';
import { withRouter } from "react-router";
import Modal from 'react-responsive-modal';
const moment = require('moment');


class DescriptionUser extends React.Component {
state = {
      domains: [], 
      opinions: [],
      comments: [],
      dom: [],
      isLoading: false
  };

  details(domain){
   
    this.props.history.push({
        pathname: '/details',
        state: { dom: domain }
      });

  }
 

    componentDidMount() {

     this.setState({ isLoading: true });

     fetch(`https://scrmenotlogin.herokuapp.com/api/domain/user/${localStorage.getItem('id')}`)
    .then(resp => resp.json())
      .then(resp => {
        this.setState({
          domains: Array.from(resp), 
          isLoading: false
        });
      })
        
    fetch(`https://scrmenotlogin.herokuapp.com/api/opinion/user/${localStorage.getItem('id')}`)
    .then(resp => resp.json())
      .then(resp => {
        this.setState({
          opinions: Array.from(resp), 
          isLoading: false
        });
      })
          
    fetch(`https://scrmenotlogin.herokuapp.com/api/comment/user/${localStorage.getItem('id')}`)
    .then(resp => resp.json())
      .then(resp => {
        this.setState({
          comments: Array.from(resp), 
          isLoading: false
        });
      })
        
  }

domainByID(domainId){
    fetch(`https://scrmenotlogin.herokuapp.com/api/domain/${domainId}`)
    .then(resp => resp.json())
      .then(resp => {
        this.props.history.push({
        pathname: '/details',
        state: { dom: resp }
      });
      })
}


  onOpenModal1(){
    this.setState({ open1: true });
  };

  onCloseModal1(){
    this.setState({ open1: false });
  };

 onOpenModal2(){
    this.setState({ open2: true });
  };

  onCloseModal2(){
    this.setState({ open2: false });
  };

 onOpenModal3(){
    this.setState({ open3: true });
  };

  onCloseModal3(){
    this.setState({ open3: false });
  };
  render() {
      let lgClose = () => this.setState({ lgShow: false });
       const modalStyles2 = {
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          modal: {
            border: 'none',
            background: '#333333',
            width: '200vw',
            height: '45vh',
            textAlign: 'left',
            fontSize: '1.5vw',
            position: 'absolute',
            top: '10px',
            left: '22%'
          },
          closeIcon: {
              cursor:'pointer',
              outline: 'none'
            }
        }
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
                    <h2><strong> {this.state.domains.length} </strong></h2>                    
                    <p><small>Added domains</small></p>
                    <button class="btn btn-success" onClick={this.onOpenModal1.bind(this)}><span class="fa fa-plus-circle" ></span> Show domains </button>
<Modal open={this.state.open1} onClose={this.onCloseModal1.bind(this)}   styles={modalStyles2}>
                          
    <div className="browseList">
        <ul className="domainsList">
        {
          this.state.isLoading 
          ?
          <Loader/>
          :
          this.state.domains.map((domain, i) => 
            <div className="summaryList">
              <div key={i} className="safety">
                <div className="mini-counts">{domain.safety}</div>
                    <div>safety</div>
                </div>
          <div className="Time">Added {moment(domain.createdAt).fromNow()}</div>
          <div className="Name">
            <li key={i} onClick={this.details.bind(this, domain)}>{domain.uri}</li>  
          </div>   
          </div>   
      )}
      </ul>
      </div>
</Modal>
</div>
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>{this.state.opinions.length}</strong></h2>                    
                    <p><small>Added opinions</small></p>
                    <button class="btn btn-info btn-block" onClick={this.onOpenModal2.bind(this)}><span class="fa fa-plus-circle" ></span> Show opinions </button>
    <Modal open={this.state.open2} onClose={this.onCloseModal2.bind(this)}   styles={modalStyles2}>
                          
    <div className="browseList">
        <ul className="domainsList">
        {
          this.state.isLoading 
          ?
          <Loader/>
          :
          this.state.opinions.map((opinion, i) => 
            <div className="summaryOpinionList">
            <div key={i} className="safety">
                <div className="mini-counts">{opinion.rate ? opinion.rate : 0}</div>
                    <div>Rate</div>
                <div className="opinion"></div>
                </div>

          <div className="Time">Added {moment(opinion.createdAt).fromNow()}</div>
          <div className="opinionContent">
            <li key={i} onClick={this.domainByID.bind(this, opinion.domainId)}>{opinion.content}</li>  
          </div>   
          </div>   
      )}
      </ul>
      </div>
</Modal>
                </div>
                <div class="col-xs-12 col-sm-4 emphasis">
                    <h2><strong>{this.state.comments.length}</strong></h2>                    
                    <p><small>Added comments</small></p>
                    <div class="btn-group dropup btn-block">
                      <button type="button" class="btn btn-info btn-block" onClick={this.onOpenModal3.bind(this)}><span class="fa fa-plus-circle"></span> Show comments </button>
                          
                          <Modal open={this.state.open3} onClose={this.onCloseModal3.bind(this)}   styles={modalStyles2}>
                          
    <div className="browseList">
        <ul className="domainsList">
        {
          this.state.isLoading 
          ?
          <Loader/>
          :
          this.state.comments.map((comment, i) => 
            <div className="summaryOpinionList">

          <div className="Time">Added {moment(comment.createdAt).fromNow()}</div>
          <div className="opinionContent">
            <li key={i}>{comment.content}</li>  
          </div>   
          </div>   
      )}
      </ul>
      </div>
</Modal>
                    
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