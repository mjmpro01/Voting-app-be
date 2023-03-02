ALTER TABLE ONLY public."Vote" DROP CONSTRAINT IF EXISTS fk_candidate_vote;
ALTER TABLE ONLY public."Poll" DROP CONSTRAINT IF EXISTS fk_major_poll;
ALTER TABLE ONLY public."Vote" DROP CONSTRAINT IF EXISTS fk_poll_vote;
ALTER TABLE ONLY public."User" DROP CONSTRAINT IF EXISTS fk_role_member;
ALTER TABLE ONLY public."Vote" DROP CONSTRAINT IF EXISTS fk_vote_user;
ALTER TABLE ONLY public."Candidate" DROP CONSTRAINT IF EXISTS "Candidate_name_name1_key";
ALTER TABLE ONLY public."Candidate" DROP CONSTRAINT IF EXISTS "Candidate_pkey";
ALTER TABLE ONLY public."User" DROP CONSTRAINT IF EXISTS "Member_pkey";
ALTER TABLE ONLY public."Poll" DROP CONSTRAINT IF EXISTS "Poll_pkey";
ALTER TABLE ONLY public."Role" DROP CONSTRAINT IF EXISTS "Role_pkey";
ALTER TABLE ONLY public."Major" DROP CONSTRAINT IF EXISTS "TypeTeam_name_name1_key";
ALTER TABLE ONLY public."Major" DROP CONSTRAINT IF EXISTS "TypeTeam_pkey";
ALTER TABLE ONLY public."Vote" DROP CONSTRAINT IF EXISTS "Vote_pkey";
ALTER TABLE ONLY public."User" DROP CONSTRAINT IF EXISTS "uniqueName";
ALTER TABLE ONLY public."Poll" DROP CONSTRAINT IF EXISTS unique_name;


DROP INDEX IF EXISTS fki_c;



DROP INDEX IF EXISTS fki_fk_poll_vote;



DROP INDEX IF EXISTS fki_fk_role_member;



DROP INDEX IF EXISTS fki_r;



DROP INDEX IF EXISTS fki_t;



DROP INDEX IF EXISTS fki_v;


ALTER TABLE public."Candidate" OWNER TO root;

CREATE SEQUENCE  if not exists public."Candidate_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Candidate_id_seq" OWNER TO root;

ALTER SEQUENCE public."Candidate_id_seq" OWNED BY public."Candidate".id;

ALTER TABLE public."Major" OWNER TO root;

ALTER TABLE public."User" OWNER TO root;


CREATE SEQUENCE if not exists public."Member_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Member_id_seq" OWNER TO root;


ALTER SEQUENCE public."Member_id_seq" OWNED BY public."User".id;



ALTER TABLE public."Poll" OWNER TO root;


CREATE SEQUENCE if not exists public."Poll_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Poll_id_seq" OWNER TO root;


ALTER SEQUENCE public."Poll_id_seq" OWNED BY public."Poll".id;



ALTER TABLE public."Role" OWNER TO root;


CREATE SEQUENCE if not exists public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_id_seq" OWNER TO root;


ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;



CREATE SEQUENCE if not exists public."TypeTeam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TypeTeam_id_seq" OWNER TO root;


ALTER SEQUENCE public."TypeTeam_id_seq" OWNED BY public."Major".id;



ALTER TABLE public."Vote" OWNER TO root;


CREATE SEQUENCE if not exists public."Vote_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Vote_id_seq" OWNER TO root;


ALTER SEQUENCE public."Vote_id_seq" OWNED BY public."Vote".id;



ALTER TABLE ONLY public."Candidate" ALTER COLUMN id SET DEFAULT nextval('public."Candidate_id_seq"'::regclass);



ALTER TABLE ONLY public."Major" ALTER COLUMN id SET DEFAULT nextval('public."TypeTeam_id_seq"'::regclass);



ALTER TABLE ONLY public."Poll" ALTER COLUMN id SET DEFAULT nextval('public."Poll_id_seq"'::regclass);



ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);



ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."Member_id_seq"'::regclass);



ALTER TABLE ONLY public."Vote" ALTER COLUMN id SET DEFAULT nextval('public."Vote_id_seq"'::regclass);



ALTER TABLE ONLY public."Candidate" ADD CONSTRAINT "Candidate_name_name1_key" UNIQUE (name) INCLUDE (name) DEFERRABLE;



ALTER TABLE ONLY public."Candidate" ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public."User" ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public."Poll" ADD CONSTRAINT "Poll_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public."Role" ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public."Major" ADD CONSTRAINT "TypeTeam_name_name1_key" UNIQUE (name) INCLUDE (name);



ALTER TABLE ONLY public."Major" ADD CONSTRAINT "TypeTeam_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public."Vote" ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (id);



ALTER TABLE ONLY public."User" ADD CONSTRAINT "uniqueName" UNIQUE (name) INCLUDE (name);



ALTER TABLE ONLY public."Poll" ADD CONSTRAINT unique_name UNIQUE (name) INCLUDE (name);



CREATE INDEX fki_c ON public."Vote" USING btree ("candidateId");



CREATE INDEX fki_fk_poll_vote ON public."Vote" USING btree ("pollId");



CREATE INDEX fki_fk_role_member ON public."User" USING btree ("roleId");



CREATE INDEX fki_r ON public."User" USING btree ("roleId");



CREATE INDEX fki_t ON public."Poll" USING btree ("majorId");



CREATE INDEX fki_v ON public."Vote" USING btree ("userId");



ALTER TABLE ONLY public."Vote" ADD CONSTRAINT fk_candidate_vote FOREIGN KEY ("candidateId") REFERENCES public."Candidate"(id) NOT VALID;



ALTER TABLE ONLY public."Poll" ADD CONSTRAINT fk_major_poll FOREIGN KEY ("majorId") REFERENCES public."Major"(id) NOT VALID;



ALTER TABLE ONLY public."Vote" ADD CONSTRAINT fk_poll_vote FOREIGN KEY ("pollId") REFERENCES public."Poll"(id) NOT VALID;



ALTER TABLE ONLY public."User" ADD CONSTRAINT fk_role_member FOREIGN KEY ("roleId") REFERENCES public."Role"(id) NOT VALID;



ALTER TABLE ONLY public."Vote" ADD CONSTRAINT fk_vote_user FOREIGN KEY ("userId") REFERENCES public."User"(id) NOT VALID;






