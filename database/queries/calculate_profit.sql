CREATE OR REPLACE FUNCTION calculate_profit (
    p_credit_cost  NUMBER  DEFAULT  25000
)
RETURN pkgs.profit_table
    PIPELINED
IS
    v_record        pkgs.profit_rec;
    v_profit        NUMBER := 0;
    v_retakes       NUMBER;
    CURSOR c_retakes IS
    SELECT ders_kod,
           COUNT (*) - 1 AS retakes
    FROM course_selections
    GROUP BY stud_id,
             ders_kod
    HAVING COUNT (*) - 1 > 0;
BEGIN
    SELECT COUNT (*)
    INTO v_retakes
    FROM course_selections
    WHERE qiymet_herf = 'F';
    FOR v_rec IN c_retakes LOOP 
        v_profit := v_profit + p_credit_cost * v_rec.retakes * find_credits_of_subject (v_rec.ders_kod);
    END LOOP;
    v_record.retakes := v_retakes;
    v_record.profit := v_profit;
    PIPE ROW (v_record);
END calculate_profit;

SELECT * FROM TABLE (calculate_profit ());