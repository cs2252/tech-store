import {REMOVEITEM,INCREASEITEM,DECREASEITEM,ADDTOCART,CLEARCART} from './actions'
export default (state,action)=>{
  switch (action.type) {
    case REMOVEITEM:
      return state.filter(item=>item.id!==action.payload)
    case INCREASEITEM:
      return state.map(item=>{
        if(item.id===action.payload)
          return {...item,amount:item.amount+1}
        else 
          return {...item}
      })
    case DECREASEITEM:
       return state.map(item=>{
        if(item.id===action.payload)
          return {...item,amount:item.amount-1}
        else 
          return {...item}
      })
    case CLEARCART:
      return [];
    case ADDTOCART:
      const {id,title,image,price}=action.payload
      const product={id,title,image,price,amount:1}
      return [...state,product]
    
    default:
      return state;
  }
}