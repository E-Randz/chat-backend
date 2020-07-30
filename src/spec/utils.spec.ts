import { assert } from 'chai';
import { generator } from '../database/utils/fakerGenerator';

describe('UTILS', () => {
  describe('fakerGenerator', () => {
    const userSchema = {
      email: '{{internet.email}}',
      first_name: '{{name.firstName}}',
      last_name: '{{name.lastName}}',
    };

    it('returns an array with 1 random object that matches schema when passed a schema and min val of 1', () => {
      const userData = generator(userSchema, 1);

      assert.typeOf(userData, 'array', 'user data is an array');
      assert.lengthOf(userData, 1, "user data's value has a length of 1");
      assert.hasAllKeys(
        userData[0],
        ['email', 'first_name', 'last_name'],
        "first user has all keys 'email', first_name, 'last_name'",
      );
    });

    it('returns an array with a random number of objects that match the schema between the min and max values provided', () => {
      const userData = generator(userSchema, 1, 3);

      assert.typeOf(userData, 'array', 'user data is an array');
      assert.isAtLeast(
        userData.length,
        1,
        "user data's value has a length of at least 1",
      );
      assert.isAtMost(
        userData.length,
        3,
        "user data's value has a length of at max 3",
      );
      assert.hasAllKeys(
        userData[0],
        ['email', 'first_name', 'last_name'],
        "first user has all keys 'email', first_name, 'last_name'",
      );
    });

    it('returns an array with 1 object that matches the schema if no min and max values provided', () => {
      const userData = generator(userSchema);

      assert.typeOf(userData, 'array', 'user data is an array');
      assert.isAtLeast(
        userData.length,
        1,
        "user data's value has a length of at least 1",
      );
      assert.hasAllKeys(
        userData[0],
        ['email', 'first_name', 'last_name'],
        "first user has all keys 'email', first_name, 'last_name'",
      );
    });
  });
});
