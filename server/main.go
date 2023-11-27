package main

import (
	"fmt"
	// "server/handler"
	"server/repository"
	"server/service"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
	"github.com/spf13/viper"
)

func main() {
	initConfig()
	db := intiDatabase()

	eventRepositoryDB := repository.NewEventRepositoryDB(db)
	eventService := service.NewEventService(eventRepositoryDB)
	// eventHandler := handler.NewServiceHanlder(eventService)
	// _=eventHandler
	// _ = eventService

	app := fiber.New()
	_ = app

	event := repository.Event{
    Title: "test event",
    Id: 1700841927363,
    StartEvent: 8,
    EndEvent: 12,
	}

	eventService.CreateEvent(event)

	// app.Get("/calendar", func(c *fiber.Ctx) error {
	// 	start_evebnt := c.QueryInt("start-event")
	// 	end_event := c.QueryInt("end-event")

	// 	return nil
	// })
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

func intiDatabase() *sqlx.DB {
	dataSourceName := fmt.Sprintf(
		"%v@tcp(%v:%v)/%v",
		viper.GetString("db.username"),
		viper.GetString("db.host"),
		viper.GetInt("db.port"),
		viper.GetString("db.database"),
	)

	println(dataSourceName)

	db, err := sqlx.Open(viper.GetString("db.driver"), dataSourceName)
	if err != nil {
		panic(err)
	}

	db.SetConnMaxLifetime(3 * time.Minute)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	
	return db
}