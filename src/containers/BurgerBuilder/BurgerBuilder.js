import React, { Component } from "react";


import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from "../../store/actions";
// const INGREDIENT_PRICES ={
//     salad: 0.5,
//     cheese: 0.4,
//     meat:1.3,
//     bacon:0.7
// };

class BurgerBuilder extends Component {
    state = {
        // ingredients: null, use redux
        // totalPrice: 4, use redux
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        // axios.get('https://react-my-burger-bf037.firebaseio.com/ingredients.json')//fetch data from server
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
    }


    updatePurchaseState (ingredients){
        // const ingredients ={
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey] //return the number of each ingredients
                
            })
            .reduce((sum, el) => { //updated sum
                return sum + el;
            }, 0);
            console.log(sum);
        return  sum > 0;
    
    }

    // addIngredientHandler = (type) =>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount +1;
       
    //     //console.log(updatedCount);
    //     const updatedIngredients ={
    //         ...this.state.ingredients
    //     };
    //     //console.log(updatedIngredients);
    //     updatedIngredients[type] =updatedCount;
    //     //console.log(updatedIngredients);
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice+ priceAddition;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);//call this function to update the button ORDER NOW
    // }
    
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients ={
    //         ...this.state.ingredients
    //     };  
    //     updatedIngredients[type] =updatedCount;
    //     const priceDeductition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeductition;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);//call this function to update the button ORDER NOW
    // }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler =() =>{
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => { //post data to server
        // alert("You can continue!");
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice.toFixed(2),
        //     customer: {
        //         name: 'Nhan',
        //         address: {
        //             street: 'Vuorikatu 14',
        //             zipCode: '65100',
        //             country: 'Finland'
        //         },
        //         email: 'thiennhan07.2016@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json' , order)
        //     .then(response =>{
        //         this.setState({loading: false , purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false , purchasing: false});
        //     });

        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push( '/checkout'
            // {
            // pathname: '/checkout',
            // search: '?' + queryString
        // }
        );  //we can get ingredient from redux store

    }
    render() {
        const disabledInfo ={
            // ...this.state.ingredients
            ...this.props.ings //use Redux
        };
        for(let key in disabledInfo){ //after run this for loop, it will update the copied obj disableInfo 5.00 instead of state.ingred in removing ingredients safely lesson
            disabledInfo[key] = disabledInfo[key] <= 0 //turn true or false // need to add props.diable[crtl.type] in buildcontrols 
        }
        //{salad: true, meat: false,...}

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p>: <Spinner />;

        // if(this.state.ingredients){ // if ingredients are loaded from server
        if(this.props.ings) {//use Redux
            burger = (
                <Auxiliary>
                    {/* <Burger ingredients={this.state.ingredients} /> */}
                    <Burger ingredients={this.props.ings} /> {/*use redux */}
                    <BuildControls 
                        // ingredientAdded ={this.addIngredientHandler}
                        // ingredientRemoved ={this.removeIngredientHandler}
                        ingredientAdded ={this.props.onIngredientAdded} //use redux
                        ingredientRemoved ={this.props.onIngredientRemoved} //use redux
                        disabled ={disabledInfo}
                        purchasable= {this.updatePurchaseState(this.props.ings)} //this.updatePurchaseState returns true or false
                        // price={this.state.totalPrice}
                        price={this.props.price} //use redux
                        ordered={this.purchaseHandler}
                    /> 
                </Auxiliary>  
            );
            orderSummary =  <OrderSummary 
            // price={this.state.totalPrice}
            price={this.props.price}
            // ingredients={this.state.ingredients}
            ingredients={this.props.ings} //use redux
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            />;
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> {/*modal doesnot update when we set ordersummary, use shouldComponentupdate in Modal.js */}
                   {orderSummary}
                </Modal> 
                {burger} 
            </Auxiliary>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const  mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName})

    }
}


export default connect(mapStatetoProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));