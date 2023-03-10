--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Debian 14.7-1.pgdg110+1)
-- Dumped by pg_dump version 14.4

-- Started on 2023-03-10 15:40:20

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
-- TOC entry 212 (class 1259 OID 49165)
-- Name: poll; Type: TABLE; Schema: public; Owner: root
--




-- ALTER TABLE public.poll OWNER TO root;

-- --
-- -- TOC entry 211 (class 1259 OID 49164)
-- -- Name: poll_id_seq; Type: SEQUENCE; Schema: public; Owner: root
-- --

-- CREATE SEQUENCE public.poll_id_seq
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- ALTER TABLE public.poll_id_seq OWNER TO root;

-- --
-- -- TOC entry 3337 (class 0 OID 0)
-- -- Dependencies: 211
-- -- Name: poll_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
-- --

-- ALTER SEQUENCE public.poll_id_seq OWNED BY public.poll.id;


-- --
-- -- TOC entry 210 (class 1259 OID 49154)
-- -- Name: user; Type: TABLE; Schema: public; Owner: root
-- --




-- ALTER TABLE public."user" OWNER TO root;

-- --
-- -- TOC entry 209 (class 1259 OID 49153)
-- -- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
-- --

-- CREATE SEQUENCE public.user_id_seq
--     AS integer
--     START WITH 1
--     INCREMENT BY 1
--     NO MINVALUE
--     NO MAXVALUE
--     CACHE 1;


-- ALTER TABLE public.user_id_seq OWNER TO root;

-- --
-- -- TOC entry 3338 (class 0 OID 0)
-- -- Dependencies: 209
-- -- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
-- --

-- ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 213 (class 1259 OID 49180)
-- Name: vote; Type: TABLE; Schema: public; Owner: root
--




ALTER TABLE public.vote OWNER TO root;

--
-- TOC entry 3178 (class 2604 OID 49168)
-- Name: poll id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.poll ALTER COLUMN id SET DEFAULT nextval('public.poll_id_seq'::regclass);


--
-- TOC entry 3176 (class 2604 OID 49157)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3185 (class 2606 OID 49172)
-- Name: poll poll_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT poll_pkey PRIMARY KEY (id);


--
-- TOC entry 3181 (class 2606 OID 49163)
-- Name: user unique_email; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT unique_email UNIQUE (email) INCLUDE (email);


--
-- TOC entry 3187 (class 2606 OID 49174)
-- Name: poll unique_name; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT unique_name UNIQUE (name) INCLUDE (name);


--
-- TOC entry 3183 (class 2606 OID 49161)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3189 (class 2606 OID 49200)
-- Name: vote vote_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT vote_pkey PRIMARY KEY (id);


--
-- TOC entry 3192 (class 2606 OID 49190)
-- Name: vote fk_poll_vote; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT fk_poll_vote FOREIGN KEY ("pollId") REFERENCES public.poll(id) NOT VALID;


--
-- TOC entry 3190 (class 2606 OID 49175)
-- Name: poll fk_user_poll; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT fk_user_poll FOREIGN KEY ("creatorId") REFERENCES public."user"(id) NOT VALID;


--
-- TOC entry 3191 (class 2606 OID 49185)
-- Name: vote fk_user_vote; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT fk_user_vote FOREIGN KEY ("userId") REFERENCES public."user"(id);


-- Completed on 2023-03-10 15:40:21

--
-- PostgreSQL database dump complete
--

