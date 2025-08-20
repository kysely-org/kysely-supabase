create type my_status as enum (
    'active',
    'inactive',
    'pending'
);

create table statuses (
    id serial primary key,
    name text not null,
    status my_status not null
);
