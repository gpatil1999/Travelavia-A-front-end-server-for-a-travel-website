import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay,CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,Modal,ModalHeader,ModalBody,Row,Col,Label} from 'reactstrap';
import {Control, LocalForm,Errors} from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


 const required=(val)=>val && val.length;
 const minLength=(len)=>(val)=>!val || (val.length>=len);
 const maxLength=(len)=>(val)=>!val || (val.length<=len);
	
	class CommentForm extends Component{
		constructor(props){
			super(props);

			this.toggleModal = this.toggleModal.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);

			this.state={
			isModalOpen:false,
			}
		}

		toggleModal(){
			this.setState({
				isModalOpen:!this.state.isModalOpen
			})
		};

		handleSubmit(values){
			this.toggleModal();
			this.props.postComment(this.props.placeId, values.rating, values.author, values.comment);
		};

		render(){
			return(
				<div>
				<Button outline onClick={this.toggleModal}><i class="fa fa-pencil" aria-hidden="true"><strong> Add Comment </strong></i></Button>
			
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Add Review</ModalHeader>
                    <ModalBody>
                    	<LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                    		<Row className="form-group">
                    		  <Col md={{size :10,offset: 1}}>
                    			<Label htmlFor="rating" md={12}><b>Rating</b></Label>
                    			<Control.select model=".rating" name="rating"
                                        className="form-control">
                                    <option>5</option>
                                    <option>4</option>
                                    <option>3</option>
                                    <option>2</option>
                                    <option>1</option>
                                </Control.select>
                              </Col>
                    		</Row>
                    		<Row className="form-group">
                    		  <Col md={{size:10,offset: 1}}>
                    			<Label htmlFor="author" md={12}><b>Author Name</b></Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Author Name"
                                        className="form-control" 
                                        validators={{
                                        	required,minLength:minLength(3),maxLength:maxLength(15)
                                        }} 
                                        />
                                    <Errors
                                    	className="text-danger"
                                        model=".authorname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Author name must be at least 3 characters',
                                            maxLength: 'Author name must be 15 characters or less'
                                        }} />        
                              </Col> 
                    		</Row>
                    		<Row className="form-group">
                              <Col md={{size:10,offset: 1}}>
                                <Label htmlFor="comment" md={12}><b><i>Your review is precious to us</i></b></Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                              </Col>
                            </Row>
                            <Row className="form-group">
                              <Col md={{size:10,offset: 1}}>
                            	<Button type="submit" color="warning">Submit Review</Button>
                              </Col>
                            </Row>
                    	</LocalForm>
                    </ModalBody>
                </Modal>
                </div>
			);
		}
	}

	


	function RenderComments({comments, postComment, placeId}){
		if(comments!=null){
			const commt = comments.map((comment) => {
				comment.date = comment.date.slice(0,10);
				var arr = comment.date.split("-");
				const arrmonth = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
				
				return (	  
					<li key={comment.id}>
					<p>{comment.comment}</p>
					<p>--{comment.author} , {arrmonth[arr[1]-1]} {arr[2]}, {arr[0]}</p>
					</li>  	
					);
					
			})
		  	

			return (
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					<ul className="list-unstyled">
					<Stagger in>
				     {<Fade in>
					  {commt}
					 </Fade>}
					</Stagger>
					</ul>
					<CommentForm placeId={placeId} postComment={postComment} />
				</div>
			);
			
		}
	
		else{
			return(
				<div></div>
			);
		}
	}


	function RenderPlace({place}){
	    if(place!=null){
	      return(
	        <div className="col-12 col-md-5 m-1">
	          <FadeTransform in transformProps={{
            	exitTransform: 'scale(0.5) translateY(-50%)'
          	  }}>
		        <Card>
		          <CardImg width="100%" src={baseUrl + place.image} alt={place.name} />
		          <CardBody>
		            <CardTitle>
		              {place.name}
		            </CardTitle>
		            <CardText>{place.description}</CardText>
		          </CardBody>
		        </Card>
		      </FadeTransform> 
	        </div>
	        );

	    }
	    else{
	      return(
	        <div></div>
	        );
	    }
	}

  

	const PlaceDetail = (props)=>{
		
		if(props.isLoading){
			return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
		}

		else if(props.errMess){
			return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
		}

		else if (props.place != null) 

		return(
			<div className="container">
				
				<div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.place.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.place.name}</h3>
                        <hr />
                    </div>                
                </div>

				<div className="row">
					<RenderPlace place={props.place} />
				
					 <RenderComments comments={props.comments}
				        postComment={props.postComment}
				        placeId={props.place.id}
				      />
				</div>
			</div>
		);
	}


export default PlaceDetail;
				