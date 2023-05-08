import { getAirportById } from "./airports"

export const generateOutputTitle = (departure, destination) => {
    let [dept, dest] = [getAirportById(departure), getAirportById(destination)]
    return `Rota de ${dept.name} para ${dest.name}`
}

export const generateOutputText = (route) => {
    let intermediateRoute = []
    let message = []

    if(route.length > 2)
        intermediateRoute = route.slice(1)

    message.push(`· Saia do Aeroporto de ${route[0]} com destino a ${route[1]}`)
    
    for(let i = 0; i < (intermediateRoute.length - 1); i++) {
        message.push(`· Faça conexão no Aeroporto de ${intermediateRoute[i]} com destino a ${intermediateRoute[i+1]}`)
    }
    message.push(`· Desembarque no Aeroporto de ${route[route.length-1]}`)

    return message
}

export const generateErrorMessage = (code) => {
    switch (code) {
        case 1:
            return `O aeroporto de partida deve ser diferente do aeroporto de destino!`
        case 2:
            return `Você deve escolher algum aeroporto válido!`
        default:
            return `Entrada inválida!`
    }
}