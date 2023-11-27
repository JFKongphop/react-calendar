package service

type NewEventRequest interface{}
type EventResponse struct {
	Id         int    `db:"id" json:"id"`
	Title      string `db:"title" json:"title"`
	StartEvent int    `db:"start_event" json:"start_event"`
	EndEvent   int    `db:"end_event" json:"end_event"`
}

type EventService interface {
	GetEvents(int, int) ([]EventResponse, error)
	CreateEvent(EventResponse) (interface{}, error)
}