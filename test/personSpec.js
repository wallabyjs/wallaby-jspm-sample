import person from '../src/Person';
import _ from 'lodash-node';

describe('Person', function () {
  it('should report name', function () {
    expect(_.keys(person).length).toBe(1);
    expect(person.name).toBe('John');
  });
});