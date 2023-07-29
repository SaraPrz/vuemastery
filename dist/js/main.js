var app = new Vue({
  el: "#app",
  data: {
    product: "socks",
    brand: "Vue Mastery",
    description: "A pair of warm, fuzzy socks",
    href: "https://v2.vuejs.org/v2/guide/installation.html",
    selectedVariant: 0,
    sizes: ["37", "38", "39", "40"],
    onSale: true,
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        variantImg: "./assets/socks.png",
        variantQuantity: 0,
      },
      {
        variantId: 2235,
        variantColor: "blue",
        variantImg: "./assets/socks-blue.png",
        variantQuantity: 10,
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
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImg;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    forSale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on Sale!';
      }
      console.log(this.variants.onSale);
        return this.brand + ' ' + this.product + " are not for Sale!";
    }
  },
});

// var app2 = new Vue({
//     el: '#app2',
//     data: {
//         message: 'Hello World!',
//     }
// })