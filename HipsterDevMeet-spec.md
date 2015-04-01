#Hipster Developer Meetup Spec
----

##Any user via telnet & public IP address can:

- ###Check the date and topic of the next meetup
  ```Bash
  >telnet (IP) (port)
  >event-date
  4/12/15
  ```

- ###See how many developers will be attending
```Bash
>telnet (IP) (port)
>attending
35
```

-  ###RSVP to a date by providing name and email address
```Bash
>telnet (IP) (port)
>RSVP John_Smith johnsmith42@thismail.com
John_Smith has RSVP'd for 4/12/15
```
>- User is told if they did not format entry correctly
```Bash
>>telnet (IP) (port)
>>RSVP John Smith johnsmith42@thismail.com
input format incorrect.
To RSVP for the next meetup use three arguments:
The first argument should be RSVP,
The second argument should be the user name
as a single word, without any internal spacing -
use _ instead; ex: firstname_lastname,
The third argument should be the user email.
```
>- User is told if they already submitted an RSVP
```Bash
>>telnet (IP) (port)
>>RSVP John_Smith johnsmith42@differentmail.com
John_Smith has already submitted an RSVP
```

- ###Be told if their input is not recognized
```Bash
>telnet (IP) (port)
>attending John Smith
input format incorrect.
To see the date and topic of the next meetup,
enter 'event-date'.
To see how many developers are attending,
enter 'attending'.
To RSVP for the next meetup use three arguments:
The first argument should be RSVP,
The second argument should be the user name
as a single word, without any internal spacing -
use _ instead; ex: firstname_lastname,
The third argument should be the user email.  
```

##Genevieve (the administrator), through a password known only to her, can access private functions with the first two arguments 'admin' followed by 'password'. She can, (via telnet):
>>   - Genevieve is told a static password of 'hipster5490'


- ###Set the date of the next meetup
```Bash
>telnet (ip) 8124
>admin hipster5490 set-date 4/24/15
4/24/15 set as meetup date
```
  - date should not contain spaces (MM/DD/YY optimal)


- ###Set the topic of the next meetup
```Bash
>telnet (IP) 8124
>admin hipster5490 set-topic Romulans
Romulans set as meetup topic for 4/24/15
```
  - Topic must not contain spaces


- ###See a list of those who have RSVP'd
```Bash
>telnet (IP) 8124
>admin hipster5490 list-attending
Phillip__Witkin, email pwitkin273@gmail.com
Greg_Smith, email gregsmith37@yahoo.com
```

- ###Clear out the RSVP replies
```Bash
>telnet (IP) 8124
>admin hipster5490 clear-RSVP
All RSVP entries cleared
```
