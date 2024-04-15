// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// Создаем второй роутер
// Подключаем модуль со вторым роутером

// ================================================================
class User {
  static #list = []

  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => this.password === password

  static add = (user) => {
    this.#list.push(user)
  }
  static getList = () => {
    return this.#list
  }
  static getById = (id) =>
    this.#list.find((user) => user.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (user) => user.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, { email }) => {
    const user = this.getById(id)
    if (user) {
      this.update(user, data)
      return true
    } else {
      return false
    }
  }
  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}
const productList = [] // массив для хранения товаров

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = User.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/user-create', function (req, res) {
  const { email, login, password } = req.body

  const user = new User(email, login, password)
  User.add(user)
  console.log(User.getList())

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач створений',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/user-delete', function (req, res) {
  const { id } = req.query
  User.deleteById(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'Користувач видалений',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/user-update', function (req, res) {
  const { email, password, id } = req.body

  const user = User.getById(Number(id))

  let result = false
  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  console.log(email, password, id)

  res.render('success-info', {
    style: 'success-info',
    info: result
      ? ' Емайл пошта оновлена'
      : 'Сталася помилка',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
// ↙️↙️↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-create', function (req, res) {
  // ↑↑ сюди вводимо JSON дані
  const { name, price, description } = req.body

  if (!name || !price || !description) {
    // Отправка сообщения об ошибке в контейнер/алерт
    res.render('alert', {
      style: 'alert',
      info: 'Пожалуйста, заполните все поля товара.',
    })
  } else {
    let id = ''
    for (let i = 0; i < 5; i++) {
      id += Math.floor(Math.random() * 10)
    }
    //const createDate = new Date()
    //createDate.setHours(createDate.getHours() + 3)
    //const isoDateString = createDate.toISOString()
    const newProduct = {
      name,
      price,
      description,
      id,
      //createDate,
    }
    productList.push(newProduct)
    console.log(productList)
    // Отправляем ответ клиенту с сообщением об успешном  создании товара
    res.render('alert', {
      style: 'alert',
      info: 'Товар успешно создан и сохранен.',
    })
  }
  //newProduct = []
  //console.log(newProduct)
})

// ================================================================
// ↙️↙️↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  //res.render('product-list') потом вернуть код из name123
  res.render('list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'list',
    productList: productList, // подключаю массив с товарами
  })
})
// ================================================================
// ↙️↙️↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-update', function (req, res) {
  // ↑↑ сюди вводимо JSON дані
})
// Підключаємо роутер до бек-енду
module.exports = router
//
