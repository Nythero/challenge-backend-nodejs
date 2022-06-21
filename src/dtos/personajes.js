const personajeDto = (personaje) => {
  return {
    imagen: personaje.imagen,
    nombre: personaje.nombre,
    edad: personaje.edad,
    peso: personaje.peso,
    historia: personaje.historia,
    peliculasOSeries: personaje.peliculasOSeries,
    id: personaje.id
  }
}

module.exports = personajeDto
