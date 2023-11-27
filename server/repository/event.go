package repository

type Event struct {
	Id         int    `db:"id" json:"id"`
	Title      string `db:"title" json:"title"`
	StartEvent int    `db:"start_event" json:"start_event"`
	EndEvent   int    `db:"end_event" json:"end_event"`
}

type EventRepository interface {
	GetAll(int, int) ([]Event, error)
	Create(Event) (interface{}, error)
}