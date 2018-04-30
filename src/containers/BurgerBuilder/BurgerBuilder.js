import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BuildControls';
const INGREDIENTS_PRICE = {
    salad: 0.2,
    cheese: 0.4,
    bacon: 0.6,
    meat: 0.7
};
class BurgerBuilder extends Component {
    state = {
        ingredients: {
          salad: 0,
          cheese: 0,
          bacon: 0,
          meat: 0
        },
        totalPrice: 4

    };
    addIngredientHandler = (type) => {
        if(this.state.ingredients[type] >= 3) {
            return;
        };
        this.setState(prevState => ({
            ingredients: {...prevState.ingredients, [type]: prevState.ingredients[type] + 1},
            totalPrice: prevState.totalPrice + INGREDIENTS_PRICE[type]
        }));
    };
    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0) {
            return;
        };
        this.setState(prevState => ({
            ingredients: {...prevState.ingredients, [type]: prevState.ingredients[type] - 1},
            totalPrice: prevState.totalPrice - INGREDIENTS_PRICE[type]
        }));
    };
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                />
            </Aux>
        );
    };
};

export default BurgerBuilder;