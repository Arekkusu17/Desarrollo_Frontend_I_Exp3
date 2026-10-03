import { assetPath } from '../utils/assets.js'

const slides = [
  {
    id: 'notebooks',
    eyebrow: 'Nueva temporada',
    title: 'Equipos listos para estudiar, crear y jugar',
    text: 'Encuentra notebooks, accesorios y audio con opciones pensadas para cada rutina digital.',
    action: 'Ver productos',
    href: '#productos',
    buttonClass: 'btn-brand',
    image: 'assets/img/hero/notebooks.jpg',
    mobileImage: 'assets/img/hero/mobile/notebooks.webp',
  },
  {
    id: 'audio',
    eyebrow: 'Audio inmersivo',
    title: 'Sonido claro para clases, reuniones y musica',
    text: 'Audifonos inalambricos, parlantes portatiles y soluciones para trabajar sin distracciones.',
    action: 'Explorar categorias',
    href: '#categorias',
    buttonClass: 'btn-light',
    image: 'assets/img/hero/audio.jpg',
    mobileImage: 'assets/img/hero/mobile/audio.webp',
  },
  {
    id: 'setup',
    eyebrow: 'Setup completo',
    title: 'Accesorios para mejorar tu espacio digital',
    text: 'Teclados, mouse, monitores y bases para un escritorio mas comodo y productivo.',
    action: 'Contactanos',
    href: '#contacto',
    buttonClass: 'btn-outline-light',
    image: 'assets/img/hero/setup.jpg',
    mobileImage: 'assets/img/hero/mobile/setup.webp',
  },
]

function Hero() {
  return (
    <header id="inicio">
      <div id="carouselPromociones" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              data-bs-target="#carouselPromociones"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Promocion ${slide.id}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item hero-slide ${index === 0 ? 'active' : ''}`}
              style={{
                '--hero-image': `url("${assetPath(slide.image)}")`,
                '--hero-mobile-image': `url("${assetPath(slide.mobileImage)}")`,
              }}
            >
              <div className="hero-overlay d-flex align-items-center">
                <div className="container text-white">
                  <div className="col-lg-7">
                    <p className="text-uppercase fw-semibold mb-2">{slide.eyebrow}</p>
                    {index === 0 ? (
                      <h1 className="display-5 fw-bold">{slide.title}</h1>
                    ) : (
                      <h2 className="display-5 fw-bold">{slide.title}</h2>
                    )}
                    <p className="lead mb-4">{slide.text}</p>
                    <a href={slide.href} className={`btn ${slide.buttonClass} btn-lg`}>{slide.action}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselPromociones" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselPromociones" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </header>
  )
}

export default Hero
