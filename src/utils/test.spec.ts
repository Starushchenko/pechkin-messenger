import { describe } from 'mocha';
import { expect } from 'chai';

const lalala = function (string: string): string {
  return string + string;
}

describe('should concat title', () => {
  it('should concat title', () => {
    expect(lalala('New Title')).to.equal('New ');
  });
});
