-- Create sequence for incremental order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;