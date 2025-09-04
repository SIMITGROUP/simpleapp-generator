export const getSubtotal = (details) =>{
    
    details.subTotal =  details.unitPrice * details.quantity
    return details
}

export const getTotal = (details:any[]) => {
    if(details && details.length> 0){
        let total = 0
        details.forEach(item=>{
            total += item.subTotal
        })
        return total
    }
    return 0
}