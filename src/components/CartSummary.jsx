import { formatoCLP } from '../utils/format.js'

function CartSummary({ cart, totalItems, totalPrice, onAdd, onDecrease, onRemove, onClear }) {
  return (
    <aside id="carrito" className="cart-panel">
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div>
          <p className="text-uppercase section-label mb-1">Carrito</p>
          <h3 className="h4 fw-bold mb-0">Resumen de compra</h3>
        </div>
        <span className="cart-count" aria-label="Cantidad de productos en el carrito">{totalItems}</span>
      </div>

      {cart.length === 0 ? (
        <p className="text-muted-custom mb-0">El carrito esta vacio. Agrega productos para ver el total.</p>
      ) : (
        <div className="cart-items" aria-live="polite">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <p className="fw-semibold mb-1">{item.nombre}</p>
                <p className="small text-muted-custom mb-0">
                  {item.cantidad} x {formatoCLP.format(item.precioOferta)}
                </p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-outline-brand cart-action" type="button" onClick={() => onDecrease(item.id)} aria-label={`Quitar una unidad de ${item.nombre}`}>-</button>
                <button className="btn btn-sm btn-outline-brand cart-action" type="button" onClick={() => onAdd(item)} disabled={item.cantidad >= item.stock} aria-label={`Agregar una unidad de ${item.nombre}`}>+</button>
                <button className="btn btn-sm btn-outline-danger cart-remove" type="button" onClick={() => onRemove(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-total d-flex justify-content-between align-items-center mt-3 pt-3">
        <span>Total</span>
        <strong>{formatoCLP.format(totalPrice)}</strong>
      </div>
      <button className="btn btn-outline-brand w-100 mt-3" type="button" onClick={onClear} disabled={cart.length === 0}>
        Vaciar carrito
      </button>
    </aside>
  )
}

export default CartSummary
