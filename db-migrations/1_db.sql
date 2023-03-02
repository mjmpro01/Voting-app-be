
CREATE TABLE if not exists public."Candidate" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);

CREATE TABLE if not exists public."Major" (
    id integer NOT NULL,
    name text NOT NULL
);

CREATE TABLE if not exists public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    password text,
    email text NOT NULL,
    status text,
    "roleId" integer NOT NULL,
    "majorId" integer
);

CREATE TABLE  if not exists public."Poll" (
    id integer NOT NULL,
    name text NOT NULL,
    "teamSize" integer NOT NULL,
    description text,
    "createdAt" date NOT NULL,
    "majorId" integer
);

CREATE TABLE if not exists public."Role" (
    id integer NOT NULL,
    name text DEFAULT USER NOT NULL
);

CREATE TABLE if not exists public."Vote" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "pollId" integer NOT NULL,
    "candidateId" integer NOT NULL
);
