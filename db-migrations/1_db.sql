
CREATE TABLE public."user" (
    id integer NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role integer NOT NULL,
    status integer DEFAULT 1 NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

CREATE TABLE public.poll (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    "creatorId" integer NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    status integer DEFAULT 1
);

CREATE TABLE public.vote (
    id uuid NOT NULL,
    "userId" integer NOT NULL,
    "pollId" integer NOT NULL,
    vote jsonb
);
