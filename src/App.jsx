import { useEffect, useMemo, useState } from 'react'
import Benefits from './components/Benefits.jsx'
import CartSummary from './components/CartSummary.jsx'
import Categories from './components/Categories.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ProductSection from './components/ProductSection.jsx'
import { assetPath } from './utils/assets.js'
import { normalizeText } from './utils/format.js'

function App() {
  const [products, setProducts] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [cart, setCart] = useState([])
  const [category, setCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    // Carga dinamica solicitada en Semana 8: los productos vienen desde un JSON local.
    async function loadProducts() {
      try {
        const response = await fetch(assetPath('data/products.json'))

        if (!response.ok) {
          throw new Error('No se pudo cargar el catalogo de productos.')
        }

        const data = await response.json()
        const productsWithAssets = data.map((product) => ({
          ...product,
          imagen: assetPath(product.imagen),
          imagenMobile: assetPath(product.imagenMobile),
        }))

        setProducts(productsWithAssets)
        setProductsError('')
        setStatusMessage(`Catalogo cargado dinamicamente con ${productsWithAssets.length} productos.`)
      } catch (error) {
        setProductsError(error.message)
        setStatusMessage('Revisa la conexion o intenta recargar la pagina.')
      } finally {
        setIsLoadingProducts(false)
      }
    }

    loadProducts()
  }, [])

  const visibleProducts = useMemo(() => {
    const normalizedSearch = normalizeText(search)

    return products.filter((product) => {
      const matchesCategory = category === 'Todos' || product.categoria === category
      const productText = normalizeText(`${product.nombre} ${product.categoria} ${product.descripcion}`)
      const matchesSearch = !normalizedSearch || productText.includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [category, products, search])

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.precioOferta * item.cantidad, 0)

  function addToCart(product) {
    const cartItem = cart.find((item) => item.id === product.id)

    // El carrito respeta el stock disponible y actualiza cantidades con useState.
    if (cartItem?.cantidad >= product.stock) {
      setStatusMessage(`No puedes agregar mas unidades de ${product.nombre}; el stock disponible es ${product.stock}.`)
      return
    }

    if (cartItem) {
      setCart((currentCart) =>
        currentCart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        ),
      )
      setStatusMessage(`${product.nombre} fue agregado nuevamente al carrito.`)
      return
    }

    setCart((currentCart) => [...currentCart, { ...product, cantidad: 1 }])
    setStatusMessage(`${product.nombre} fue agregado al carrito.`)
  }

  function decreaseQuantity(productId) {
    setCart((currentCart) =>
      currentCart
        .map((item) => item.id === productId ? { ...item, cantidad: item.cantidad - 1 } : item)
        .filter((item) => item.cantidad > 0),
    )
    setStatusMessage('Cantidad actualizada en el carrito.')
  }

  function removeFromCart(productId) {
    const product = cart.find((item) => item.id === productId)
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
    setStatusMessage(product ? `${product.nombre} fue eliminado del carrito.` : 'Producto eliminado del carrito.')
  }

  function clearCart() {
    setCart([])
    setStatusMessage('El carrito fue vaciado correctamente.')
  }

  function handleCategoryChange(nextCategory) {
    setCategory(nextCategory)
    setStatusMessage(`Filtro aplicado: ${nextCategory}.`)
  }

  function clearSearch() {
    setSearch('')
    setStatusMessage('Busqueda limpiada.')
  }

  return (
    <>
      <Header cartCount={totalItems} />
      <Hero />
      <main>
        <Categories />
        <section id="productos" className="py-5">
          <div className="container">
            <div className="row g-4 align-items-start">
              <div className="col-lg-8">
                <ProductSection
                  products={products}
                  visibleProducts={visibleProducts}
                  category={category}
                  search={search}
                  cart={cart}
                  statusMessage={statusMessage}
                  isLoading={isLoadingProducts}
                  error={productsError}
                  onCategoryChange={handleCategoryChange}
                  onSearchChange={setSearch}
                  onClearSearch={clearSearch}
                  onAddToCart={addToCart}
                  onRemoveFromCart={removeFromCart}
                />
              </div>
              <div className="col-lg-4">
                <CartSummary
                  cart={cart}
                  totalItems={totalItems}
                  totalPrice={totalPrice}
                  onAdd={addToCart}
                  onDecrease={decreaseQuantity}
                  onRemove={removeFromCart}
                  onClear={clearCart}
                />
              </div>
            </div>
          </div>
        </section>
        <Benefits />
        <Contact products={products} />
      </main>
      <Footer />
    </>
  )
}

export default App
