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
      <hr/>
      <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>
              {{review.name}}
            </p>
            <p>
              {{review.review}}
            </p>
            <p>
              rating:
              {{review.rating}}
            </p>
          </li>
        </ul>
      </div>
      <product-review @review-submitted="addReview"></product-review>
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
      reviews: []
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
    addReview(productReview) {
      this.reviews.push(productReview)
    }
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

Vue.component('product-review' , {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review" ></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
      Would you recommend this product?
      <br>
      <input type="radio" id="no" v-model="recommend" :value="false">
      <label for="no">No</label><br>
      <input type="radio" id="yes" v-model="recommend" :value="true">
      <label for="yes">Yes</label><br>
      
      </p>
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        this.$emit('review-submitted' , productReview)
        this.name = null
        this.review = null
        this.rating = null
        this.recommend = null
      }
      else {
        if (!this.name) this.errors.push('name required.')
        if (!this.review) this.errors.push('review required.')
        if (!this.rating) this.errors.push('rating required.')
        if (!this.recommend) this.errors.push('recommend required.')
      }
    }
  }

})

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