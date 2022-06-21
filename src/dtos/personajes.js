const peliculaOSerieDto = (peliculaOSerie) => ({
  imagen: peliculaOSerie.imagen,
  titulo: peliculaOSerie.titulo,
  fechaCreacion: peliculaOSerie.fechaCreacion,
  id: peliculaOSerie.id
})

const personajeDto = (personaje, peliculasOSeries = []) => {
  return {
    imagen: personaje.imagen,
    nombre: personaje.nombre,
    edad: personaje.edad,
    peso: personaje.peso,
    historia: personaje.historia,
    peliculasOSeries: peliculasOSeries.map(peliculaOSerieDto),
    id: personaje.id
  }
}

module.exports = personajeDto
