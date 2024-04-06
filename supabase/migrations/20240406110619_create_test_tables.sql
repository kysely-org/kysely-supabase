create table person (
    id serial primary key,
    first_name varchar(255),
    middle_name varchar(255),
    last_name varchar(255),
    gender varchar(50) not null,
    marital_status varchar(50),
    children integer not null default 0
);

create table pet (
    id serial primary key,
    name varchar(255) unique not null,
    owner_id integer not null references person (id) on delete cascade,
    species varchar(50) not null
);

create table toy (
    id serial primary key,
    name varchar(255) not null,
    pet_id integer not null references pet (id)
);

create index pet_owner_id_index on pet (owner_id);