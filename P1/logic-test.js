// No editar
const teams = [
  { id: 1, country: 'Spain', name: 'Real Madrid C.F.' },
  { id: 2, country: 'Italy', name: 'A.C. Milan' },
  { id: 3, country: 'Spain', name: 'Futbol Club Barcelona' },
  { id: 4, country: 'Germany', name: 'FC Bayern Munich' },
  { id: 5, country: 'England', name: 'Liverpool F.C.' },
  { id: 6, country: 'Netherlands', name: 'AFC Ajax' },
  { id: 7, country: 'Italy', name: 'Inter Milan' },
  { id: 8, country: 'England', name: 'Manchester United F.C.' },
  { id: 9, country: 'England', name: 'Chelsea F.C.' },
  { id: 10, country: 'Portugal', name: 'FC Porto' },
  { id: 11, country: 'Germany', name: 'Borussia Dortmund' },
  { id: 12, country: 'Italy', name: 'Juventus FC' },
  { id: 13, country: 'France', name: 'Olympique Marseille' }

]

const leagues = [
  { id: 1, country: 'England', name: 'Premier League' },
  { id: 2, country: 'Germany', name: 'Bundesliga' },
  { id: 3, country: 'Netherlands', name: 'Eredivisie' },
  { id: 4, country: 'Spain', name: 'La Liga' },
  { id: 5, country: 'Italy', name: 'Serie A' },
  { id: 6, country: 'Portugal', name: 'Liga NOS' },
  { id: 7, country: 'France', name: 'Lige 1' }
]

const teamsByLeague = [
  { teamId: 12, leagueId: 5 },
  { teamId: 6, leagueId: 3 },
  { teamId: 2, leagueId: 5 },
  { teamId: 3, leagueId: 4 },
  { teamId: 4, leagueId: 2 },
  { teamId: 8, leagueId: 1 },
  { teamId: 10, leagueId: 6 },
  { teamId: 5, leagueId: 1 },
  { teamId: 7, leagueId: 5 },
  { teamId: 9, leagueId: 1 },
  { teamId: 11, leagueId: 2 },
  { teamId: 1, leagueId: 4 },
  { teamId: 13, leagueId: 7 }
]

const winsByTeams = [
  { teamId: 10, wins: 2 },
  { teamId: 6, wins: 4 },
  { teamId: 5, wins: 5 },
  { teamId: 1, wins: 13 },
  { teamId: 7, wins: 3 },
  { teamId: 4, wins: 5 },
  { teamId: 8, wins: 3 },
  { teamId: 2, wins: 7 },
  { teamId: 9, wins: 1 },
  { teamId: 3, wins: 5 },
  { teamId: 11, wins: 1 },
  { teamId: 12, wins: 2 },
  { teamId: 13, wins: 1 }
]

/*
  SECCIÓN PROBLEMAS
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
    - Puede utilizar funciones auxiliares como apoyo para tener una descomposición de código mas clara al momento de lectura.
    - Su prueba debe ejecutarse sin errores con: node logic-test.js
*/

// 0 Arreglo con los ids de los equipos (función de ejemplo)
function listTeamsIds () {
  return teams.map((client) => client.id)
}

/*
Function to sort objects by properties
params: Prorpety of sort (String)
return: new Array
*/ 
const sortObjectByProperty = (property) => {
  return function (a, b) {
    if (a[property] < b[property]) {
      return -1;
    }
    else if (a[property] > b[property]) {
      return 1;
    }
    else return 0;
  }
}

// 1 Arreglo con los nombres de los equipos y el país al que pertenecen, ordenados alfabéticamente por el nombre de su país de origen.
function listTeamsByCountry () {
  // CODE HERE

  let auxTeams = teams.map((team) => new Object({ name: team.name, country: team.country })).sort()
  return auxTeams.sort(sortObjectByProperty('country'))
}

/* 
General function to fill a array object with data such as league, wins, etc.
params: withId (Boolean)
return a new Array
*/
const fillArrayTeamsData = (arrayTeams, arrayWinsByTeams, withId, withLeague) => {
  let winnersTeams = []
  
  for(team of arrayTeams) {
    newTeam = { name: team.name }

    // If withId is true. Set the id in the object
    if (withId) newTeam.id = team.id
    if(withLeague) {
      const teamLeague = teamsByLeague.filter((element) => element.teamId === team.id)
      newTeam.leagueId = teamLeague[0].leagueId
    }

    for (winners of arrayWinsByTeams) {
      if (winners.teamId == team.id) {
        newTeam.wins = winners.wins
      }
    }
    winnersTeams.push(newTeam)
  }
  return winnersTeams
}
// 2 Arreglo con los nombres de los equipos ordenados de mayor a menor por la cantidad de victorias en champions league.
function sortTeamsByWins () {
  // CODE HERE
  let winnersTeams = fillArrayTeamsData(teams, winsByTeams)
  return winnersTeams.sort(sortObjectByProperty('wins')).reverse()
}

