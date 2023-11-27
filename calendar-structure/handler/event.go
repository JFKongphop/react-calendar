package handler

import (
	"calendar-structure/repository"
	"calendar-structure/service"
	"github.com/gofiber/fiber/v2"
)

type eventHandler struct {
	evtSrv service.EventService
}

func NewEventHandler(evtSrv service.EventService) eventHandler {
	return eventHandler{evtSrv: evtSrv}
}

// curl -X GET "http://localhost:4000/calendar?start-event=5&end-event=20"
func (h eventHandler) GetEvents(c *fiber.Ctx) error {
	start_event := c.QueryInt("start-event")
	end_event := c.QueryInt("end-event")

	if start_event == 0 || end_event == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Invalid time event",
		})
	}

	events, err := h.evtSrv.GetEvents(start_event, end_event)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Server error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Fetched successfully",
		"events": events,
	})
}

func (h eventHandler) CreateEvent(c *fiber.Ctx) error {
	request := repository.Event{}
	err := c.BodyParser(&request)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Invalid body request",
		})
	}

	_, err = h.evtSrv.CreateEvent(request)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "server error",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Created successfully",
	})
}


