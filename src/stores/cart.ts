import { defineStore } from 'pinia';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),
  actions: {
    addItem(item: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem(itemId: string) {
      const index = this.items.findIndex(item => item.id === itemId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find(i => i.id === itemId);
      if (item) {
        if (quantity <= 0) {
          this.removeItem(itemId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart() {
      this.items = [];
    }
  },
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
    getItems: (state) => state.items,
  },
});
