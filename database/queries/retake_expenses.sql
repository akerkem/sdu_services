CREATE OR REPLACE FUNCTION find_expenses (
    p_stud_id   course_selections.stud_id%TYPE,
    p_year      course_sections.year%TYPE,
    p_term      course_sections.term%TYPE,
    p_credit_cost   NUMBER  DEFAULT 25000 --default cost of one credit is 25000
) RETURN pkgs.retake_expenses_table
    PIPELINED
IS
    v_result        pkgs.retake_expenses_rec;
    v_credits       NUMBER;
    v_expenses      NUMBER := 0;
    CURSOR c_occurences IS
    SELECT DISTINCT ders_kod, COUNT (*) AS occurences
    FROM course_selections
    WHERE stud_id = p_stud_id
          AND year = p_year
          AND term = p_term
          AND ders_kod IN (
        SELECT DISTINCT ders_kod
        FROM course_selections
        WHERE stud_id = p_stud_id
              AND (year < p_year
                   OR (year = p_year
                       AND term < p_term))
              AND (qiymet_herf = 'F'
              OR qiymet_yuz < 50)
    )
    GROUP BY ders_kod;
BEGIN
    FOR v_rec IN c_occurences LOOP
        v_credits := find_credits_of_subject (v_rec.ders_kod);
        v_expenses := v_expenses + p_credit_cost * v_credits * v_rec.occurences;
    END LOOP;
    v_result.stud_id := p_stud_id;
    v_result.term_spent := v_expenses;
    v_result.total_spent := find_total_expenses (p_stud_id, p_credit_cost);
    PIPE ROW (v_result);
END find_expenses;

select * from table (find_expenses ('005A546C9A84D7FA23670D1692540E14D5707E76', 2018, 3));