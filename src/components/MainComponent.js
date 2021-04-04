import React, {Component} from 'react';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import Header from'./HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import PlaceDetail from './PlacedetailComponent';
import { postComment,postFeedback,fetchPlaces,fetchComments,fetchPromos,fetchLeaders} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {Link, Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps = state => {
  return {
    places: state.places,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

const mapDispatchToProps = dispatch => {
    return{
    postComment: (placeId, rating, author, comment) => dispatch(postComment(placeId, rating, author, comment)),
    postFeedback:(values)=> dispatch(postFeedback(values)),
    fetchPlaces:() => dispatch(fetchPlaces()),
    fetchComments:()=>dispatch(fetchComments()),
    fetchPromos:()=>dispatch(fetchPromos()),
    fetchLeaders:()=>dispatch(fetchLeaders()),
    resetFeedbackForm:()=> {dispatch(actions.reset('feedback'))}
    }
  };

class Main extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchPlaces();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchComments();
  }

  
  render() {
    const HomePage = ()=>{
      return(
        <Home place={this.props.places.places.filter((place)=>place.featured)[0]}
              placesLoading={this.props.places.isLoading}
              placesErrMess={this.props.places.errMess}
              leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
              leaderLoading={this.props.leaders.isLoading}
              leaderErrMess={this.props.leaders.errMess}
              promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
        />
      );
    }

    const PlaceWithId = ({match}) => {
      return(
           <PlaceDetail place={this.props.places.places.filter((place) => place.id === parseInt(match.params.placeId,10))[0]}
              isLoading={this.props.places.isLoading}
              errMess={this.props.places.errMess}
              comments={this.props.comments.comments.filter((comment) => comment.placeId === parseInt(match.params.placeId,10))}
              postComment={this.props.postComment}
            />
            
      );
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu places={this.props.places} />} />
              <Route path='/menu/:placeId' component={PlaceWithId} />
              <Route exact path='/contactus' component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
              <Route exact path='/aboutus' component={()=> <About leaders={this.props.leaders} />} />
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>    
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

