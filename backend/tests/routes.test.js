const express = require('express');
const request = require('supertest');
const app = require('../src/app');

describe('Route Integration', () => {
  test('NST routes handle trial progression', async () => {
    const response = await request(app)
      .get('/api/nst/next-digit')
      .expect(200);
      
    expect(response.body).toHaveProperty('digit');
  });
});