const LeaguesOrderByWins = () => {
  // CODE HERE
  let arrayLeaguesWithWins = []
  let winnersTeam = fillArrayTeamsData(teams, winsByTeams, true)

  // Iterate the array of leagues
  for (league of leagues) {
    // Created a new Object newLeague with his name and his wins initializate in zero
    let newLeague = { name: league.name, wins: 0 }

    // Iterate the teamsByLeague
    for (teamLeague of teamsByLeague) {

      // If the league is equal the leagueId of teamLeague
      if (league.id === teamLeague.leagueId) {
        // filter the teams
        let team = winnersTeam.filter((element) => {
          return element.id === teamLeague.teamId
        })
        // amount the wins for league
        newLeague.wins += team[0]['wins']
      }
    }
    // Push in the array the newLeague object with the count of wins
    arrayLeaguesWithWins.push(newLeague)
  }
  return arrayLeaguesWithWins.sort(sortObjectByProperty('wins')).reverse()
}

// 3 Arreglo de objetos en donde se muestre el nombre de las ligas y la sumatoria de las victorias de los equipos que pertenecen a ellas.
function leaguesWithWins () {
  return LeaguesOrderByWins()
}

/* 
Function to fill array of objects with the leagues and his teams
Params: condition (String)
*/
const fillArrayOfLeagueWithTheMostLoserOfWinner = (condition) => {
  let arrayLeagues = []
  for (league of leagues) {
    let newLeague = {}

    const teamsData = fillArrayTeamsData(teams, winsByTeams, false, true)
    const teamsByLeague = teamsData.filter((element) => league.id === element.leagueId)
    if (condition === 'loser') {
      // If conditon is loser. Set the team with lower wins in champions league
      newLeague[league.name] = teamsByLeague.sort(sortObjectByProperty('wins'))[0].name
    } else {
      // If conditon is winner. Set the team with the most wins in champions league
      newLeague[league.name] = teamsByLeague.sort(sortObjectByProperty('wins')).reverse()[0].name
    }
    arrayLeagues.push(newLeague)
  }

  return arrayLeagues
}

// 4 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la menor cantidad de victorias en champions.
function leaguesWithTeamWithLestWins () {
  // CODE HERE
  return fillArrayOfLeagueWithTheMostLoserOfWinner('loser')
}

// 5 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la mayor cantidad de victorias en champions.
function leaguesWithTeamWithMostWins () {
  // CODE HERE
  return fillArrayOfLeagueWithTheMostLoserOfWinner('winner')
}

// 6 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de victorias de sus equipos.
function sortLeaguesByTeamsByWins () {
  // CODE HERE
  const leagues = LeaguesOrderByWins()
  return leagues.map((element) => element.name)
}

// 7 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de equipos que participan en ellas.
function sortLeaguesByTeams () {
  // CODE HERE
  let orderLeagues = []
  for (league of leagues) {
    const countLeague = teamsByLeague.filter((element) => element.leagueId === league.id).length
    let newLeague = { league: league.name, teams: countLeague }
    orderLeagues.push(newLeague);
  }
  return orderLeagues
}

// 8 Agregar un nuevo equipo con datos ficticios a "teams", asociarlo a la liga de Francia y agregar un total de 4 victorias en champions.
// Luego devolver el lugar que ocupa este equipo en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newTeamRanking () {
  // CODE HERE

  // Initializing arrays 
  let auxTeams = teams
  let auxTeamsByLeague = teamsByLeague
  let auxWinsTeam = winsByTeams 

  // Create new objects
  let newTeam = { id: 14, country: 'France', name: 'PSG' }
  let newTeamLeague = { teamId: newTeam.id, leagueId: 7 }
  let newWinsTeam = { teamId: 14, wins: 4 }
  
  auxTeams.push(newTeam)
  auxTeamsByLeague.push(newTeamLeague)
  auxWinsTeam.push(newWinsTeam)

  const ranking = fillArrayTeamsData(auxTeams, auxWinsTeam)
  return ranking.sort(sortObjectByProperty('wins')).reverse()
}

// 9 Realice una función que retorne una promesa con los nombres de los equipos en upper case.
// haga la llamada a la función creada desde esta función y asignarle la respuesta a la variable response.
// recuerde que debe esperar el retorno de función asíncrona para que su resultado pueda ser mostrado por el
// console.log. Utilice async await para la llamada asíncrona a la función.
// NOTA: solo debe crear la función asíncrona y agregar la llamada en la siguiente función.

const upperCase = new Promise((resolve, reject) => {
  resolve(teams.map(team => team.name.toUpperCase()))
});

async function getTeamsNamesAsUpperCase () {
  let response
  // ------MAKE AWAIT CALL HERE------
  response = await upperCase
  // --------------------------------
  console.log('response:')
  console.log(response)
}

// Impresión de soluciones. No modificar.
console.log('Pregunta 0')
console.log(listTeamsIds(1))
console.log('Pregunta 1')
console.log(listTeamsByCountry())
console.log('Pregunta 2')
console.log(sortTeamsByWins())
console.log('Pregunta 3')
console.log(leaguesWithWins())
console.log('Pregunta 4')
console.log((leaguesWithTeamWithLestWins()))
console.log('Pregunta 5')
console.log((leaguesWithTeamWithMostWins()))
console.log('Pregunta 6')
console.log((sortLeaguesByTeamsByWins()))
console.log('Pregunta 7')
console.log((sortLeaguesByTeams()))
console.log('Pregunta 8')
console.log((newTeamRanking()))
console.log('Pregunta 9')
console.log(getTeamsNamesAsUpperCase())
