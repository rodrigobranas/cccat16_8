drop schema cccat16 cascade;

create schema cccat16;

create table cccat16.account (
	account_id uuid primary key,
	name text not null,
	email text not null,
	cpf text not null,
	car_plate text null,
	is_passenger boolean not null default false,
	is_driver boolean not null default false
);

create table cccat16.ride (
	ride_id uuid,
	passenger_id uuid,
	driver_id uuid,
	status text,
	fare numeric,
	distance numeric,
	from_lat numeric,
	from_long numeric,
	to_lat numeric,
	to_long numeric,
	date timestamp,
	last_lat numeric,
	last_long numeric
);

create table cccat16.position (
	position_id uuid,
	ride_id uuid,
	lat numeric,
	long numeric,
	date timestamp
);

create table cccat16.transaction (
	transaction_id uuid,
	ride_id uuid,
	amount numeric,
	status text,
	date timestamp
);

create table cccat16.ride_projection (
	ride_id uuid,
	passenger_id uuid,
	driver_id uuid,
	status text,
	passenger_name text not null,
	passenger_email text not null,
	driver_name text not null,
	driver_email text not null
);
