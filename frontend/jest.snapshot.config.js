module.exports = {
  snapshotSerializers: [
    'jest-snapshot-serializer-raw',
    'jest-serializer-html'
  ],
  snapshotFormat: {
    printBasicPrototype: false,
    escapeString: true,
    printFunctionName: true,
    minified: false,
    indent: 2
  },
  snapshotResolver: {
    testPathForConsistencyCheck: 'src/components/ExperimentRunner.test.js',
    resolveSnapshotPath: (testPath, snapshotExtension) =>
      testPath.replace('__tests__', '__snapshots__') + snapshotExtension,
    resolveTestPath: (snapshotPath, snapshotExtension) =>
      snapshotPath
        .replace('__snapshots__', '__tests__')
        .slice(0, -snapshotExtension.length)
  }
};
