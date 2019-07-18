import faker from 'faker';

const correctUser = {
  last_name: 'Done',
  first_name: 'James',
  email: faker.internet.email(),
  password: 'jamesdoe@123',
};

const undefinedFirstName = {
  last_name: 'Done',
  email: 'jamedoe@gmail.com',
  password: 'jamesdoe6@123',
};

const emptyFirstName = {
  first_name: '',
  last_name: 'Done',
  email: 'jamsdoe@gmail.com',
  password: 'jamesdoe@123',
};

const invalidFirstNameLength = {
  first_name: 'J',
  last_name: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe@123',
};

const invalidFirstNameCharacter = {
  first_name: 'Joh$n',
  last_name: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe@123',
};

const undefinedLastName = {
  first_name: 'James',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe@123',
};

const emptyLastName = {
  first_name: 'James',
  lastName: '',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe@123',
};

const invalidLastNameLength = {
  first_name: 'James',
  last_name: '',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe@123',
};

const invalidLastNameCharacter = {
  first_name: 'James',
  last_name: 'Do$e',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe@123',
};

const undefinedEmail = {
  first_name: 'James',
  last_name: 'Done',
  password: 'jamesdoe@123',
};

const emptyEmail = {
  first_name: 'James',
  last_name: 'Done',
  email: '',
  password: 'jamesdoe@123',
};

const undefinedAddress = {
  email: faker.internet.email(),
  first_name: 'James',
  last_name: 'Done',
  password: 'jamesdoe@123',
};

const InvalidAddressCharacter = {
  email: faker.internet.email(),
  first_name: 'Emeka',
  last_name: 'Ofe',
  password: 'maths102',
  address: '75 Bode Thomas, Surulere*&',
};

const invalidEmailLength = {
  first_name: 'James',
  last_name: 'Done',
  email: 'd@g.com',
  password: 'jamesdoe@123',
};

const invalidEmailCharacter = {
  first_name: 'James',
  last_name: 'Done',
  email: 'j%%##@gmail.#om',
  password: 'jamesdoe@123',
};

const existingEmail = {
  first_name: 'James',
  last_name: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe@123',
};

const undefinedPassword = {
  first_name: 'James',
  last_name: 'Done',
  email: 'jonahjang@gmail.com',
};


const invalidPasswordLength = {
  first_name: 'James',
  last_name: 'Done',
  email: 'jonahjoe@gmail.com',
  password: 'j',
};

const whitespacePassword = {
  first_name: 'James',
  last_name: 'Done',
  email: 'hallyjoe@gmail.com',
  password: ' ',
};

const correctLogin = {
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
};

const undefinedEmailLogin = {
  password: 'johndoe',
};


const nonExistingEmail = {
  email: 'JJamesdoe@gmail.com',
  password: 'jamesdoe',
};

const undefinedPasswordLogin = {
  email: 'johndoe@gmail.com',
};

const emptyPasswordField = {
  email: 'jamesdoe@gmail.com',
  password: '',
};

const emptyEmailField = {
  email: '',
  password: 'jamesdoe@123',
};

const correctEmailIncorrectPassword = {
  email: 'jamesdoe@gmail.com',
  password: 'Jamesdroeh',
};

export {
  correctUser, undefinedFirstName, undefinedAddress, InvalidAddressCharacter,
  invalidFirstNameLength, invalidFirstNameCharacter, emptyEmail,
  emptyFirstName, emptyLastName, undefinedLastName, invalidLastNameLength,
  invalidLastNameCharacter, undefinedEmail, invalidEmailLength, invalidEmailCharacter,
  existingEmail, undefinedPassword, invalidPasswordLength, whitespacePassword, correctLogin,
  undefinedEmailLogin, nonExistingEmail, undefinedPasswordLogin, emptyPasswordField,
  emptyEmailField, correctEmailIncorrectPassword,
};
