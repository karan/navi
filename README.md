navi
====

Learn to code together.

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

`/start`

JSON includes, the `problem` and a list of `tests` where `input` has the test code and `solution` has the expected output.
