import { formatoCLP } from '../utils/format.js'

function ProductCard({ product, cartItem, onAdd, onRemove }) {
  const isInCart = Boolean(cartItem)
  const available = cartItem ? cartItem.cantidad < product.stock : true
  const buttonText = !available
    ? 'Stock completo'
    : isInCart
      ? `Agregar otra unidad (${cartItem.cantidad})`
      : 'Agregar al carrito'

  return (
    <article className="col-sm-6 col-xl-6">
      <div className="card product-card dynamic-product h-100">
        <picture>
          <source media="(max-width: 767.98px)" srcSet={product.imagenMobile} type="image/webp" />
          <img src={product.imagen} className="card-img-top" alt={product.alt} />
        </picture>
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
            <span className="badge badge-tech">{product.categoria}</span>
            {product.recomendado && <span className="recommended-label">Recomendado</span>}
          </div>
          <h3 className="card-title h5">{product.nombre}</h3>
          <p className="card-text">{product.descripcion}</p>
          <p className="stock-text mb-3">Stock disponible: {product.stock}</p>
          <div className="price-block mb-3">
            <span className="old-price">{formatoCLP.format(product.precioNormal)}</span>
            <strong className="offer-price">{formatoCLP.format(product.precioOferta)}</strong>
          </div>
          <div className="mt-auto d-flex flex-column gap-2">
            <button
              className="btn btn-brand"
              type="button"
              onClick={() => onAdd(product)}
              disabled={!available}
            >
              {buttonText}
            </button>
            {isInCart && (
              <button
                className="btn btn-outline-brand"
                type="button"
                onClick={() => onRemove(product.id)}
              >
                Eliminar del carrito ({cartItem.cantidad})
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
