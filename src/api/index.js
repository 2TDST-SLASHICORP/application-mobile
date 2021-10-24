import { firebase } from './config'

export function storeProducts(products) {
    firebase
        .database()
        .ref('products/')
        .set(products)
}

export function fetchProducts(setProducts) {
    firebase
        .database()
        .ref('products/')
        .on('value', (snapshot) => {
            const products = snapshot.val();
            (products === null) ? setProducts([]) : setProducts(products)
        })
}