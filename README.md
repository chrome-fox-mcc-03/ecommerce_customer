# ecommerce_customer

## DEPLOYED

### Server:
* https://still-plains-85177.herokuapp.com

### Client - CMS:
* https://e-commerce-cms-platform.web.app
* https://e-commerce-cms-platform.firebaseapp.com

### Client - Customer:
* https://hackmart.web.app
* https://hackmart.firebaseapp.com/

### Admin Credentials for Client - CMS:
* Email   : admin@admin.com
* Password: password

## Requirement:
* User can create, read, update, and delete item/product to their own cart
* User can add or reduce item on their cart without adding new record

## Additional Features:
* User cannot add item more than stock
* When User add item to the Cart, the View Cart button in Navbar will have badge based on total items in the cart
* User can checkout ("Pay Now"), when they do this, stock will reduce and isPaid will changed into true.
* All the past items which have been paid, will be shown in History (/cart/history)
* Sequelize transaction is used for Checkout
* Category column has been added into Products table
* User can filter by category in the Products section

## More Additional Features from Awesome-Vue:
* vue-currency-filter ( CMS & Customer )
* animated-number-vue ( CMS )
* vue-easy-slider ( Customer )
* vue-notification ( Customer )

## Dummy things:
* Promos in navbar
* Promos in Carousel
* Categories in Home

## Issue:
* Just learnt about Transaction Sequelize and Promise.All
