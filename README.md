## Solution Notes

To spin up the dev stack, it's assumed ports 3000, 8000 are free.
Make sure you have docker, docker-compose installed.

```
$ docker compose up
```
You can then access the application in your browser at "localhost:3000".
Note that the dev DB is destroyed when the backend container stops. 

To run the backend tests:

```
$ docker-compose run widgets-backend ./manage.py test
```

To run the frontend tests:

```
$ docker-compose run widgets-frontend npx jest
```

## Technology Choices
- Separation of the backend and frontend such that they can be developed and deployed independently. Note that I've
put them in the same repo for ease of sharing the solution.
- Django for the backend, because it was fast to get going with for this task since it's feature rich out of the box.
- SQLLite DB for dev purposes as it doesn't require any setup. I'd use something which can scale better for a real app.
- React for the frontend, because it's a popular framework, and I'm familiar with it.
- Material-ui to minimise any styling work.
- Exporting an openapi schema from the backend and importing for use with typescript provides convenient validation
of types.
- Use docker-compose to spin up the dev stack and make testing easy.
- Due to time constraints, I left in-line TODOs.


## Design considerations
- Re-use the same form for create and update (fewer elements and state to deal with).
- Fetch the list of widgets on page load, no caching because I don't know how important it is for users to see the 
latest data.
- Don't unnecessarily re-fetch the list of widgets after a create or update, just add the new/updated widget to the list.
The caveat is that the ordering has been left as a TODO.