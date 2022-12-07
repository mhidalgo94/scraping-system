# Django + Celery + PostgreSQL + React JS + Material UI

## Description
System based on web scraping, creating scheduled tasks on a specific day.
Storing product data from different stores, adding these to favorites and being able to make comparisons in the marking

## Installation 
***You can use docker container if preferred.***

### Backend
`First install python interpreter and after install virtual enviroment.`
```python3
$ pip3 install virtualenv

```

### Install Requirements
```
$ cd backend
$ pip3 install requirements.txt
```
Config base Datos in Django
### Make Migrations Django to DB
```
$ cd backend
$ python manage.py makemigrations
$ python manage.py migrate
```


### Install Redis Server
[Redis-Doc](https://developer.redis.com/create)

### Check Settings Django, Celery and Redis Server
[Redis-Doc](https://docs.celeryq.dev/en/stable/django/first-steps-with-django.html)
### Verify Celery Runs
Linux
```
celery -A config worker -l INFO 
```
Windows (Use library gevent. Compatibility problems higher version 5.0 in celery)
```
celery -A config worker -l INFO -P gevent
```

### Fontend
`I use install --force Material UI have problem @mui/styles with react version ^18`
```node
cd frontend/gui
$ npm install --force
```

<img src="./static_md/login.PNG" alt="Login Page" title="Login Page.">
<img src="./static_md/panel_page.PNG" alt="Panel Page" title="Pagel Page.">
<img src="./static_md/view_start_scraping_web.PNG" alt="Panel View scraping" title="View create scraping.">
<img src="./static_md/view_scheduled_task.PNG" alt="Create task" title="Create scraping.">
<img src="./static_md/view_search_table.PNG" alt="View Searchs Table" title="View Search Table.">
<img src="./static_md/result_search.PNG" alt="Result Search" title="Result Search.">
<img src="./static_md/result_search_card.PNG" alt="Result Search Card" title="Result Search Card.">
<img src="./static_md/log_scraping_request.PNG" alt="Edit Profile" title="Edit Profile.">
<img src="./static_md/edit_profile.PNG" alt="Edit Profile" title="Edit Profile.">
<img src="./static_md/view_user_admin.PNG" alt="View all user." title="View all users.">