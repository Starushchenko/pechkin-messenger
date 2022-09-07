import {HTTPTransport} from './http-transport';
import {expect} from 'chai';

describe('Тестируем HTTPtransport', function() {
  const http: HTTPTransport = new HTTPTransport();

  it('Тестируем метод get (получение пользователя по id)', () => {
    http.get(`https://ya-praktikum.tech/api/v2/user/122140`).then((response) =>
      expect(response).to.have.property('id').and.equal(122140)
    );
  });

  it('Тестируем метод post (поиск пользователя по логину)', () => {
    http.post(`https://ya-praktikum.tech/api/v2/user/search`, {
      headers: {'content-type': 'application/json'},
      data: {login: 'Yaroslav'}
    }).then((response) =>
      expect(response).to.have.property('id').and.equal(122140)
    );
  });

  it('Тестируем метод put (добавление пользователя в чат)', () => {
    http.put(`https://ya-praktikum.tech/api/v2/chats/users`, {
      headers: {'content-type': 'application/json'},
      data: {
        users: [120594],
        chatId: 1367
      }
    }).then((response) =>
      expect(response).to.be.equal('Ok')
    );
  });

  it('Тестируем метод put (удаление пользователя из чата)', () => {
    http.delete(`https://ya-praktikum.tech/api/v2/chats/users`, {
      headers: {'content-type': 'application/json'},
      data: {
        users: [120594],
        chatId: 1367
      }
    }).then((response) =>
      expect(response).to.be.equal('Ok')
    );
  });
});
