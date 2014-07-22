navi
====

Learn to code together.

![navi](https://cloud.githubusercontent.com/assets/744973/3653719/32e88226-1159-11e4-90a4-28aef8bf698d.png)

## API

#### Login

`/auth/facebook`

User logs in. Redirected to `/` if success or fail. If success, template variable `user` is filled with current user, otherwise no template variable is set.

User:

```json

{
    "fbId": "10202220268136697",
    "accessToken": "CAAVcqLZBeamUBAGoZBsrT3GggjAZB6Coo8Iz3mQIQUmGpLThR54uvzhPam6JneCQbxnFdwbshnpZB7NGCT3PRzDtGyC4chNxgDJAfMICWWdy2Rxg7OgLTPBnSPQKFn17fN7YeTZAmlYK2CD3fJNJoypZCZBJMBjAoLo2QjB8pAYOfGJpbZC11Y7vyKGXqTYK5dgM3WPdpQEGn4ce9YMZAWuZAx",
    "email": "karanmatic@gmail.com",
    "name": "Karan Goel",
    "photo": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/t1.0-1/c0.0.50.50/p50x50/10516657_10202169490827296_7325358078564518505_n.jpg",
    "username": "karanmatic",
    "score": 0,
    "_id": {
        "$oid": "53caf5161a68ae9c4467ad3a"
    },
    "badges": [],
    "created_at": {
        "$date": "2014-07-19T22:45:42.821Z"
    },
    "__v": 0
}
```

#### Get logged in user

`/user`

Returns logged in user (see JSON above)

#### Start a new session

`/start?option={ friend | all }`

Returns:

```json

{
  "problem": {
    "problem": "abc",
    "id": "123"
  },
  "users": [
    {
      "__v": 1,
      "_id": "53cafdb232d70ad94e5405da",
      "accessToken": "CAAVcqLZBeamUBAAZC7Byh3fGRebP42YZAhrT78vR2fsJJrdpp9ASkCUbHqri75RJB7KzFwIPemQzZCyjPhDSE3e5ZBW9FgEQaxp5g48lMjenKvKkjly7kRhaZBy19GiCA0DmnEL1ZAL4gwVLJXdRT5XGz5m65PrK4pPngnROCj2n6959TTffHl2wNbIFoFZAqOEZCoDTZCBu9ZAZAqXy4qI1ZBjEJ",
      "email": "karanmatic@gmail.com",
      "fbId": "10202220268136697",
      "name": "Karan Goel",
      "online": true,
      "photo": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/t1.0-1/c0.0.50.50/p50x50/10516657_10202169490827296_7325358078564518505_n.jpg",
      "score": 0,
      "username": "karanmatic",
      "friends": [
        {
          "id": "10154413464360389",
          "name": "Amit Burstein"
        }
      ],
      "badges": [],
      "created_at": "2014-07-19T23:22:26.701Z"
    },
    {
      "fbId": "906051642743056",
      "accessToken": "CAAVcqLZBeamUBAN0mvy9dDY91a69qb2C5vFeIImHT9XD7rZCIxFerFyjQ5JAEskiBN5nYogzkqp9pUeCxuTGXREWFC14WkXiVuOlA5b7Ys8KKHePtxKR63q23B9D0vCfP3ZCMSuWE4lZCIOJM3ZCitutmdZCyuJuXQ0Q729Isxi8Qpew8aoRAMHFFTWw15GrH6W3VbUzPc28yMJTgnbqFy",
      "email": "aaronnech@gmail.com",
      "name": "Aaron Nech",
      "photo": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p50x50/10371722_870614516286769_8649038283816225099_n.jpg?oh=66f989c7990e7d206b33e86f0571d0bd&oe=543DCE97&__gda__=1414269500_687f8da6ee927db59615b3d4d1e13d1d",
      "username": "aaronnech",
      "score": 0,
      "online": true,
      "_id": "53ca0a05adf894da458bf01d",
      "__v": 0,
      "friends": [],
      "badges": [],
      "created_at": "2014-07-19T06:02:45.066Z"
    }
  ],
  "problemsession": "53cb4ecd5086c797a6d70034"
}
```

#### Finalize a session (to be called after all tests pass)

POST `/finalize_session`

POST body:

`user_solution`: solution code
`score`: int of the score
`problem_session`: id of the problem session return when `/start` called.
