import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cart';

export function usePayment() {
  const router = useRouter();
  const cartStore = useCartStore();

  // Payment form fields
  const handlePaymentSuccess = () => {
    cartStore.clearCart();
    router.push('/confirmation');
  };

  return {
    handlePaymentSuccess,
  };
}
