package handler

import (
	"server/service"

	"github.com/gofiber/fiber/v2"
)


type eventHandler struct {
	evtSrc service.EventService
}

func NewServiceHanlder(evtSrc service.EventService) eventHandler {
	return eventHandler{evtSrc: evtSrc}
}

func (h eventHandler) GetEvents(c *fiber.Ctx) error {
	start_event := c.QueryInt("start-event")
	end_event := c.QueryInt("end-event")

	if start_event == 0 || end_event == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Invalid time event",
		})
	}

	events, err := h.evtSrc.GetEvents(start_event, end_event)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Server error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Fetch successfully",
		"events": events,
	})
}