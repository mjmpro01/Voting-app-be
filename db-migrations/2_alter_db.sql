ALTER TABLE ONLY public.vote DROP CONSTRAINT IF EXISTS fk_poll_vote;
ALTER TABLE ONLY public.poll DROP CONSTRAINT IF EXISTS fk_user_poll;
ALTER TABLE ONLY public.vote DROP CONSTRAINT IF EXISTS fk_user_vote;
ALTER TABLE ONLY public."user" DROP CONSTRAINT IF EXISTS user_pkey;
ALTER TABLE ONLY public.poll DROP CONSTRAINT IF EXISTS poll_pkey;
ALTER TABLE ONLY public.vote DROP CONSTRAINT IF EXISTS vote_pkey;
ALTER TABLE ONLY public."user" DROP CONSTRAINT IF EXISTS unique_email;
ALTER TABLE ONLY public.poll DROP CONSTRAINT IF EXISTS unique_name;


ALTER TABLE public.poll OWNER TO root;

CREATE SEQUENCE public.poll_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.poll_id_seq OWNER TO root;

ALTER SEQUENCE public.poll_id_seq OWNED BY public.poll.id;

ALTER TABLE public."user" OWNER TO root;

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.user_id_seq OWNER TO root;

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;

ALTER TABLE public.vote OWNER TO root;

ALTER TABLE ONLY public.poll ALTER COLUMN id SET DEFAULT nextval('public.poll_id_seq'::regclass);

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


ALTER TABLE ONLY public.poll
    ADD CONSTRAINT poll_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_email UNIQUE (email) INCLUDE (email);


ALTER TABLE ONLY public.poll
    ADD CONSTRAINT unique_name UNIQUE (name) INCLUDE (name);


ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT vote_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT fk_poll_vote FOREIGN KEY ("pollId") REFERENCES public.poll(id) NOT VALID;

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT fk_user_poll FOREIGN KEY ("creatorId") REFERENCES public."user"(id) NOT VALID;

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT fk_user_vote FOREIGN KEY ("userId") REFERENCES public."user"(id);

