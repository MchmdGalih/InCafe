export const payWithMidtrans = (token, callbacks = {}) => {
  window.snap.pay(token, {
    onSuccess: function (result) {
      /* You may add your own implementation here */
      console.log(result)
      callbacks.onSuccess?.(result)
    },
    onPending: function (result) {
      /* You may add your own implementation here */
      console.log(result)
      callbacks.onPending?.(result)
    },
    onError: function (result) {
      /* You may add your own implementation here */
      console.log(result)
      callbacks.onError?.(result)
    },
    onClose: function () {
      /* You may add your own implementation here */
      callbacks.onClose?.()
    },
  })
}
