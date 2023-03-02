--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Debian 14.7-1.pgdg110+1)
-- Dumped by pg_dump version 14.4

-- Started on 2023-03-01 16:25:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 24634)
-- Name: Candidate; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Candidate" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Candidate" OWNER TO root;

--
-- TOC entry 215 (class 1259 OID 24633)
-- Name: Candidate_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Candidate_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Candidate_id_seq" OWNER TO root;

--
-- TOC entry 3374 (class 0 OID 0)
-- Dependencies: 215
-- Name: Candidate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Candidate_id_seq" OWNED BY public."Candidate".id;


--
-- TOC entry 220 (class 1259 OID 24710)
-- Name: Major; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Major" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Major" OWNER TO root;

--
-- TOC entry 212 (class 1259 OID 24591)
-- Name: User; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    password text,
    email text NOT NULL,
    status text,
    "roleId" integer NOT NULL,
    "majorId" integer
);


ALTER TABLE public."User" OWNER TO root;

--
-- TOC entry 211 (class 1259 OID 24590)
-- Name: Member_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Member_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Member_id_seq" OWNER TO root;

--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 211
-- Name: Member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Member_id_seq" OWNED BY public."User".id;


--
-- TOC entry 214 (class 1259 OID 24623)
-- Name: Poll; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Poll" (
    id integer NOT NULL,
    name text NOT NULL,
    "teamSize" integer NOT NULL,
    description text,
    "createdAt" date NOT NULL,
    "majorId" integer
);


ALTER TABLE public."Poll" OWNER TO root;

--
-- TOC entry 213 (class 1259 OID 24622)
-- Name: Poll_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Poll_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Poll_id_seq" OWNER TO root;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 213
-- Name: Poll_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Poll_id_seq" OWNED BY public."Poll".id;


--
-- TOC entry 210 (class 1259 OID 24578)
-- Name: Role; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    name text DEFAULT USER NOT NULL
);


ALTER TABLE public."Role" OWNER TO root;

--
-- TOC entry 209 (class 1259 OID 24577)
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Role_id_seq" OWNER TO root;

--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 209
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- TOC entry 219 (class 1259 OID 24709)
-- Name: TypeTeam_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."TypeTeam_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TypeTeam_id_seq" OWNER TO root;

--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 219
-- Name: TypeTeam_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."TypeTeam_id_seq" OWNED BY public."Major".id;


--
-- TOC entry 218 (class 1259 OID 24646)
-- Name: Vote; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Vote" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "pollId" integer NOT NULL,
    "candidateId" integer NOT NULL
);


ALTER TABLE public."Vote" OWNER TO root;

--
-- TOC entry 217 (class 1259 OID 24645)
-- Name: Vote_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Vote_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Vote_id_seq" OWNER TO root;

--
-- TOC entry 3379 (class 0 OID 0)
-- Dependencies: 217
-- Name: Vote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Vote_id_seq" OWNED BY public."Vote".id;


--
-- TOC entry 3196 (class 2604 OID 24637)
-- Name: Candidate id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Candidate" ALTER COLUMN id SET DEFAULT nextval('public."Candidate_id_seq"'::regclass);


--
-- TOC entry 3198 (class 2604 OID 24713)
-- Name: Major id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Major" ALTER COLUMN id SET DEFAULT nextval('public."TypeTeam_id_seq"'::regclass);


--
-- TOC entry 3195 (class 2604 OID 24626)
-- Name: Poll id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Poll" ALTER COLUMN id SET DEFAULT nextval('public."Poll_id_seq"'::regclass);


--
-- TOC entry 3192 (class 2604 OID 24581)
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- TOC entry 3194 (class 2604 OID 24594)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."Member_id_seq"'::regclass);


--
-- TOC entry 3197 (class 2604 OID 24649)
-- Name: Vote id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote" ALTER COLUMN id SET DEFAULT nextval('public."Vote_id_seq"'::regclass);


