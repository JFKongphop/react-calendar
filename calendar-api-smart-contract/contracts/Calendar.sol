// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Calendar {
  struct EventSchedule {
    uint256 day;
    uint256 id;
    string title;
    uint256 startTimestamp;
    uint256 endTimestamp;
  }

  mapping(string => EventSchedule[]) public monthEvents;
  mapping(string => EventSchedule[]) public dayEvents;

  event AddEvent(
    address indexed user,
    uint256 day,
    uint256 id,
    string title,
    uint256 startTimestamp,
    uint256 endTimestamp
  );

  function addEvent(
    uint256 day,
    uint256 id,
    string memory title,
    uint256 startTimestamp,
    uint256 endTimestamp,
    string memory monthRangeKey,
    string memory dayRangeKey
  ) public {
    EventSchedule memory newEvent = EventSchedule(
      day, 
      id,
      title, 
      startTimestamp, 
      endTimestamp
    );
    monthEvents[monthRangeKey].push(newEvent);
    dayEvents[dayRangeKey].push(newEvent);

    emit AddEvent(msg.sender, day, id, title, startTimestamp, endTimestamp);
  }

  function getMonthEvent(string memory monthTimestamp) public view returns (EventSchedule[] memory) {
    return monthEvents[monthTimestamp];
  }

  function getDayEvent(string memory dayTimestamp) public view returns(EventSchedule[] memory) {
    return dayEvents[dayTimestamp];
  }
}