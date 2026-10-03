import ProductCard from './ProductCard.jsx'

const filters = ['Todos', 'Notebook', 'Audio', 'Accesorio', 'Gaming']

function ProductSection({
  products,
  visibleProducts,
  category,
  search,
  cart,
  statusMessage,
  onCategoryChange,
  onSearchChange,
  onClearSearch,
  onAddToCart,
  onRemoveFromCart,
}) {
  const categoryText = category === 'Todos' ? 'todas las categorias' : category
  const summary = `${visibleProducts.length} producto(s) visibles en ${categoryText}${search ? ' con busqueda activa' : ''}.`

  return (
    <>
      <div className="row align-items-end mb-4 g-3">
        <div className="col-lg-8">
          <p className="text-uppercase section-label mb-2">Catalogo React</p>
          <h2 className="h1 fw-bold">Productos destacados</h2>
          <p className="mb-0 text-muted-custom">Listado de productos renderizado con componentes funcionales, estado y eventos de React.</p>
        </div>
        <div className="col-lg-4">
          <p className="catalog-summary mb-0" aria-live="polite">{summary}</p>
        </div>
      </div>

      <div className="product-toolbar d-flex flex-column gap-3 mb-4">
        <form className="search-form" role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="busquedaProducto" className="form-label fw-semibold mb-2">Buscar productos</label>
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              id="busquedaProducto"
              name="busquedaProducto"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Ejemplo: notebook, audio, monitor"
            />
            <button className="btn btn-outline-brand" type="button" onClick={onClearSearch}>Limpiar</button>
          </div>
        </form>
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
          <div className="btn-group flex-wrap" role="group" aria-label="Filtrar productos por categoria">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`btn btn-outline-brand ${category === filter ? 'active' : ''}`}
                type="button"
                onClick={() => onCategoryChange(filter)}
              >
                {filter === 'Todos' ? 'Todos' : filter === 'Notebook' ? 'Notebooks' : filter}
              </button>
            ))}
          </div>
          <p className="product-hint mb-0" aria-live="polite">
            {statusMessage || `Catalogo con ${products.length} productos disponibles.`}
          </p>
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <div className="alert alert-warning" role="status">
          No hay productos que coincidan con la busqueda o categoria seleccionada.
        </div>
      ) : (
        <div className="row g-4" aria-live="polite">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartItem={cart.find((item) => item.id === product.id)}
              onAdd={onAddToCart}
              onRemove={onRemoveFromCart}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default ProductSection
