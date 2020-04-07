import React, { Component } from "react";


import Auxiliary from "../../hoc/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state ={...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0 
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

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
        this.setState({purchasable: sum > 0});
    
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
       
        //console.log(updatedCount);
        const updatedIngredients ={
            ...this.state.ingredients
        };
        //console.log(updatedIngredients);
        updatedIngredients[type] =updatedCount;
        //console.log(updatedIngredients);
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice+ priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);//call this function to update the button ORDER NOW
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };  
        updatedIngredients[type] =updatedCount;
        const priceDeductition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeductition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);//call this function to update the button ORDER NOW
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler =() =>{
        this.setState({purchasing: false});
    }
    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){ //after run this for loop, it will update the copied obj disableInfo 5.00 instead of state.ingred in removing ingredients safely lesson
            disabledInfo[key] = disabledInfo[key] <= 0 //turn true or false // need to add props.diable[crtl.type] in buildcontrols 
        }
        //{salad: true, meat: false,...}
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal> 
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded ={this.addIngredientHandler}
                    ingredientRemoved ={this.removeIngredientHandler}
                    disabled ={disabledInfo}
                    purchasable= {this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />   
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;