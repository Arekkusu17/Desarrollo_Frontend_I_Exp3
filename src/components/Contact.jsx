import { useState } from 'react'

function Contact({ products }) {
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get('nombre').trim()
    const email = form.get('correo').trim()
    const product = form.get('productoInteres')
    const text = form.get('mensaje').trim()

    if (!name || !email || !product || !text) {
      setMessage('Completa todos los campos antes de enviar la consulta.')
      return
    }

    setMessage(`Gracias, ${name}. Tu consulta por ${product} fue registrada correctamente.`)
    event.currentTarget.reset()
  }

  return (
    <section id="contacto" className="py-5">
      <div className="container">
        <div className="row justify-content-center g-4">
          <div className="col-lg-5">
            <p className="text-uppercase section-label mb-2">Contacto</p>
            <h2 className="h1 fw-bold">Cotiza tu proximo producto tech</h2>
            <p className="text-muted-custom">Completa el formulario para confirmar disponibilidad, comparar modelos o recibir una recomendacion personalizada.</p>
          </div>
          <div className="col-lg-7">
            <form className="contact-form" autoComplete="off" noValidate onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" autoComplete="off" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="correo" className="form-label">Correo</label>
                  <input type="email" className="form-control" id="correo" name="correo" autoComplete="off" required />
                </div>
                <div className="col-12">
                  <label htmlFor="productoInteres" className="form-label">Producto de interes</label>
                  <select className="form-select" id="productoInteres" name="productoInteres" required>
                    <option value="">Selecciona una opcion</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.nombre}>{product.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="mensaje" className="form-label">Mensaje</label>
                  <textarea className="form-control" id="mensaje" name="mensaje" rows="4" required></textarea>
                </div>
                <div className="col-12 d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                  <button type="submit" className="btn btn-brand btn-lg">Enviar consulta</button>
                </div>
              </div>
            </form>
            {message && <div className="alert alert-success mt-3" aria-live="polite">{message}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
