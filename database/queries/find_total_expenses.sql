CREATE OR REPLACE FUNCTION find_total_expenses (
    p_stud_id course_selections.stud_id%TYPE,
    p_credit_cost   NUMBER DEFAULT 25000
) RETURN NUMBER IS
    CURSOR c_occurences IS
    SELECT ders_kod,
           COUNT (*) - 1 AS occurences 
    FROM course_selections
    WHERE stud_id = p_stud_id
          AND ders_kod IN (
        SELECT DISTINCT ders_kod
        FROM course_selections
        WHERE stud_id = p_stud_id
              AND qiymet_herf = 'F'
    )
    GROUP BY ders_kod
    HAVING COUNT (*) - 1 > 0;
    v_credits       NUMBER;
    v_expenses      NUMBER := 0;
BEGIN
    FOR v_rec IN c_occurences LOOP
        v_credits := find_credits_of_subject (v_rec.ders_kod);
        v_expenses := v_expenses + p_credit_cost * v_credits * v_rec.occurences;
    END LOOP;
    RETURN v_expenses;
END find_total_expenses;