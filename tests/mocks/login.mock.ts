const validPassword = 'terrível';
const noUsernameLoginBody = { username: '', password: validPassword };

const validUsername = 'Hagar';
const noPasswordLoginBody = { username: validUsername, password: '' };

const notExistingUserBody = { username: 'Patrick_Fonseca', password: validPassword };
const existingUserWithWrongPasswordBody = { username: validUsername, password: 'wrong_password' };

const invalidUsername = 'Patrick_Fonseca'

const validHashPassword = '$2a$10$HlhpXyz6JdoFJmGGykaB6eVTlVYXo5Hur50EhvIbfGIN/0FwD2.1q';

const existingUser = { 
  id: 1,
  username: validUsername,
  vocation: 'Guerreiro',
  level: 10,
  password: validHashPassword, 
};
const validLoginBody = { username: validUsername, password: validPassword };

const nonExistingUser = { 
  id: 1,
  username: invalidUsername,
  vocation: 'Guerreiro',
  level: 10,
  password: validHashPassword,
};
const invalidLoginBody = { username: invalidUsername, password: "passwordfalse" };

export default {
  noUsernameLoginBody,
  noPasswordLoginBody,
  notExistingUserBody,
  existingUserWithWrongPasswordBody,
  existingUser,
  validLoginBody,
  nonExistingUser,
  invalidLoginBody,
};