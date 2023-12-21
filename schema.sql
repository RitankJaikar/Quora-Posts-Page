create table posts(
    id varchar(50) primary key,
    username varchar(50) unique not null,
    content varchar(500) not null
);