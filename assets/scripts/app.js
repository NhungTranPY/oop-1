class Product {
    // title = 'DEFAULT';
    // imageUrl;
    // description;
    // price;
    // // inside constructor is 'class property', if we comment the above, it still works
    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}
// console.log(new Product());

const productList = {
    products: [
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
    ],
    render() {
        const renderHook = document.getElementById('app')
        const prodList = document.createElement('ul')
        prodList.className = 'product-list'
        for (const prod of this.products) {
            const prodEl = document.createElement('li')
            prodEl.className = 'product-item'
            prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageUrl}" alt="${prod.title}" />
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl)
        }
        renderHook.append(prodList)
    }
}

productList.render()