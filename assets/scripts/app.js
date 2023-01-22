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

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName
        this.value = attrValue
    }
}

class Component {
    constructor(renderHookId) {
        this.hookId = renderHookId
    }
    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag)
        if (cssClasses) {
            rootElement.className = cssClasses
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value)
            }
        }
        document.getElementById(this.hookId).append(rootElement)
        return rootElement
    }
}

class ShoppingCart extends Component {
    items = []

    set cartItems(value) {
        this.items = value
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`
    }

    get totalAmount() {
        const sum = this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0)
        return sum
    }

    constructor(renderHookId){
        super(renderHookId)
    }

    addProduct(product) {
        const updatedItems = [...this.items]
        updatedItems.push(product)
        this.cartItems = updatedItems
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart')
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!</button>
        `
        this.totalOutput = cartEl.querySelector('h2')
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId)
        this.product = product
    }

    addToCart() {
        // console.log('Adding product to cart...');
        // console.log(this.product);
        App.addProductToCart(this.product)
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item')
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
    }
}

class ProductList extends Component {
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

    constructor(renderHookId) {
        super(renderHookId)
    }

    render() {
        this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')])
        for (const prod of this.products) {
            const productItem = new ProductItem(prod, 'prod-list')
            productItem.render()
        }
    }
}

class Shop {
    render() {
        this.cart = new ShoppingCart('app')
        this.cart.render()
        const productList = new ProductList('app')
        productList.render()
    }
}

class App {
    static cart;

    static init() {
        const shop = new Shop()
        shop.render()
        this.cart = shop.cart
    }

    static addProductToCart(product) {
        this.cart.addProduct(product)
    }
}

App.init()
