class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;
    // // above is called 'class fields', inside constructor is 'class property', if we comment the above, it still works
    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}
// console.log(new Product());

class ShoppingCart {
    items = []

    render() {
        const cartEl = document.createElement('section')
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `
        cartEl.className = 'cart'
        return cartEl
    }
}

class ProductItem {
    constructor(product) {
        this.product = product
    }

    addToCart() {
        console.log('Adding product to cart...');
        console.log(this.product);
    }

    render() {
        const prodEl = document.createElement('li')
        prodEl.className = 'product-item'
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}" />
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
        const addCartButton = prodEl.querySelector('button')
        addCartButton.addEventListener('click', this.addToCart.bind(this))
        return prodEl
    }
}

class ProductList {
    products = [
        new Product(
            'A Pillow',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.slKai5OCE06BzTKxg6nUtgHaHa%26pid%3DApi&f=1&ipt=c1a29749fc340860cb3ee6bef75242fef169ebf9e4d1240addf22a851edf8028&ipo=images',
            'A soft pillow',
            19.19
        ),
        new Product(
            'A Carpet',
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ZobBsKpwKY7dZVblJqUBjQHaFj%26pid%3DApi&f=1&ipt=44fa6eb3cdaac4b50f7ba5445d013aa8075f885b6f454bf0590f03845c227add&ipo=images',
            'A carpet which you might like - or not.',
            89.99
        )
    ]

    constructor() {}

    render() {
        const prodList = document.createElement('ul')
        prodList.className = 'product-list'
        for (const prod of this.products) {
            const productItem = new ProductItem(prod)
            const prodEl = productItem.render()
            prodList.append(prodEl)
        }
        return prodList
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app')
        const cart = new ShoppingCart()
        const cartEl = cart.render()
        const productList = new ProductList()
        const prodListEl = productList.render()

        renderHook.append(cartEl)
        renderHook.append(prodListEl)
    }
}

const shop = new Shop()
shop.render()

