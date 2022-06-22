const personajeDto = (personaje) => ({
  imagen: personaje.imagen,
  nombre: personaje.nombre,
  id: personaje.id
})

const peliculaOSerieDto = (peliculaOSerie, personajes) => ({
  imagen: peliculaOSerie.imagen,
  titulo: peliculaOSerie.titulo,
  fechaCreacion: peliculaOSerie.fechaCreacion,
  calificacion: peliculaOSerie.calificacion,
  id: peliculaOSerie.id,
  personajes: personajes.map(personajeDto)
})

module.exports = peliculaOSerieDto
