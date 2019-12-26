import { config } from './src/app/config/config';
import * as firebase from 'firebase';

const firebaseConfig = config.firebaseConfig;

console.log('Uploading data to the database with the following config:\n');

console.log(JSON.stringify(firebaseConfig));

console.log('\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n');

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function uploadData() {
  uploadPlayers();
  uploadStatsSeason1();
  uploadStatsSeason2();
  uploadMatches();
  uploadTeamPicker();
  uploadChats();
}

async function uploadPlayers() {
  const players = db.collection('players');

  const playerList: string[] = ['Akachi', 'Anson', 'Ashan', 'Christian', 'Cosmin', 'Daniel', 'Eric', 'Fernando', 'Goce',
    'Igor', 'Jason', 'Jeff', 'JM', 'Joe', 'Johan', 'John', 'Kenneth', 'Matt Bojo', 'Matt Brunson', 'Matt Weaver',
    'Mike', 'Nawid', 'Pedro', 'Sab', 'Shane', 'Sundev', 'Uffe', 'Vishnu', 'Vlad', 'Walt', 'Zoran'];

  playerList.forEach((player: string) => {
    players.add({ name: player });
  });
}

async function uploadStatsSeason1() {
  const season1 = db.collection('season1');

  season1.add({
    name: 'Akachi',
    wins: 1,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 0
  });

  season1.add({
    name: 'Anson',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 8,
    cleanSheets: 0
  });

  season1.add({
    name: 'Ashan',
    wins: 4,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 1
  });

  season1.add({
    name: 'Christian',
    wins: 6,
    captainWins: 0,
    goals: 6,
    ownGoals: 0,
    gamesPlayed: 14,
    cleanSheets: 0
  });

  season1.add({
    name: 'Cosmin',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0
  });

  season1.add({
    name: 'Daniel',
    wins: 6,
    captainWins: 1,
    goals: 7,
    ownGoals: 0,
    gamesPlayed: 13,
    cleanSheets: 1
  });

  season1.add({
    name: 'David',
    wins: 0,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 1,
    cleanSheets: 0
  });

  season1.add({
    name: 'Eric',
    wins: 4,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 0
  });

  season1.add({
    name: 'Fernando',
    wins: 7,
    captainWins: 0,
    goals: 2,
    ownGoals: 1,
    gamesPlayed: 12,
    cleanSheets: 1
  });

  season1.add({
    name: 'Goce',
    wins: 3,
    captainWins: 0,
    goals: 2,
    ownGoals: 0,
    gamesPlayed: 10,
    cleanSheets: 1
  });

  season1.add({
    name: 'Igor',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0
  });

  season1.add({
    name: 'Jason',
    wins: 3,
    captainWins: 0,
    goals: 4,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 1
  });

  season1.add({
    name: 'Jeff',
    wins: 6,
    captainWins: 1,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 8,
    cleanSheets: 1
  });

  season1.add({
    name: 'JM',
    wins: 8,
    captainWins: 0,
    goals: 15,
    ownGoals: 0,
    gamesPlayed: 14,
    cleanSheets: 1
  });

  season1.add({
    name: 'Joe',
    wins: 5,
    captainWins: 1,
    goals: 6,
    ownGoals: 0,
    gamesPlayed: 11,
    cleanSheets: 1
  });

  season1.add({
    name: 'Johan',
    wins: 7,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 10,
    cleanSheets: 2
  });

  season1.add({
    name: 'John',
    wins: 8,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 13,
    cleanSheets: 2
  });

  season1.add({
    name: 'Kenneth',
    wins: 2,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 14,
    cleanSheets: 0
  });

  season1.add({
    name: 'Kyle',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 1,
    cleanSheets: 0
  });

  season1.add({
    name: 'Manbir',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 0
  });

  season1.add({
    name: 'Matt Bojo',
    wins: 3,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 8,
    cleanSheets: 1
  });

  season1.add({
    name: 'Matt Brunson',
    wins: 1,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 0
  });

  season1.add({
    name: 'Matt Weaver',
    wins: 3,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 0
  });

  season1.add({
    name: 'Mike',
    wins: 6,
    captainWins: 1,
    goals: 4,
    ownGoals: 0,
    gamesPlayed: 14,
    cleanSheets: 0
  });

  season1.add({
    name: 'Nawid',
    wins: 4,
    captainWins: 1,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 8,
    cleanSheets: 0
  });

  season1.add({
    name: 'Pedro',
    wins: 1,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 0
  });

  season1.add({
    name: 'Sab',
    wins: 7,
    captainWins: 1,
    goals: 3,
    ownGoals: 1,
    gamesPlayed: 14,
    cleanSheets: 2
  });

  season1.add({
    name: 'Sam',
    wins: 0,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0
  });

  season1.add({
    name: 'Shane',
    wins: 11,
    captainWins: 1,
    goals: 3,
    ownGoals: 0,
    gamesPlayed: 13,
    cleanSheets: 2
  });

  season1.add({
    name: 'Sina',
    wins: 0,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 1,
    cleanSheets: 0
  });

  season1.add({
    name: 'Sundev',
    wins: 6,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 9,
    cleanSheets: 0
  });

  season1.add({
    name: 'Uffe',
    wins: 2,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 0
  });

  season1.add({
    name: 'Vishnu',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 0
  });

  season1.add({
    name: 'Vlad',
    wins: 5,
    captainWins: 1,
    goals: 8,
    ownGoals: 0,
    gamesPlayed: 8,
    cleanSheets: 1
  });

  season1.add({
    name: 'Walt',
    wins: 2,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 0
  });

  season1.add({
    name: 'Zoran',
    wins: 8,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 13,
    cleanSheets: 1
  });
}

