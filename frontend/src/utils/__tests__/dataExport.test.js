import { exportToCSV, createDataBlob, generateReport } from '../dataExport';

describe('Data Export Utils', () => {
  test('exports data to CSV format', () => {
    const data = [
      { trial: 1, response: 'odd', rt: 500 },
      { trial: 2, response: 'even', rt: 450 }
    ];
    
    const csv = exportToCSV(data);
    expect(csv).toContain('trial,response,rt');
    expect(csv.split('\n')).toHaveLength(3);
  });

  test('creates downloadable data blobs', () => {
    const data = 'test,data\n1,2';
    const blob = createDataBlob(data, 'text/csv');
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/csv');
  });

  test('generates complete experiment reports', () => {
    const sessionData = {
      id: 'test-123',
      trials: [1, 2, 3],
      responses: ['odd', 'even', 'odd']
    };
    
    const report = generateReport(sessionData);
    expect(report.summary).toBeDefined();
    expect(report.data).toBeDefined();
    expect(report.analytics).toBeDefined();
  });
});
