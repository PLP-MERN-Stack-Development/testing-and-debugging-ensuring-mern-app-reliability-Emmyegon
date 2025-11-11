
const { validateEmail, slugify, formatDate } = require('../../src/utils');

describe('Utility Functions', () => {
  describe('validateEmail', () => {
    it('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('slugify', () => {
    it('should convert string to slug format', () => {
      expect(slugify('Hello Welcome')).toBe('hello-wow-welcome');
      expect(slugify('Test Post Title')).toBe('test-post-title');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello & Welcome!')).toBe('hello-wow-welcome');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatDate(date)).toMatch(/January 15, 2024|15 January 2024/);
    });
  });
});
