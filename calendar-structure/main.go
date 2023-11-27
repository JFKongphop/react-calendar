package main

import (
	"calendar-structure/handler"
	"calendar-structure/repository"
	"calendar-structure/service"
	_ "database/sql"
	"fmt"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/jmoiron/sqlx"
	"github.com/spf13/viper"
)

func main() {
	initConfig()
	db := initDatabase()
	eventRepositoryDB := repository.NewEventRepositoryDB(db)
	eventService := service.NewEventService(eventRepositoryDB)
	eventHandler := handler.NewEventHandler(eventService)

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: viper.GetString("api.end_point"),
		AllowMethods: strings.Join([]string{
			fiber.MethodGet,
			fiber.MethodPost,
		}, ","),
	}))
	app.Use(logger.New())
	
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"message": "api is running",
		})
	})
	app.Get("/calendar", eventHandler.GetEvents)
	app.Post("/calendar", eventHandler.CreateEvent)

	port := fmt.Sprintf(":%v", viper.GetInt("app.port"))
	app.Listen(port)
}

func initConfig() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")

	err := viper.ReadInConfig()
	if err != nil {
		panic(err)
	}
}

func initDatabase() *sqlx.DB {
	dataSourceName := fmt.Sprintf(
		"%v@tcp(%v:%v)/%v",
		viper.GetString("db.username"),
		viper.GetString("db.host"),
		viper.GetInt("db.port"),
		viper.GetString("db.database"),
	)

	db, err := sqlx.Open(viper.GetString("db.driver"), dataSourceName)
	if err != nil {
		panic(err)
	}

	db.SetConnMaxLifetime(3 * time.Minute)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	
	return db
}