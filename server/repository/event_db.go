package repository

import (
	_ "database/sql"
	"errors"
	"fmt"
	"github.com/jmoiron/sqlx"
)

type eventRepositoryDB struct {
	db *sqlx.DB
}

func NewEventRepositoryDB(db *sqlx.DB) eventRepositoryDB {
	return eventRepositoryDB{db: db}
}

func (r eventRepositoryDB) GetAll(start_event int, end_event int) ([]Event, error) {
	events := []Event{}
	query := "select id, title, start_event, end_event from events where start_event <= ? and end_event >= ?"
	err := r.db.Get(&events, query, start_event, end_event)
	if err != nil {
		return nil, err
	}

	return events, nil
}

func (r eventRepositoryDB) Create(event Event) (interface{}, error) {
	fmt.Println(event)

	// Check for overlapping events before inserting the new event
	overlapEventQuery := `select exists (
		select 1
		from events
		where 
				 (start_event < ? and end_event > ?)
			or (start_event > ? and end_event < ?)
			or (start_event = ? and end_event = ?)
			or (start_event < ? and end_event = ?)
			or (start_event > ? and end_event = ?)
			or (start_event = ? and end_event < ?)
			or (start_event = ? and end_event > ?)
			or ((start_event < ? and end_event > ?) and end_event < ?)
			or (start_event > ? and (start_event < ? and end_event > ?))
	)`

	var overlapCount int
	err := r.db.Get(
			&overlapCount,
			overlapEventQuery,
			event.StartEvent,
			event.EndEvent,
			event.StartEvent,
			event.EndEvent,
			event.StartEvent,
			event.EndEvent,
			event.StartEvent,
			event.EndEvent,
			event.StartEvent,
			event.EndEvent,
			event.StartEvent,
			event.EndEvent,
			event.StartEvent,
			event.EndEvent,
			event.StartEvent,
			event.StartEvent,
			event.EndEvent,
			event.StartEvent,
			event.EndEvent,
			event.EndEvent,
	)
	println("overlapcount", overlapCount)
	if err != nil {
			return nil, err
	}
	
	valid := overlapCount > 0
	println("valid", valid)
	if valid {
			return nil, errors.New("Event overlaps with existing events")
	}

	query := "INSERT INTO events (title, start_event, end_event) VALUES (?, ?, ?)"
	result, err := r.db.Exec(
			query,
			event.Title,
			event.StartEvent,
			event.EndEvent,
	)
	if err != nil {
			return nil, err
	}

	_, err = result.LastInsertId()
	if err != nil {
			return nil, err
	}

	return map[string]interface{}{
			"message": "successfully created",
	}, nil
}
