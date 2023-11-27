package service

import (
	"server/errs"
	"server/logs"
	"server/repository"
) 


type eventService struct {
	eventRepo repository.EventRepository
}

func NewEventService(eventRepo repository.EventRepository) eventService {
	return eventService{eventRepo: eventRepo}
}

func (s eventService) GetEvents(start_event int, end_event int) ([]repository.Event, error) {
	events, err := s.eventRepo.GetAll(start_event, end_event)
	if err != nil {
		logs.Error(err)
		return nil, errs.NewUnExpectError()
	}

	return events, nil
}

func (s eventService) CreateEvent(event repository.Event) (interface{}, error) {
	response, err := s.eventRepo.Create(event)
	if err != nil {
		logs.Error(err)
		return nil, errs.NewUnExpectError()
	}

	return response, nil
}