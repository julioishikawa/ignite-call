export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map(
      (day) => formatter.format(new Date(Date.UTC(2021, 5, day))), // data que o dia 1 começa sendo domingo
    )
    .map((weekDay) => {
      return weekDay.charAt(0).toUpperCase() + weekDay.slice(1) // Deixar a primeira letra maiúscula
    })
}
