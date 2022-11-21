# Simple CRUD with Go and React

#### I used some technologies:
* Fiber (like express but for Go)
* MongoDB Driver
* Mongo Atlas for mongo server

### Requirements:
* Docker
* Docker Compose
* Golang

### To start the app:
#### Manually
Download packages
```bash
go download
```
rename `.env.example` to `.env` and fill it
change CORS origin in `main.go` line `52` to localhost or your domain if you need

Go to `client` dir and run
```bash
npm run build
```

Compile final bin with:
```bash
go build .
```

And finally run the bin!
#### With Docker
you also need to config CORS origin and .env file
```bash
docker-compose build
```

```bash
docker-compose up -d
```

and if you want to see logs you can do it:
```bash
docker-compose logs -f
```
