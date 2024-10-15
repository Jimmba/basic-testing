import { getBankAccount } from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1000;
    expect(getBankAccount(balance).getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1000;
    const amount = 1001;
    expect(() => getBankAccount(balance).withdraw(amount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 1000;
    const accountFrom = getBankAccount(balance);
    const accountTo = getBankAccount(balance);
    expect(() => accountFrom.transfer(balance + 1, accountTo)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 1000;
    const accountFrom = getBankAccount(balance);
    const accountTo = accountFrom;
    expect(() => accountFrom.transfer(balance, accountTo)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const balance = 1000;
    const amount = 100;
    const account = getBankAccount(balance);
    expect(account.deposit(amount).getBalance()).toBe(balance + amount);
  });

  test('should withdraw money', () => {
    const balance = 1000;
    const amount = 100;
    const account = getBankAccount(balance);
    expect(account.withdraw(amount).getBalance()).toBe(balance - amount);
  });

  test('should transfer money', () => {
    const accountFromBalance = 1000;
    const accountToBalance = 500;
    const amount = 100;
    const accountFrom = getBankAccount(accountFromBalance);
    const accountTo = getBankAccount(accountToBalance);
    accountFrom.transfer(amount, accountTo);

    expect(accountFrom.getBalance()).toBe(accountFromBalance - amount);
    expect(accountTo.getBalance()).toBe(accountToBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    const newBalanceValue = 10;
    const requestIsNotFailedValue = 1;

    (jest.requireMock('lodash').random as jest.Mock)
      .mockReturnValueOnce(newBalanceValue)
      .mockReturnValueOnce(requestIsNotFailedValue);
    const result = await account.fetchBalance();
    expect(typeof result).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    const newBalanceValue = 10;
    const requestIsNotFailedValue = 1;

    (jest.requireMock('lodash').random as jest.Mock)
      .mockReturnValueOnce(newBalanceValue)
      .mockReturnValueOnce(requestIsNotFailedValue);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(newBalanceValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    const newBalanceValue = 10;
    const requestIsFailedValue = 0;
    (jest.requireMock('lodash').random as jest.Mock)
      .mockReturnValueOnce(newBalanceValue)
      .mockReturnValueOnce(requestIsFailedValue);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
