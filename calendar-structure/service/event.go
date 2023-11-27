package service

import "calendar-structure/repository"

type EventService interface {
	GetEvents(int, int) ([]repository.Event, error)
	CreateEvent(repository.Event) (interface{}, error) 
}