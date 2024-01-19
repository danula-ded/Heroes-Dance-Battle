/*          Описание игры            */

//объект настроек игры
const gameParameters = {
  MAX_LEVEL: 10, //максимальный уровень героя
  MAX_STAT: 99, //минимальный уровень параметра героя
  MIN_STAT: 10, //минимальный уровень параметка для умения
};

//объект классов игры
const gameClasses = {
  Mage: "Маг",
  Knight: "Рыцарь",
  Hero: "Класс",
};

//объявление героя оппонента
let enemyHero = null;

//объявления героя игрока
let playerHero = null;

//добавление героя игрока на экран
const sendToBattleButton = document.getElementById("sendToBattleButton");

//действие героя игрока
const doSkillButton = document.getElementById("doSkillButton");

//вывод героя оппонента на экран
const getEnemyButton = document.getElementById("getEnemyButton");

//начало битвы
const startBattleButton = document.getElementById("startBattleButton");

/*          Ход игры            */

//вывод героя игрока на экран
function displayPlayerHero(hero) {
  document.getElementById("playerHeroClass").innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById("playerHeroName").innerHTML = hero.name;
  document.getElementById("playerHeroLevel").innerHTML = hero.level;
  document.getElementById("playerHeroHp").innerHTML = hero.healthPoints;
  document.getElementById("playerHeroStrength").innerHTML = hero.stats.str;
  document.getElementById("playerHeroIntelligence").innerHTML = hero.stats.int;
  document.getElementById("playerHeroAgility").innerHTML = hero.stats.agi;

  hero.displayHero();
}

//вывод героя игрока на экран
function displayEnemyHero(hero) {
  document.getElementById("enemyHeroClass").innerHTML =
    gameClasses[hero.constructor.name];
  document.getElementById("enemyHeroName").innerHTML = hero.name;
  document.getElementById("enemyHeroLevel").innerHTML = hero.level;
  document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
  document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
  document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
  document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;

  hero.displayHero();
}

//получение информации героя игрока
sendToBattleButton.onclick = () => {
  const heroName = document.getElementById("name").value;
  if (heroName !== "") {
    const heroClass = document.querySelector(
      'input[name="class"]:checked'
    ).value;
    const heroLevel = document.getElementById("level").value;
    const heroStats = {};

    //если введённое значение параметра больше максимального, устанавливаем максимальное
    heroStats.str = Number(document.getElementById("strength").value);
    if (heroStats.str > gameParameters.MAX_STAT) {
      heroStats.str = gameParameters.MAX_STAT;
    }
    heroStats.int = Number(document.getElementById("intelligence").value);
    if (heroStats.int > gameParameters.MAX_STAT) {
      heroStats.int = gameParameters.MAX_STAT;
    }
    heroStats.agi = Number(document.getElementById("agility").value);
    if (heroStats.agi > gameParameters.MAX_STAT) {
      heroStats.agi = gameParameters.MAX_STAT;
    }

    const additionalAbility = document.querySelector(
      'input[name="additionalAbility"]:checked'
    ).value;
    const additionalStat = document.getElementById("additionalStat").value;

    if (heroClass === "Mage") {
      playerHero = new Mage(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalAbility,
        additionalStat
      );
    } else if (heroClass === "Knight") {
      playerHero = new Knight(
        heroName,
        heroLevel,
        100,
        heroStats,
        additionalAbility,
        additionalStat
      );
    } else {
      console.error("Упс! Произошла какая-то ошибка!");
      return;
    }

    displayPlayerHero(playerHero);

    getEnemyButton.removeAttribute("disabled");
    doSkillButton.removeAttribute("disabled");
  } else {
    alert("Добавьте герою имя!");
  }
};

getEnemyButton.onclick = () => {
  //получение героя оппонента с сервера
  fetch(`https://api-code.practicum-team.ru/heroes`)
    .then((response) => response.json())
    .then((data) => {
      let randomEnemy = data[Math.floor(Math.random() * data.length)]; //получение случайного героя оппонента
      console.log(randomEnemy); //вывод героя оппонента в консоль

      //создаём экземпляр класса героя оппонента
      enemyHero = new Hero(
        randomEnemy.title, //имя героя
        Math.floor(Math.random() * 10) + 1, //уровень героя
        randomEnemy.hp, //запас сил героя
        {
          str: randomEnemy.str,
          int: randomEnemy.int,
          agi: randomEnemy.agi,
        }
      ); //параметры героя

      //заполняем карточку героя оппонента
      displayEnemyHero(enemyHero);

      if (playerHero) {
        startBattleButton.removeAttribute("disabled");
      }
    })
    .catch((error) => console.error("Ошибка:", error));
};

/*           Определение победителя            */

//функция подсчета количества очков
function countStatsSum(hero) {
  let statsSum = 0;
  // Последовательно прибавляем в переменную statsSum значения характеристик из объекта hero
  statsSum += hero.stats.str;
  statsSum += hero.stats.int;
  statsSum += hero.stats.agi;
  statsSum += hero.healthPoints;

  return statsSum;
}

//функция сравнения и вывода победителя
function arena(firstHero, secondHero) {
  console.log(
    `Да начнётся танцевальный баттл между ${firstHero.name} и ${secondHero.name}!`
  );

  let winner = null;

  let fistHeroSum = countStatsSum(firstHero);
  let secondHeroSum = countStatsSum(secondHero);

  console.log("Сумма значений параметров первого героя: ", fistHeroSum);
  console.log("Сумма значений параметров второго героя: ", secondHeroSum);

  if (fistHeroSum > secondHeroSum) {
    winner = firstHero;
  } else if (fistHeroSum < secondHeroSum) {
    winner = secondHero;
  }

  if (winner) {
    console.log(`Ритмично чествуем победителя: ${winner.name}`);
    alert(`Ритмично чествуем победителя: ${winner.name}`); //алерт делает подсказку для браузера
  } else {
    console.log("В танцевальном баттле победила дружба!");
    alert("В танцевальном баттле победила дружба!");
  }
}

// присвоение собития кнопке
startBattleButton.onclick = () => {
  arena(playerHero, enemyHero);
};
