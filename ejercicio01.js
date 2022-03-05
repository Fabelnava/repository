let dia = prompt("Ingresa el dia de hoy").toLowerCase();

if (
  dia === "lunes" ||
  dia === "martes" ||
  dia === "miercoles" ||
  dia === "jueves" ||
  dia === "viernes"
) {
  alert("Estamos entre semana, centrate y mantente aplicado o en clases ;v");
} else {
  alert("Es casi fin de semana y el cuerpo lo sabe :D");
}