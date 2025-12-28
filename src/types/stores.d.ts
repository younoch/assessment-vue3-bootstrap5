declare module '@/stores/cart' {
  export function useCartStore(): {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    getCount: number;
  };
}
