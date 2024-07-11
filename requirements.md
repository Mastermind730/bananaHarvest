### backend

- server: express
- database: mysql

```sql

-- create new database
create database airbnb_db;
use airbnb_db;

-- tables

-- user
create table user(
    id integer primary key auto_increment,
    firstName varchar(20),
    lastName varchar(20),
    email varchar(20),
    phone varchar(10),
    password varchar(100),
    profileImage varchar(100),

    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- home

-- type:
    -- 1: flat,
    -- 2: house,
    -- 3: secondary unit
    -- 4: unique space
    -- 5: bed and breakfast
    -- 6: boutique hotel
create table home (
    id integer primary key auto_increment,
    userId integer,
    type integer,
    addressLine1 varchar(50),
    addressLine2 varchar(50),
    addressLine3 varchar(50),
    city varchar(50),
    state varchar(50),
    zipCode varchar(6),

    guests integer,
    beds integer,
    bedrooms integer,
    bathrooms integer,

    title varchar(100),
    tagline varchar(100),
    shortDescription varchar(500),
    longDescription varchar(10000),

    image varchar(100),

    rent integer,
    cleaningFees integer,
    serviceFee integer,
    tax integer,

    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- alter the table
alter table home add column image varchar(100);

-- home amenities
create table amenity(
    id integer primary key auto_increment,
    homeId integer,

    swimmingPool integer(1) DEFAULT 0,
    hotTub integer(1) DEFAULT 0,
    patio integer(1) DEFAULT 0,
    bbqGrill integer(1) DEFAULT 0,
    poolTable integer(1) DEFAULT 0,
    outdoorDiningArea integer(1) DEFAULT 0,
    wifi integer(1) DEFAULT 0,
    tv integer(1) DEFAULT 0,
    kitchen integer(1) DEFAULT 0,
    washingMachine integer(1) DEFAULT 0,
    freeParking integer(1) DEFAULT 0,
    paidParking integer(1) DEFAULT 0,
    ac integer(1) DEFAULT 0,
    workspace integer(1) DEFAULT 0,
    outdoorShower integer(1) DEFAULT 0,
    smokeAlarm integer(1) DEFAULT 0,
    firstAidKit integer(1) DEFAULT 0,
    fireAlarm integer(1) DEFAULT 0,

    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- home photos
create table photo (
    id integer primary key auto_increment,
    homeId integer,
    fileName varchar(100),
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- home ratings
create table rating (
    id integer primary key auto_increment,
    homeId integer,
    userId integer,
    rating integer,
    comment varchar(1000),

    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- booking
-- wishlist
create table wishlist (
    id integer primary key auto_increment,
    homeId integer,
    userId integer,
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

```

```json
{
  "type": 1,

  "title": "Nice weekend home",
  "tagline": "A home you can enjoy the greenery around",
  "shortDescription": "This is a very nice and cosy home near pune",
  "longDescription": "This is a very nice and cosy home near pune. This is a very nice and cosy home near pune. This is a very nice and cosy home near pune. This is a very nice and cosy home near pune. This is a very nice and cosy home near pune. This is a very nice and cosy home near pune. This is a very nice and cosy home near pune.",

  "addressLine1": "H-105",
  "addressLine2": "near pune",
  "addressLine3": "",
  "city": "pune",
  "state": "maharashtra",
  "zipCode": "411041",

  "guests": 4,
  "beds": 2,
  "bedrooms": 2,
  "bathrooms": 2,

  "rent": 10000,
  "cleaningFees": 1000,
  "serviceFee": 1500,
  "tax": 800
}

{
    "swimmingPool": 1,
    "hotTub": 1,
    "patio": 0,
    "bbqGrill": 0,
    "poolTable": 0,
    "outdoorDiningArea": 1,
    "wifi": 1,
    "tv": 1,
    "kitchen": 1,
    "washingMachine": 1,
    "freeParking": 0,
    "paidParking": 1,
    "ac": 1,
    "workspace": 0,
    "outdoorShower": 0,
    "smokeAlarm": 1,
    "firstAidKit": 1,
    "fireAlarm": 1
}
```

### frontend

- library: React
- functionality

  - user
    - signup
    - signin
    - forgot password
    - reset password
  - home
    - host a home
    - search homes with filters
    - show details of a selected home
    - add/remove home to a wishlist
    - book a home
    - add review with rating
    - cancel booking
    - get all bookings
    - checkin and checkout

- if possible
  - pay rent (payment gateway - stripe)
