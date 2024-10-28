describe('Route Integration', () => {
  test('NST routes handle trial progression', async () => {
    const express = require('express');
    const request = require('supertest');
    const app = require('../src/app');    
    const response = await request(app)
      .get('/api/nst/next-digit')
      .expect(200);
      
    expect(response.body).toHaveProperty('digit');
    expect(response.body).toHaveProperty('trialState');
  });
});
