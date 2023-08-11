Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
  <div>
    <h1>
      {{title}} 
    </h1>
    <p>
        {{description}}
    </p>
    <a :href="href" :title="description">
        <img :src="image" :alt="product">
    </a>
    <!-- <span class="inStock" v-show="inStock">on Sale!</span> -->
    <p>
        sizes:
    </p>
    <ul>
      <li v-for="size in sizes">
          {{size}}
      </li>
    </ul>
      <!-- event handling -->
      <button v-on:click="addItem" class="add" :disabled="!inStock" :class="{disabledButton : !inStock}">
          add to cart
      </button>
      <button v-on:click="removeItem" class="remove">
          remove from cart
      </button>
      <!-- style binding -->
      <div class="color-box" v-for="(variant , index) in variants" :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
      </div>
      <p  :class="{outOfStock: !inStock}">
          Out of Stock
      </p>
      <p>
          {{forSale}}
      </p>
      <p>shipping: {{shipping}}</p>
    </div>
    `,
  data() {
    return {
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
          variantQuantity: 3,
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImg: "./assets/socks-blue.png",
          variantQuantity: 10,
        },
      ],
    };
  },
  methods: {
    addItem() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    removeItem() {
      this.$emit('remove-from-cart' , this.variants[this.selectedVariant].variantId);
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
        return this.brand + " " + this.product + " are on Sale!";
      }
      console.log(this.variants.onSale);
      return this.brand + " " + this.product + " are not for Sale!";
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return 2.99
    }
  },
});
Vue.component("product-details", {
  props: {
    details: {
      type: String,
      required: true,
    },

  },
  template: `<div>
  <h3>
  {{details}}
  </h3>
  </div>`
});

var app = new Vue({
  el: "#app", 
  data: {
    premium: true,
    details: 'this is the details of product',
      cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      console.log(this.cart.indexOf(id));
      selectedVal = this.cart.indexOf(id)
      if (this.cart.length >=0 && selectedVal >=0) {
        this.cart.splice(selectedVal ,1)
      }
    }
  }
});

// var app2 = new Vue({
//     el: '#app2',
//     data: {
//         message: 'Hello World!',
//     }
// })