async function uploadStatsSeason2() {
  const season2 = db.collection('season2');

  season2.add({
    name: 'Aaron',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'Akachi',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'Anson',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Ashan',
    wins: 0,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Christian',
    wins: 3,
    captainWins: 0,
    goals: 2,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Cosmin',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Daniel',
    wins: 3,
    captainWins: 1,
    goals: 2,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 2,
    assists: 2
  });

  season2.add({
    name: 'Eric',
    wins: 2,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'Fernando',
    wins: 2,
    captainWins: 1,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 1,
    assists: 1
  });

  season2.add({
    name: 'Goce',
    wins: 2,
    captainWins: 0,
    goals: 2,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Hamid',
    wins: 2,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 0,
    assists: 1
  });

  season2.add({
    name: 'Igor',
    wins: 1,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Jason',
    wins: 3,
    captainWins: 1,
    goals: 4,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 1,
    assists: 2
  });

  season2.add({
    name: 'JM',
    wins: 3,
    captainWins: 0,
    goals: 4,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 0,
    assists: 1
  });

  season2.add({
    name: 'Joe',
    wins: 3,
    captainWins: 0,
    goals: 4,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 1,
    assists: 2
  });

  season2.add({
    name: 'Johan',
    wins: 3,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'John',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Kenneth',
    wins: 4,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'Matt Bojo',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 1,
    assists: 1
  });

  season2.add({
    name: 'Mike',
    wins: 0,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Nawid',
    wins: 5,
    captainWins: 1,
    goals: 7,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 2,
    assists: 0
  });

  season2.add({
    name: 'Pedro',
    wins: 4,
    captainWins: 1,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 1,
    assists: 1
  });

  season2.add({
    name: 'Quais',
    wins: 0,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 1,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Sab',
    wins: 4,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 6,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'Sam Chase',
    wins: 1,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'Shane',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 1,
    assists: 1
  });

  season2.add({
    name: 'Soliman',
    wins: 1,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 1,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'Sundev',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 2,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Uffe',
    wins: 2,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Vishnu',
    wins: 1,
    captainWins: 0,
    goals: 0,
    ownGoals: 0,
    gamesPlayed: 3,
    cleanSheets: 0,
    assists: 0
  });

  season2.add({
    name: 'Vlad',
    wins: 2,
    captainWins: 0,
    goals: 4,
    ownGoals: 0,
    gamesPlayed: 4,
    cleanSheets: 1,
    assists: 0
  });

  season2.add({
    name: 'Walt',
    wins: 4,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 5,
    cleanSheets: 1,
    assists: 3
  });

  season2.add({
    name: 'Zoran',
    wins: 5,
    captainWins: 0,
    goals: 1,
    ownGoals: 0,
    gamesPlayed: 7,
    cleanSheets: 2,
    assists: 2
  });
}

