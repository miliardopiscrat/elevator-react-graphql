module.exports = {
  name: 'elevators-web',
  preset: '../../jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../coverage/apps/elevators-web',
  setupFilesAfterEnv : ['./jest.setup.ts']
};
