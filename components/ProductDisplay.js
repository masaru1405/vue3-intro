app.component('product-display',{
   props: {
      premium: {
         type: Boolean,
         required: true
      }
   },
   template:
   /*necessário colocar o 'html' abaixo para que o highlight syntax do html funcione, precisa add tmb uma extensão*/

   /*html*/ 
   `
   <div class="product-display">
      <div class="product-container">
         <div class="product-image">
            <img :src="image" :alt="description">
         </div>
         <div class="product-info">
            <h1>{{title}}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>
            <ul>
               <li v-for="(detail, index) in details" :key="index">
                  {{detail}}
               </li>
            </ul>
            <div 
               v-for="(variant, index) in variants" 
               :key="index" 
               @mouseover="updateVariant(index)"
               class="color-circle" 
               :style="{backgroundColor: variant.color}"
            >
            </div>
            <button 
               class="button"
               :class="{disabledButton: !inStock}" 
               @click="addToCart" 
               :disabled="!inStock"
            >
               Add to Cart
            </button>
         </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
   </div>
   `,
   data(){
      return{
         product: 'Socks',
         brand: 'Vue Mastery',
         description: 'This is a beatiful sock!',
         selectedVariant: 0,
         inventory: 100,
         details: ['50% cotton', '30% wool', '20% polyster'],
         variants: [
            {id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50},
            {id: 1555, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0}
         ],
         reviews: []
      }
   },
   methods: {
      addToCart(){
         this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
      },
      updateVariant(index){
         this.selectedVariant = index
      },
      addReview(review){
         this.reviews.push(review)
      }
   },
   computed: {
      title(){
         return this.brand + ' ' + this.product
      },
      image(){
         return this.variants[this.selectedVariant].image
      },
      inStock(){
         return this.variants[this.selectedVariant].quantity
      },
      shipping(){
         if (this.premium){
            return 'Free'
         }
         return 2.99
      }
   }
})