const categories = [
  { code: 'NB', label: 'Notebooks' },
  { code: 'AU', label: 'Audio' },
  { code: 'AC', label: 'Accesorios' },
  { code: 'GM', label: 'Gaming' },
]

function Categories() {
  return (
    <section id="categorias" className="section-soft py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-lg-4">
            <p className="text-uppercase section-label mb-2">Categorias</p>
            <h2 className="h1 fw-bold">Tecnologia organizada para elegir mejor</h2>
            <p className="mb-0 text-muted-custom">Compara equipos, audio y accesorios desde una estructura clara que se adapta a cualquier pantalla.</p>
          </div>
          {categories.map((category) => (
            <div className="col-md-3 col-lg-2" key={category.code}>
              <div className="feature-box text-center bg-white rounded-2 p-4 h-100">
                <span className="feature-icon mb-3">{category.code}</span>
                <h3 className="h6">{category.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