async function uploadMatches() {
  const matches = db.collection('matches');

  matches.add({
    date: '11-23-2019',
    whiteTeam: {
      players: 'Anson,Jason,Johan,Kenneth,Daniel,Mike,Nawid,Aaron,Hamid,Zoran',
      goals: 'Nawid,Nawid',
      assists: 'Jason,Hamid'
    },
    darkTeam: {
      players: 'Igor,Christian,Shane,Sab,Pedro,Joe,JM,John,Goce,Cosmin',
      goals: 'Joe,Christian,JM',
      assists: 'Pedro'
    },
    motm: ''
  });

  matches.add({
    date: '11-16-2019',
    whiteTeam: {
      players: 'Fernando,Shane,Johan,Kenneth,Nawid,Joe,Matt Bojo,Eric,Walt,Zoran,Akachi,Daniel',
      goals: 'Joe,Joe,Daniel,Joe,Daniel',
      assists: 'Shane,Daniel,Joe'
    },
    darkTeam: {
      players: 'Sundev,Christian,Jason,Hamid,Vlad,Pedro,Sab,John,Cosmin,Uffe,Anson,JM',
      goals: '',
      assists: ''
    },
    motm: 'Kenneth'
  });

  matches.add({
    date: '11-02-2019',
    whiteTeam: {
      players: 'Vishnu,Zoran,Shane,Johan,Quais,Mike,Goce,John,Nawid,Akachi,-',
      goals: 'Zoran,Goce',
      assists: ''
    },
    darkTeam: {
      players: 'Jason,Pedro,Christian,Vlad,Walt,Kenneth,Fernando,Uffe,Joe,Matt Bojo,Anson',
      goals: 'Vlad,Vlad,Christian,Vlad,Jason',
      assists: 'Walt,Walt,Fernando'
    },
    motm: 'Vlad'
  });

  matches.add({
    date: '10-26-2019',
    whiteTeam: {
      players: 'Pedro,Christian,JM,Fernando,Kenneth,Joe,Nawid,Matt Bojo, Matt Brunson,Ashan,Anson',
      goals: 'JM,Pedro',
    },
    darkTeam: {
      players: 'Uffe,Shane,Johan,Sab,Daniel,John,Mike,Matt Weaver,Goce,Zoran,Vishnu',
      goals: 'Daniel,Mike,Mike'
    },
    motm: ''
  });

  matches.add({
    date: '10-19-2019',
    whiteTeam: {
      players: 'Zoran,Christian,JM,Sab,Sundev,Joe,Kenneth,Matt Bojo,Nawid,Uffe,Akachi',
      goals: 'Joe'
    },
    darkTeam: {
      players: 'Jeff,Shane,Daniel,Jason,Fer,Mike,Cosmin,Pedro,John,Ashan,Anson',
      goals: 'Jason,Shane,Jeff'
    },
    motm: ''
  });

  matches.add({
    date: '10-12-2019',
    whiteTeam: {
      players: 'Cosmin,Sab,Goce,Kenneth,Dan,Eric,Joe,Anson,Zoran',
      goals: 'Sab,Kenneth,Sab,Joe'
    },
    darkTeam: {
      players: 'Nawid,Christian,Shane,JM,John,Mike,Sundev,Fernando,Akachi',
      goals: 'JM,Mike,Christian,JM,Fernando,Akachi,Nawid,JM'
    },
    motm: ''
  });

  matches.add({
    date: '10-05-2019',
    whiteTeam: {
      players: 'Goce,Shane,Johan,Vlad,Kenneth,Jason,Mike,Vishnu,John,Nawid,Uffe',
      goals: 'Jason,Mike',
      penalties: 'Zoran:Y,Joe:Y,Christian:Y,Fernando:Y'
    },
    darkTeam: {
      players: 'Joe,Zoran,Christian,JM,Sab,Fernando,Daniel,Ashan,Matt Bojo,Cosmin,Anson',
      goals: 'Daniel,JM',
      penalties: 'Johan:Y,Goce:Y,Vlad:N,Shane:Y'
    },
    motm: ''
  });

  matches.add({
    date: '09-28-2019',
    whiteTeam: {
      players: 'Matt Bojo,Zoran,Shane,Johan,John,Sab,Daniel,Joe,Goce,Ashan',
      goals: 'Joe,Sab,Daniel,Shane'
    },
    darkTeam: {
      players: 'Fernando,Igor,Christian,JM,Kenneth,Sundev,Nawid,Visnhu,Mike,Jeff',
      goals: ''
    },
    motm: ''
  });

  matches.add({
    date: '09-21-2019',
    whiteTeam: {
      players: 'Akachi,Zoran,Christian,Vlad,Matt Bojo,John,Jason,Anson,Goce,Daniel,Kenneth,Walt',
      goals: 'Vlad,Goce'
    },
    darkTeam: {
      players: 'Sab,Igor,JM,Johan,Shane,Fernando,Sundev,Mike,Joe,Nawid,Jack,Eric',
      goals: 'Fernando,JM,Joe'
    },
    motm: ''
  });

  matches.add({
    date: '09-14-2019',
    whiteTeam: {
      players: 'Daniel,Igor,Christian,Kenneth,Shane,Nawid,Jeff,Ashan,Joe',
      goals: 'Joe,Christian',
      penalties: 'Daniel:N,Kenneth:Y,Shane:Y,Nawid:Y,Christian:Y,Joe:Y,Jeff:Y'
    },
    darkTeam: {
      players: 'Anson,Zoka,JM,Jason,Sab,Mike,John,Matt Brunson,Akachi',
      goals: 'Jason,JM',
      penalties: 'Zoka:Y,Jason:Y,Akachi:Y,Sab:Y,JM:Y,Anson:N,Mike:N'
    },
    motm: ''
  });

  matches.add({
    date: '09-07-2019',
    whiteTeam: {
      players: 'Mike,Shane,Vlad,JM,Johan,Sab,Jeff,Zoran,Joe',
      goals: 'JM,Vlad,JM'
    },
    darkTeam: {
      players: 'Walt,Christian,Kenneth,Jason,Sundev,Uffe,Daniel,Akachi,Anson',
      goals: 'Jason'
    },
    motm: ''
  });

  matches.add({
    date: '08-31-2019',
    whiteTeam: {
      players: 'Matt Brunson,Zoran,Christian,Vlad,Eric,Sab,Sundev,Goce,John,Fernando',
      goals: 'Vlad,Vlad'
    },
    darkTeam: {
      players: 'Kenneth,Mike,JM,Johan,Daniel,Matt Weaver,Manbir,Matt Bojo,Joe,Akachi',
      goals: 'Joe'
    },
    motm: ''
  });

  matches.add({
    date: '08-24-2019',
    whiteTeam: {
      players: 'JM,Mike,Sab,Goce,Kenneth,Fernando,Ashan,Matt Bojo,John',
      goals: 'Goce'
    },
    darkTeam: {
      players: 'Sundev,Zoran,Christian,Shane,Vlad,Walt,Manbir,Matt Weaver,Eric',
      goals: 'Christian,Walt'
    },
    motm: ''
  });

  matches.add({
    date: '08-17-2019',
    whiteTeam: {
      players: 'Shane,Zoran,JM,Vlad,Eric,Kenneth,Sundev,Walt,Kyle',
      goals: 'Vlad,Fernando (OG),Vlad,Eric,Shane'
    },
    darkTeam: {
      players: 'Christian,Mike,Johan,Jeff,Sam,Fernando,Sab,Daniel,John',
      goals: 'Christian,Sam'
    },
    motm: ''
  });

  matches.add({
    date: '08-10-2019',
    whiteTeam: {
      players: 'Vlad,JM,Shane,Fernando,Johan,Jeff,Jason,Sab,John',
      goals: 'Vlad,JM,Vlad,JM'
    },
    darkTeam: {
      players: 'Vishnu,Christian,Daniel,Kenneth,Goce,Mike,Sam,Joe,David',
      goals: ''
    },
    motm: ''
  });

  matches.add({
    date: '08-03-2019',
    whiteTeam: {
      players: 'John,Zoran,Christian,Matt Weaver,JM,Johan,Jeff,Sundev,Nawid,Uffe',
      goals: 'JM,Christian,JM'
    },
    darkTeam: {
      players: 'Sam,Mike,Shane,Kenneth,Fernando,Daniel,Sab,Anson,Matt Brunson,Goce',
      goals: 'Daniel,Daniel'
    },
    motm: ''
  });

  matches.add({
    date: '07-27-2019',
    whiteTeam: {
      players: 'Eric,Zoran,Christian,Kenneth,Sab,Vlad,Goce,Sina,Vishnu,Joe',
      goals: 'Christian,Sina'
    },
    darkTeam: {
      players: 'Johan,Daniel,Fernando,Jason,Jeff,JM,John,Matt Bojo,Mike,Shane',
      goals: 'JM,Daniel,Sab (OG),JM,Daniel'
    },
    motm: ''
  });
}

