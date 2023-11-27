package service

import (
	"calendar-structure/errs"
	"calendar-structure/logs"
	"calendar-structure/repository"
)

type eventService struct {
	evtRepo repository.EventRepository
}

func NewEventService(evtRepo repository.EventRepository) EventService {
	return eventService{evtRepo: evtRepo}
}

func (s eventService) GetEvents(start_event int, end_event int) ([]repository.Event, error) {
	events, err := s.evtRepo.GetAll(start_event, end_event)
	if err != nil {
		logs.Error(err)
		return nil, errs.NewUnexpectedError()
	}

	return events, nil
}

func (s eventService) CreateEvent(newEvent repository.Event) (interface{}, error) {
	response, err := s.evtRepo.Create(newEvent)
	if err != nil {
		logs.Error(err)
		return nil, errs.NewUnexpectedError()
	}

	return response, nil
}
