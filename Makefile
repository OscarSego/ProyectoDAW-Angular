build:
	docker build -f Dockerfile -t proyecto/angular:latest .

run:
	docker run -p 8080:4200 proyecto/angular:latest