async function uploadTeamPicker() {
  const teamPicker = db.collection('teamPicker');

  teamPicker.add({
    availablePlayers: 'Kenneth,Zoran,Shane,Igor,Goce,Sundev,Matt Bojo,Daniel',
    darkTeam: '',
    whiteTeam: ''
  });
}

async function uploadChats() {
  const chat = db.collection('chat');

  chat.add({
    user: 'system',
    message: 'White has picked Shane',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:11:22'))
  });

  chat.add({
    user: 'system',
    message: 'Dark has picked Christian',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:12:24'))
  });

  chat.add({
    user: 'white',
    message: 'Hey, I wanted to pick him lol',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:15:01'))
  });

  chat.add({
    user: 'dark',
    message: 'I\'ll trade him for Daniel',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:16:04'))
  });

  chat.add({
    user: 'white',
    message: 'No thanks',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:16:20'))
  });

  chat.add({
    user: 'system',
    message: 'White has picked Cosmin',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:16:30'))
  });

  chat.add({
    user: 'dark',
    message: 'Whoa, great pick!',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:21:46'))
  });

  chat.add({
    user: 'dark',
    message: 'Just you wait...',
    timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:21:51'))
  });

  chat.add({
    user: 'white',
    message: 'Hahahaha', timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:21:59'))
  });

  chat.add({
    user: 'system',
    message: 'Dark has picked Cosmin', timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:22:00'))
  });

  chat.add({
    user: 'white',
    message: 'Interesting...', timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:22:10'))
  });

  chat.add({
    user: 'dark',
    message: 'We\'re gonna win this week', timestamp: firebase.firestore.Timestamp.fromDate(new Date('2019-10-01T13:22:30'))
  });
}


uploadData()
  .then(() => {
    console.log('Writing data, exiting in 10 seconds ...\n\n');

    setTimeout(() => {

      console.log('\n\n\nData Upload Completed.\n\n\n');
      process.exit(0);

    }, 30000);

  })
  .catch(err => {
    console.log('Data upload failed, reason:', err, '\n\n\n');
    process.exit(-1);
  });


