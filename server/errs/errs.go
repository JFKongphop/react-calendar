package errs

import "github.com/gofiber/fiber/v2"

type AppError struct {
	Code int
	Message string
}

func (e AppError) Error() string {
	return e.Message
}

func NewUnExpectError() error {
	return AppError{
		Code: fiber.StatusInternalServerError,
		Message: "unexpect error",
	}
}