--
-- TOC entry 3213 (class 2606 OID 24643)
-- Name: Candidate Candidate_name_name1_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_name_name1_key" UNIQUE (name) INCLUDE (name) DEFERRABLE;


--
-- TOC entry 3215 (class 2606 OID 24641)
-- Name: Candidate Candidate_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_pkey" PRIMARY KEY (id);


--
-- TOC entry 3202 (class 2606 OID 24598)
-- Name: User Member_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);


--
-- TOC entry 3208 (class 2606 OID 24630)
-- Name: Poll Poll_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Poll"
    ADD CONSTRAINT "Poll_pkey" PRIMARY KEY (id);


--
-- TOC entry 3200 (class 2606 OID 24584)
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- TOC entry 3222 (class 2606 OID 24719)
-- Name: Major TypeTeam_name_name1_key; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Major"
    ADD CONSTRAINT "TypeTeam_name_name1_key" UNIQUE (name) INCLUDE (name);


--
-- TOC entry 3224 (class 2606 OID 24717)
-- Name: Major TypeTeam_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Major"
    ADD CONSTRAINT "TypeTeam_pkey" PRIMARY KEY (id);


--
-- TOC entry 3217 (class 2606 OID 24651)
-- Name: Vote Vote_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT "Vote_pkey" PRIMARY KEY (id);


--
-- TOC entry 3206 (class 2606 OID 24671)
-- Name: User uniqueName; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "uniqueName" UNIQUE (name) INCLUDE (name);


--
-- TOC entry 3211 (class 2606 OID 24632)
-- Name: Poll unique_name; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Poll"
    ADD CONSTRAINT unique_name UNIQUE (name) INCLUDE (name);


--
-- TOC entry 3218 (class 1259 OID 24669)
-- Name: fki_c; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX fki_c ON public."Vote" USING btree ("candidateId");


--
-- TOC entry 3219 (class 1259 OID 24663)
-- Name: fki_fk_poll_vote; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX fki_fk_poll_vote ON public."Vote" USING btree ("pollId");


--
-- TOC entry 3203 (class 1259 OID 24612)
-- Name: fki_fk_role_member; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX fki_fk_role_member ON public."User" USING btree ("roleId");


--
-- TOC entry 3204 (class 1259 OID 24606)
-- Name: fki_r; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX fki_r ON public."User" USING btree ("roleId");


--
-- TOC entry 3209 (class 1259 OID 24725)
-- Name: fki_t; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX fki_t ON public."Poll" USING btree ("majorId");


--
-- TOC entry 3220 (class 1259 OID 24657)
-- Name: fki_v; Type: INDEX; Schema: public; Owner: root
--

CREATE INDEX fki_v ON public."Vote" USING btree ("userId");


--
-- TOC entry 3229 (class 2606 OID 24664)
-- Name: Vote fk_candidate_vote; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT fk_candidate_vote FOREIGN KEY ("candidateId") REFERENCES public."Candidate"(id) NOT VALID;


--
-- TOC entry 3226 (class 2606 OID 24726)
-- Name: Poll fk_major_poll; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Poll"
    ADD CONSTRAINT fk_major_poll FOREIGN KEY ("majorId") REFERENCES public."Major"(id) NOT VALID;


--
-- TOC entry 3228 (class 2606 OID 24658)
-- Name: Vote fk_poll_vote; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT fk_poll_vote FOREIGN KEY ("pollId") REFERENCES public."Poll"(id) NOT VALID;


--
-- TOC entry 3225 (class 2606 OID 24607)
-- Name: User fk_role_member; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT fk_role_member FOREIGN KEY ("roleId") REFERENCES public."Role"(id) NOT VALID;


--
-- TOC entry 3227 (class 2606 OID 24652)
-- Name: Vote fk_vote_user; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Vote"
    ADD CONSTRAINT fk_vote_user FOREIGN KEY ("userId") REFERENCES public."User"(id) NOT VALID;


-- Completed on 2023-03-01 16:25:15

--
-- PostgreSQL database dump complete
--

