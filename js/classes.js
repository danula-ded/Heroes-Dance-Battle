// Базовый класс героя
class Hero {
  // Конструктор базового класса
  constructor(name, level, healthPoints, stats) {
    this.name = name; // Имя
    this.level = level; // Уровень
    this.healthPoints = healthPoints; // Жизненные силы
    this.stats = stats; // Параметры
  }

  // Метод, отвечающий за вывод информации о герое в консоль
  displayHero() {
    const heroInfo =
      `Имя: ${this.name}` +
      `\nУровень: ${this.level}` +
      `\nЖизненные силы: ${this.healthPoints}` +
      `\nСила: ${this.stats.str}` +
      `\nИнтеллект: ${this.stats.int}` +
      `\nЛовкость: ${this.stats.agi}`;

    console.log(heroInfo);
  }
}

// Дочерний класс героя-мага
class Mage extends Hero {
  // Конструктор дочернего класса
  constructor(name, level, healthPoints, stats, hasTectonicPotion, mana) {
    super(name, level, healthPoints, stats);
    this.hasTectonicPotion = hasTectonicPotion; // Зелье для тектоника
    this.mana = mana; // Мана мага
  }

  // Метод, расширяющий метод базового класса
  displayHero() {
    super.displayHero();

    console.log(`Мана: ${this.mana}`);

    if (this.hasTectonicPotion === "true") {
      console.log("Есть зелье для тектоника");
    }
  }
  // Метод лечения героя у класса Mage
  healHero(hero) {
    if (this.mana > gameParameters.MIN_STAT) {
      // Значение лечения рассчитывается относительно уровня
      const healAmount = this.level * 10;

      hero.healthPoints += healAmount;
      console.log(this.name + " продлевает танец " + hero.name + " на " + healAmount + " единиц.");
    
        // Трата маны пропорционально уровню героя
      this.mana -= healAmount * (10 / this.level) - this.level;
    } else {
    alert("Недостаточно маны...");
  }
  }
}

// Дочерний класс героя-рыцаря
class Knight extends Hero {
  // Конструктор дочернего класса
  constructor(name, level, healthPoints, stats, isHorseTango, energy) {
    super(name, level, healthPoints, stats);
    this.isHorseTango = isHorseTango; // Может танцевать танго на коне

    // Показатель усталостии героя,
    // где 1 - герой не устал, gameParameters.MAX_STAT - герой устал и не может делиться защитой
    this.energy = energy;
  }
  
  // Метод, расширяющий метод базового класса
  displayHero() {
    super.displayHero();

    console.log(`Энергия: ${this.energy}`);

    if (this.isHorseTango === "true") {
      console.log("Этот герой может танцевать танго на коне");
    }
  }
    // Метод увеличения ловкости героя у класса Knight
  gainAgility(hero) {
    if (this.energy > gameParameters.MIN_STAT) {
      // Количество увеличения ловкости
    const gainAmount = (this.level * this.energy) / 30;

    // Если при увеличении значение ловкости не превысит максимальное,
    // увеличиваем ловкость,
    // иначе устанавливаем максимальное значение

    if (hero.stats.agi + gainAmount < gameParameters.MAX_STAT) {
        hero.stats.agi += gainAmount;
      console.log(this.name + " увеличивает ловкость " + hero.name + " на " + gainAmount + " единиц.");
    } else {
      hero.stats.agi = gameParameters.MAX_STAT;
    }

    // Уменьшение энергии пропорционально уровню героя
    const energyAmount = (gainAmount * 10) / this.level;
    if (this.energy - energyAmount > gameParameters.MIN_STAT) {
        this.energy -= energyAmount;
    } else {
      this.energy = gameParameters.MIN_STAT;
    }

    displayPlayerHero(playerHero);
  } else {
    alert("Недостаточно энергии...");
  }
  } 

}
