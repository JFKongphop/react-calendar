import { Signer, Contract } from 'ethers';
import { expect } from "chai";
import { ethers } from "hardhat";

describe('Calendar', async () => {
  let user1: Signer
  let calendarContract: Contract;

  beforeEach(async () => {
    [user1] = await ethers.getSigners();

    const CalendarContract = await ethers.getContractFactory("Calendar");
    calendarContract = await CalendarContract.deploy();

    await calendarContract.deployed();
  });

  describe('Add event to calendar', () => {
    it('Should return mapping have struct by same month.', async () => {
      await calendarContract.connect(user1).addEvent(
        1699894800000, 
        1700120651401, 
        'test1', 
        1699898400000, 
        1699902000000, 
        '1698771600000-1701363599999', 
        '1699894800000-1699981199999'
      );
      await calendarContract.connect(user1).addEvent(
        1699894800000,
        1700120695592,
        'test2',
        1699909200000,
        1699916400000,
        '1698771600000-1701363599999',
        '1699894800000-1699981199999'
      );
      
      const result = await calendarContract.getMonthEvent(
        '1698771600000-1701363599999'
      );

      const mappedResult = result.map((event: any) => ({
        day: event[0].toNumber(),
        id: event[1].toNumber(),
        title: event[2],
        startTimestamp: event[3].toNumber(),
        endTimestamp: event[4].toNumber(),
      }));

      expect(mappedResult).to.deep.equal([
        {
          day: 1699894800000,
          id: 1700120651401,
          title: 'test1',
          startTimestamp: 1699898400000,
          endTimestamp: 1699902000000
        },
        {
          day: 1699894800000,
          id: 1700120695592,
          title: 'test2',
          startTimestamp: 1699909200000,
          endTimestamp: 1699916400000
        }
      ]);
    });

    it('Should return mapping have struct by same day.', async () => {
      await calendarContract.connect(user1).addEvent(
        1699894800000, 
        1700120651401, 
        'test1', 
        1699898400000, 
        1699902000000, 
        '1698771600000-1701363599999', 
        '1699894800000-1699981199999'
      );
      await calendarContract.connect(user1).addEvent(
        1699894800000,
        1700120695592,
        'test2',
        1699909200000,
        1699916400000,
        '1698771600000-1701363599999',
        '1699894800000-1699981199999'
      );

      const result = await calendarContract.getDayEvent(
        '1699894800000-1699981199999'
      );

      const mappedResult = result.map((event: any) => ({
        day: event[0].toNumber(),
        id: event[1].toNumber(),
        title: event[2],
        startTimestamp: event[3].toNumber(),
        endTimestamp: event[4].toNumber(),
      }));

      expect(mappedResult).to.deep.equal([
        {
          day: 1699894800000,
          id: 1700120651401,
          title: 'test1',
          startTimestamp: 1699898400000,
          endTimestamp: 1699902000000
        },
        {
          day: 1699894800000,
          id: 1700120695592,
          title: 'test2',
          startTimestamp: 1699909200000,
          endTimestamp: 1699916400000
        }
      ]);
    });

    it('Should return only one month not same.', async () => {
      await calendarContract.connect(user1).addEvent(
        1700586000000, 
        1700122108579, 
        'test4', 
        1700586000000, 
        1700593200000, 
        '1698771600000-1701363599999', 
        '1700586000000-1700672399999'
      );

      const result = await calendarContract.getMonthEvent(
        '1698771600000-1701363599999'
      );
    })
  });
})