import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    console.log('ingredients: ', props.ingredients);
    let transformedIngredients = Object.keys(props.ingredients).map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
            return <BurgerIngredient key={ingKey + (i + 1)} type={ingKey} />
        });
    }).reduce((arr, elem) => {
        return arr.concat(elem);
    }, []);
    if(transformedIngredients.length === 0) {
        transformedIngredients = 'Please, start adding ingredients!';
    };
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;