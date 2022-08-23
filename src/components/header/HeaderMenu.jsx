import React, {useEffect} from 'react';
import IconButton from "@material-ui/core/IconButton";
import PostAddIcon from '@material-ui/icons/PostAdd'
import MenuIcon from "@material-ui/icons/Menu";
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router"


const HeaderMenu = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
   // const userId = getUserId(selector);

/*
    // Listen products in user's cart
    useEffect(() => {
        const unsubscribe = db.collection('users').doc(userId).collection('cart')
            .onSnapshot(snapshots => {

                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type

                    switch (changeType) {
                        case 'added':
                            productsInCart.push(product);
                            break;
                        case 'modified':
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                            productsInCart[index] = product;
                            break;
                        case 'removed':
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                });

                dispatch(fetchProductsInCart(productsInCart))
            });

        return () => unsubscribe()
    },[]);
*/

    return (
        <>
            <IconButton onClick={() => dispatch(push('/post/edit'))}>
                <PostAddIcon />
            </IconButton>
            <IconButton
                aria-label="Menu Items"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => props.handleDrawerToggle(e, true)}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
        </>
    );
};

export default HeaderMenu;