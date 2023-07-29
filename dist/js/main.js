var app = new Vue({
    el: "#app",
    data: {
        product: "socks",
        description: "A pair of warm, fuzzy socks",
        image: "./assets/socks.png",
        href: "https://v2.vuejs.org/v2/guide/installation.html",
        onSale: true,
        sizes: ["37", "38", "39", "40"],
        variants: [
        {
            variantId: 2234,
            variantColor: "green",
            variantImg: "./assets/socks.png",
        },
        {
            variantId: 2235,
            variantColor: "blue",
            variantImg: "./assets/socks-blue.png",
        },
        ],
        cart: 0,
    },
    methods: {
        addItem() {
        this.cart += 1;
        },
        removeItem() {
        this.cart -= 1;
        },
        updateProduct(variantImg) {
        this.image = variantImg;
        },
    },
});

// var app2 = new Vue({
//     el: '#app2',
//     data: {
//         message: 'Hello World!',
//     }
// })