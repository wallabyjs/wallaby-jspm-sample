import { Person } from '../src/Person';
import _ from 'lodash-node';

describe('Person', function () {
  it('should report name', function () {
    const person = new Person('John');
    expect(_.keys(person).length).toBe(1);
    expect(person.name).toBe('John');
  });
});