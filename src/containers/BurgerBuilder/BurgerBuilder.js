import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

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
        totalPrice: 4,
        purchasable: false,
        purchase: false

    };
    addIngredientHandler = (type) => {
        if(this.state.ingredients[type] >= 3) {
            return;
        };
        const updatedIngredients = {
            ...this.state.ingredients
        } ;
        updatedIngredients[type] += 1;
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePursache(updatedIngredients);
    };
    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0) {
            return;
        };
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] -= 1;
        const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePursache(updatedIngredients);
    };
    updatePursache (ingredients) {
        const sum = Object.keys(ingredients).map(ingKey => ingredients[ingKey])
            .reduce( (sum, elem) => {
                sum += elem;
                return sum;
            }, 0);
        this.setState({purchasable: sum > 0});
    };
    purchaseHandler = () => {
      this.setState({purchase: true});
    };
    closePurchase = () => {
      this.setState({purchase: false});
    };
    continuePurchaseHandler = (props) => {
        alert('you continue!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Viktor Sapozhnyk',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '43435',
                    country: 'Ukraine'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order).then(response => console.log(response))
            .catch(error => console.log(error));
    };
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };
        return (
            <Aux>
                <Modal show={this.state.purchase} closeModal={this.closePurchase}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        cancelPurchase={this.closePurchase}
                        continuePurchase={this.continuePurchaseHandler}
                        price={this.state.totalPrice.toFixed(2)}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchase={this.purchaseHandler}

                />
            </Aux>
        );
    };
};

export default BurgerBuilder;