import User from '../../src/models/User'
import UserService from '../../src/services/user'
import * as dbhelper from '../db-helper'
import constant from '../../src/constant/contant'
import jwt from 'jsonwebtoken'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'
const nonExistingUserEmail = 'gyamjosie@email.com'

async function createUser() {
  const user = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    userName: 'John19001',
    password: 'qwerty123',
    isBanned: 'false',
    role: constant.ROLE_USER,
  })
  return await UserService.createUser(user)
}

describe('user services', () => {
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
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('firstName', 'John')
  })

  //sign in user test
  it('should sign user in', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    const credentials = {
      email: 'johndoe@email.com',
      password: 'qwerty123',
    }
    const token = await UserService.signInUser(
      credentials.email,
      credentials.password
    )
    const decodedToken = jwt.decode(token)
    expect(decodedToken).toHaveProperty('email', 'johndoe@email.com')
  })

  //sign in user with wrong credentials test
  it('should not sign user in if credentials are wrong', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    const credentials = {
      email: nonExistingUserEmail,
      password: 'qwerty123',
    }
    try {
      await UserService.signInUser(credentials.email, credentials.password)
    } catch (error) {
      expect(error.message).toMatch('User does not exist, check email')
    }
  })

  //google sign in user test
  it('should sign user in with google', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    const credentials = {
      email: 'johndoe@email.com',
    }
    const token = await UserService.googlesignInUser(credentials.email)
    const decodedToken = jwt.decode(token)
    expect(decodedToken).toHaveProperty('email', 'johndoe@email.com')
  })

  //google sign in user with wrong credentials test
  it('should not sign user in if credentials are wrong', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    const credentials = {
      email: nonExistingUserEmail,
    }
    try {
      await UserService.googlesignInUser(credentials.email)
    } catch (error) {
      expect(error.message).toMatch('Incorrect Email')
    }
  })

  //find user by id test success
  it('should get a user with id', async () => {
    const user = await createUser()
    const found = await UserService.findUserById(user._id)
    if (!found) {
      expect(found).toThrowError(`User ${user._id} not found`)
    }
    expect(found).toEqual(
      expect.objectContaining({
        __v: user.__v,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
        role: user.role,
        isBanned: user.isBanned,
      })
    )
  })

  //find user by id test failure
  it('should get a user with non-exisiting user id', async () => {
    expect.assertions(1)
    try {
      return await UserService.findUserById(nonExistingUserId)
    } catch (error) {
      expect(error.message).toMatch(`User ${nonExistingUserId} not found`)
    }
  })

  //find or create user
  it('should find or create user', async () => {
    const user = await createUser()
    expect(user).toHaveProperty('_id')
    const credentials = {
      email: 'johndoe@email.com',
    }
    try {
      await UserService.findOrCreateUser(credentials.email)
    } catch (error) {
      expect(error.message).toMatch('Cannot create user')
    }
  })

  //find user by email test success
  it('should get a user with email', async () => {
    const user = await createUser()
    const found = await UserService.findUserByEmail(user.email)
    expect(found).toEqual(
      expect.objectContaining({
        __v: user.__v,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userName: user.userName,
        role: user.role,
        isBanned: user.isBanned,
      })
    )
  })

  //find user by email test failure
  it('should get a user with non-exisiting user email', async () => {
    expect.assertions(1)
    try {
      return await UserService.findUserByEmail(nonExistingUserEmail)
    } catch (error) {
      expect(error.message).toMatch(`User ${nonExistingUserEmail} not found`)
    }
  })

  //find all users
  it('should get a all list of users', async () => {
    const user = await createUser()
    const foundList = await UserService.findAllUsers()
    expect(foundList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          __v: user.__v,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
          role: user.role,
          isBanned: user.isBanned,
        }),
      ])
    )
  })

  //delete user by id
  it('should delete an existing user', async () => {
    expect.assertions(1)
    const user = await createUser()
    await UserService.deleteUser(user._id)
    try {
      return await UserService.findUserById(nonExistingUserId)
    } catch (error) {
      expect(error.message).toMatch(`User ${nonExistingUserId} not found`)
    }
  })

  //find or create
  it('should get an existing user or create a new one', async () => {
    const user = await createUser()
    try {
      await UserService.findUserByEmail(user.email)
      // return await UserService.findOrCreate(user)
    } catch (error) {
      try {
        await UserService.findOrCreateUser(user)
      } catch (error) {
        expect(error.message).toMatch('Cannot create user')
      }
    }
  })
})
