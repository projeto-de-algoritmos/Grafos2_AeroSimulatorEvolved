export const airports = [
    {id: 0, name: "Brasília"},    {id: 1, name: "Teresina"},    {id: 2, name: "Fortaleza"},    
    {id: 3, name: "Natal"},    {id: 4, name: "João Pessoa"},    {id: 5, name: "Recife"},    
    {id: 6, name: "Maceió"},    {id: 7, name: "Aracaju"},    {id: 8, name: "Salvador"},    
    {id: 9, name: "Vitória"},    {id: 10, name: "Rio de Janeiro"},    {id: 11, name: "São Paulo"},    
    {id: 12, name: "Curitiba"},    {id: 13, name: "Florianópolis"},    {id: 14, name: "Porto Alegre"},    
    {id: 15, name: "Campo Grande"},    {id: 16, name: "Cuiabá"},    {id: 17, name: "Porto Velho"},    
    {id: 18, name: "Rio Branco"},    {id: 19, name: "Manaus"},    {id: 20, name: "Boa Vista"},    
    {id: 21, name: "Macapá"},    {id: 22, name: "Belém"},    {id: 23, name: "São Luís"},    
    { id: 24, name: "Palmas"},    {id: 25, name: "Goiânia"},    {id: 26, name: "Belo Horizonte"}
];

export const getAirportById = (id) => {
    return airports[id]
}

export const getAirports = () => {
    return airports.map((airport) => {
        return { value: airport.id, label: airport.name }
    })
}

export const getRemainingAirports = (selectedAirportId) => {
    return airports.filter((airport) => {
        return airport.id !== selectedAirportId
    })
}