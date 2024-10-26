module.exports = {
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    [
      'jest-watch-select-projects',
      {
        key: 'p',
        prompt: 'select a project'
      }
    ],
    [
      'jest-watch-suspend',
      {
        key: 's',
        prompt: 'suspend watch mode'
      }
    ]
  ],
  watchPathIgnorePatterns: [
    'node_modules',
    'coverage',
    'dist'
  ]
};
