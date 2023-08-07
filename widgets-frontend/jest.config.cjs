module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest', '[jt]sx?$': 'babel-jest'},
  testEnvironment: 'jsdom',
  testRegex: '.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: []
};
