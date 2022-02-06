import { db, auth } from "./firebase"

export const initialState = {
    user: null,
    view_item: null
};
const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "SUBMIT":
            var userRef = db.collection('articles').doc(action.id).set({
                writer: action.writer,
                topic: action.topic,
                description: action.description,
                clicks: parseInt(0)
            });
            return {
                ...state
            };
        case "CHANGE_VIEW_ITEM":
            // console.log(action.item.id)
            // console.log("action printed ", action)
            return {
                ...state,
                view_item: action.id
            };

        case "REMOVE_FROM_BASKET":
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];

            if (index >= 0) {
                newBasket.splice(index, 1);

            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }
            var userRef = db.collection('users').doc(auth.currentUser.uid);
            var setWithMerge = userRef.set({
                basket: newBasket,
            }, { merge: true });
            return {
                ...state,
                basket: newBasket
            }
        case 'EMPTY_BASKET':
            var userRef = db.collection('users').doc(auth.currentUser.uid);
            var setWithMerge = userRef.set({
                basket: [],
            }, { merge: true });
            return {
                ...state,
                basket: []
            }

        default:
            return state;
    }
};

export default reducer;