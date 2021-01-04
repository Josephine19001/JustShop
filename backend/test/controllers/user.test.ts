import request from 'supertest'

import { UserDocument } from '../../src/models/User'
import * as dbhelper from '../db-helper'
import app from '../../src/app'
import { authenticate, googleToken } from '../../src/config/config'

const nonExistingUserId = '5e57b77b5744fa0b461'

async function signUp(override?: Partial<UserDocument>) {
  let user = {
    email: 'gyameraj@gmail.com',
    password: 'qwerty1234',
    role: 'ADMIN',
    firstName: 'Test',
    lastName: 'Testie',
  }
  if (override) {
    user = { ...user, ...override }
  }

  return await request(app).post('/api/v1/users').send(user)
}

describe('product controller', () => {
  let token: string

  //connect in memory before test
  beforeEach(async () => {
    await dbhelper.connect()
  })

  //clear database after each test
  afterEach(async () => {
    await dbhelper.clearDatabase()
  })

  //close connection after all test
  afterAll(async () => {
    await dbhelper.closeDatabase()
  })

  //create user test
  it('should create a user', async () => {
    const res = await signUp()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('data._id')
    expect(res.body.data.email).toBe('gyameraj@gmail.com')
  })

  //login user test
  it('should login a  registered user', async () => {
    const res = await signUp()
    expect(res.status).toBe(200)

    const logCredentials = {
      email: authenticate.email,
      password: authenticate.password,
    }

    const res1 = await request(app)
      .post('/api/v1/users/signin')
      .send(logCredentials)

    expect(res1.status).toBe(200)
  })

  // // sign in with wrong user credentials test
  it('should not sign in a  registered user', async () => {
    const res = await signUp()
    expect(res.status).toBe(200)

    const logCredentials = {
      userName: authenticate.email,
      password: 'fakepassword',
    }

    const res1 = await request(app)
      .post('/api/v1/users/signin')
      .send(logCredentials)
    console.log('fake:', res1.body)
    expect(res1.status).toBe(404)
  })

  //google login test success
  // it('should sign in user with correct google credentials', async () => {
  //   const res1 = await request(app)
  //     .post('/api/v1/users/google-signin')
  //     .set('Authorization', `Bearer ${googleToken.token}`)

  //   expect(res1.status).toBe(200)
  // })

  //update user test
  it('should update an existing user', async () => {
    const res1 = await signUp()
    expect(res1.status).toBe(200)

    const logCredentials = {
      email: authenticate.email,
      password: authenticate.password,
    }
    const res2 = await request(app)
      .post('/api/v1/users/signin')
      .send(logCredentials)
    expect(res2.status).toBe(200)

    const update = {
      firstName: 'Ama',
      email: 'gyameraj@gmail.com',
    }
    const res3 = await request(app)
      .put('/api/v1/users/update')
      .set('Authorization', `Bearer ${res2.body.token}`)
      .send(update)

    expect(res3.status).toEqual(200)
  })

  //update user without email test
  it('should not update an existing user with wrong credentials', async () => {
    const res1 = await signUp()
    expect(res1.status).toBe(200)

    const logCredentials = {
      email: authenticate.email,
      password: authenticate.password,
    }
    const res2 = await request(app)
      .post('/api/v1/users/signin')
      .send(logCredentials)
    expect(res2.status).toBe(200)

    const update = {
      firstName: 'Josephine',
      email: 'wrong@email.com',
    }
    const res3 = await request(app)
      .put('/api/v1/users/update')
      .set('Authorization', `Bearer ${res2.body.token}`)
      .send(update)

    expect(res3.status).toEqual(401)
  })

  //delete user by id
  it('should delete user by id', async () => {
    const res1 = await signUp()
    expect(res1.status).toBe(200)

    const logCredentials = {
      email: authenticate.email,
      password: authenticate.password,
    }
    let res2 = await request(app)
      .post('/api/v1/users/signin')
      .send(logCredentials)
    expect(res2.status).toBe(200)

    const userId = res1.body._id
    res2 = await request(app)
      .delete(`/api/v1/users/${userId}`)
      .set('Authorization', `Bearer ${res2.body.token}`)

    expect(res1.status).toEqual(200)

    res2 = await request(app).get(`/api/v1/users/${userId}`)
    expect(res1.status).toBe(404)
  })
})
