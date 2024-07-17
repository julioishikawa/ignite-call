interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map(
      (day) => formatter.format(new Date(Date.UTC(2021, 5, day))), // Data que o primeiro dia da semana começa sendo domingo
    )
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase() // Retorna as três primeiras letras do dia em letras maíuscula
      }

      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1)) // Deixar a primeira letra maiúscula
    })
}
