$(function () {
    console.log("orders.js loaded ...")
    listenForClick()
    // listenForShowClick()
    listenForNewOrderFormClick()
});

function listenForClick() {
    $('button#orders-data').on('click', function (event) {
        event.preventDefault()
        getOrders()
    })
}

function listenForNewOrderFormClick() {
    $('button#ajax-new-order').on('click', function (event) {
        event.preventDefault()
        let newOrderForm = Order.newOrderForm()
        document.querySelector('div#new-order-form-div').innerHTML = newOrderForm
    })
}

$('button#ajax-new-order').on('submit', function (e) {
    e.preventDefault()

    const values = $(this).serialize()

    $.order("/orders", values).done(function (data) {
        $("div#notice.container").html("")
        const newOrder = new Order(data)
        const htmlToAdd = newOrder.formatShow()

        $("div#notice.container").html("htmlToAdd ")
        console.log("new order")
    })
})




function getOrders() {
    $.ajax({
        url: "http://localhost:3000/orders",
        method: 'get',
        dataType: 'json'
    }).done(function (response) {
        // $('button#orders-data').json(response)

        console.log("response: ", response);


        response.map(order => {
            let myOrder = new Order(order)

            let myOrderHTML = myOrder.orderHTML()
            document.getElementById('ajax-orders').innerHTML += myOrderHTML
        })
    })


}

// previously, the $(document).on.... that is below was in the getOrders() function above
// this doesn't necessarily create an issue, but it makes a bit more sense to have this happen
// when the page is loaded, rather than after the getOrders() function exectutes. Moving lines 67-89
// back into getOrders() still worked, so I'd put it where it makes the most sense to you. I'd
// caution moving it up though simply because it creates some confusion having the ajax request for 
// both orders.json and orders/id.json coming from the same function block

$(document).on('click', ".show_link", function (e) {
    e.preventDefault()
    $('div#notice.container').html('')
    let id = $(this).attr('data-id')


// in the ajax request here, used string substitution to grab just the meal in question
    $.ajax({
        url: `http://localhost:3000/orders/${id}.json`,
        method: 'get'
    }).done(function (response) {
        console.log("response: ", response);

// there was a map function here which wasn't needed since the response received back is just 1 item and not an array
        let myOrder = new Order(response)

        console.log(myOrder)
        let orderHTML = myOrder.formatShow()
        
        // console.log('you just hit showOrders')
        // clearout pg
        // 'div#notice.container'
        $('div#notice.container').append(orderHTML)
        // $('data-id').innerHTML = orderHTML
    })
})



class Order {
    constructor(obj) {
        this.id = obj.id
        this.quantity = obj.quantity
        this.meal = obj.meal
        this.comments = obj.comments
    }
    static newOrderForm() {
        return (`
     <form>    
     Order: <input type="text" name="ordernameform">
     quantity:<input type="text" name="quantityform">
             <input type="submit" name="commit" value="Create Order">
    </form>
          `)
    }
}


Order.prototype.orderHTML = function () {
    let orderComments = this.comments.map(comment => {
        return (`
          <p>${comment.content}</p>      
    `)
    }).join('')

    let orderHTML = `
    <a href="/orders/${this.id}"data-id="${this.id}" class="show_link"><h2>${this.meal.name}</h2></a>
        <div>quantity:${this.quantity}</div> 
         <div>comments:${orderComments}</div> 
        `
    return orderHTML
}

Order.prototype.formatShow = function () {
    let orderComments = this.comments.map(comment => {
        return (`
          <p>${comment.content}</p>      
    `)
    }).join('')

    let orderHTML = `
        <h2>${this.meal.name}</h2>
        <div>quantity:${this.quantity}</div> 
        <div>comments:${orderComments}</div>     
    `
    return orderHTML
}

// function listenForShowClick() {
//     $('data-id').on('click', function (event) {
//         event.preventDefault()
//         showOrders()
//     })
// }